import { nhost } from "@utils/nhost";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk";

const _graphqlClient = new GraphQLClient(nhost.graphql.getUrl(), {
  headers: {
    "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
  },
});

export const graphqlClient = getSdk(_graphqlClient);
