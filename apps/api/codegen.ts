import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  watch: true,
  schema: [
    {
      "http://localhost:1337/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "nhost-admin-secret",
        },
      },
    },
  ],
  documents: "src/**/*.ts",
  generates: {
    ["hasura/schema.graphql"]: {
      plugins: ["schema-ast"],
    },

    ["src/graphql/types.ts"]: {
      plugins: ["typescript"],
    },

    ["src/graphql/sdk.ts"]: {
      plugins: ["typescript-operations", "typescript-graphql-request"],
      config: {
        strictScalars: true,
        scalars: {
          bigint: "number",
          bytea: "unknown",
          citext: "string",
          json: "Record<string, any>",
          jsonb: "Record<string, any>",
          smallint: "number",
          timestamptz: "string",
          uuid: "string",
        }
      }
    },
  },
};

export default config;
