import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  } else {
    return {
      plugins: [
        honox({
          devServer: {
            adapter,
          },
        }),
        pages(),
        mdx({
          jsxImportSource: "hono/jsx",
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        }),
      ],
    };
  }
});
