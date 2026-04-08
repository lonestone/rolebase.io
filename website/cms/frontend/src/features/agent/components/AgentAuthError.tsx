import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { startClaudeLogin, waitClaudeLogin } from '../../../api.js'
import { RiLoginBoxLine, RiRefreshLine, RiLoader4Line } from 'react-icons/ri'

interface Props {
  error?: string
  onRetry: () => void
}

export function AgentAuthError({ error, onRetry }: Props) {
  const [status, setStatus] = useState<
    'idle' | 'starting' | 'waiting' | 'error'
  >('idle')
  const [loginError, setLoginError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  async function handleLogin() {
    setStatus('starting')
    setLoginError(null)

    try {
      const result = await startClaudeLogin()

      if (result.error) {
        setLoginError(result.error)
        setStatus('error')
        return
      }

      // Open the login URL in a new tab
      const url = result.automaticUrl || result.manualUrl
      if (url) {
        window.open(url, '_blank')
      }

      // Wait for the OAuth flow to complete
      setStatus('waiting')
      const waitResult = await waitClaudeLogin()

      if (waitResult.error) {
        setLoginError(waitResult.error)
        setStatus('error')
        return
      }

      // Login succeeded — refresh status
      setStatus('idle')
      queryClient.invalidateQueries({ queryKey: ['claude-status'] })
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
      setStatus('error')
    }
  }

  const isLoading = status === 'starting' || status === 'waiting'

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 text-center">
      <div className="text-text-muted text-xs space-y-2">
        <p className="font-semibold text-sm text-text">
          Claude not connected
        </p>
        {(loginError || error) && status !== 'waiting' && (
          <p className="text-[11px] bg-bg-hover rounded p-2 text-left break-words max-h-24 overflow-y-auto">
            {loginError || error}
          </p>
        )}
        {status === 'waiting' && (
          <p className="text-[11px]">
            Complete the login in the browser tab, then come back here.
          </p>
        )}
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-md bg-primary text-white hover:opacity-90 cursor-pointer disabled:opacity-70 disabled:cursor-default"
        aria-label="Login with Claude"
        tabIndex={0}
      >
        {isLoading ? (
          <>
            <RiLoader4Line size={14} className="animate-spin" />
            {status === 'starting' ? 'Starting login...' : 'Waiting for login...'}
          </>
        ) : (
          <>
            <RiLoginBoxLine size={14} />
            Login with Claude
          </>
        )}
      </button>

      {!isLoading && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text cursor-pointer"
          tabIndex={0}
          aria-label="Retry connection"
        >
          <RiRefreshLine size={12} />
          Retry
        </button>
      )}
    </div>
  )
}
