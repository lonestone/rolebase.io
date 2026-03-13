import type { AstroUserConfig } from "astro";

type Redirects = NonNullable<AstroUserConfig["redirects"]>;

// Static redirections only, wildcards in netlify.toml
export const redirects: Redirects = {
  "/demande-demo": "/fr/contact",
};
