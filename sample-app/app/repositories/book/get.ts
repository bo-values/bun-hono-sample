import { RouteHandler, createRoute, z } from "@hono/zod-openapi";

export const routeDifinision = createRoute({
  path: "/get",
  method: "get",
  description: "１つの本の詳細を返す",
  request: {
    query: z.object({
      id: z.string().openapi({
        example: "devFOGG0F9dvO=",
        description: "Book ID",
      }),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            result: z.object({
              id: z.string().openapi({
                example: "devFOGG0F9dvO=",
                description: "Book ID",
              }),
              title: z.string().openapi({
                example: "テストBook1",
                description: "本のタイトル",
              }),
              description: z.string().openapi({
                example: "テスト説明1",
                description: "本の説明",
              }),
              detail: z.string().openapi({
                example: "テストBook1の詳細",
                description: "本の詳細",
              }),
            }),
          }),
        },
      },
    },
  },
});

export const resolver: RouteHandler<typeof routeDifinision> = (context) => {
  const { id } = context.req.query();
  return context.json({
    result: {
      id: id,
      title: `テストbook${id}`,
      description: `説明${id}`,
      detail: `詳細${id}`,
    },
  });
};
