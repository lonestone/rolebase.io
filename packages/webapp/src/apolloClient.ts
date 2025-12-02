// https://github.com/nhost/nhost/blob/main/examples/guides/react-apollo/README.md
// https://github.com/nhost/nhost/blob/cd8f674a61722b4f2bb04b6ad49aa456736e3f3b/dashboard/src/providers/Apollo/ws.ts
// https://github.com/nhost/nhost/blob/cd8f674a61722b4f2bb04b6ad49aa456736e3f3b/dashboard/src/providers/Apollo/createApolloClient.ts

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient, type Client, type ClientOptions } from 'graphql-ws'
import { nhost } from './nhost'

export const createApolloClient = (headers?: Record<string, string>) => {
  const uri = nhost.graphql.url

  const getAuthHeaders = async () => {
    // add headers
    const resHeaders: Record<string, string> = {
      ...headers,
      'Sec-WebSocket-Protocol': 'graphql-ws',
    }

    const session = await nhost?.refreshSession(60)
    const token = session?.accessToken
    if (token) {
      resHeaders.authorization = `Bearer ${token}`
    } else {
      // ? Not sure it changes anything for Hasura
      resHeaders.role = 'public'
    }

    return resHeaders
  }

  const wsClient = createRestartableClient({
    url: uri.startsWith('https')
      ? uri.replace(/^https/, 'wss')
      : uri.replace(/^http/, 'ws'),
    shouldRetry: () => true,
    retryAttempts: 100,
    retryWait: async (retries) => {
      // start with 1 second delay
      const baseDelay = 1000

      // max 3 seconds of jitter
      const maxJitter = 3000

      // exponential backoff with jitter

      return new Promise((resolve) => {
        setTimeout(
          resolve,
          baseDelay * 2 ** retries + Math.floor(Math.random() * maxJitter)
        )
      })
    },
    connectionParams: async () => ({
      headers: {
        ...headers,
        ...(await getAuthHeaders()),
      },
    }),
  })

  const retryLink = new RetryLink()
  const wsLink = new GraphQLWsLink(wsClient)

  const httpLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      ...(await getAuthHeaders()),
    },
  })).concat(createHttpLink({ uri }))

  const splitLink = wsLink
    ? split(
        ({ query }) => {
          const mainDefinition = getMainDefinition(query)

          const { kind } = mainDefinition

          return (
            kind === 'OperationDefinition' &&
            mainDefinition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  const link = from([retryLink, splitLink])

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'cache-and-network',
    //   },
    // },
  })
}

interface RestartableClient extends Client {
  restart(): void
  isOpen(): boolean
}

function createRestartableClient(options: ClientOptions): RestartableClient {
  let restartRequested = false
  let restart = () => {
    restartRequested = true
  }

  let connectionOpen = false
  let socket: WebSocket
  let timedOut: number

  const client = createClient({
    ...options,
    on: {
      ...options.on,
      error: (error) => {
        console.error(error)
        options.on?.error?.(error)

        restart()
      },
      ping: (received) => {
        if (!received /* sent */) {
          timedOut = window.setTimeout(() => {
            // a close event `4499: Terminated` is issued to the current WebSocket and an
            // artificial `{ code: 4499, reason: 'Terminated', wasClean: false }` close-event-like
            // object is immediately emitted without waiting for the one coming from `WebSocket.onclose`
            //
            // calling terminate is not considered fatal and a connection retry will occur as expected
            //
            // see: https://github.com/enisdenjo/graphql-ws/discussions/290
            client.terminate()
            restart()
          }, 5_000)
        }
      },
      pong: (received) => {
        if (received) {
          clearTimeout(timedOut)
        }
      },
      opened: (originalSocket) => {
        socket = originalSocket as WebSocket
        options.on?.opened?.(socket)
        connectionOpen = true

        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            // if the socket is still open for the restart, do the restart
            socket.close(4205, 'Client Restart')
          } else {
            // otherwise the socket might've closed, indicate that you want
            // a restart on the next opened event
            restartRequested = true
          }
        }

        // just in case you were eager to restart
        if (restartRequested) {
          restartRequested = false
          restart()
        }
      },
      closed: (event) => {
        options?.on?.closed?.(event)
        connectionOpen = false
      },
    },
  })

  return {
    ...client,
    restart: () => restart(),
    isOpen: () => connectionOpen,
  }
}
