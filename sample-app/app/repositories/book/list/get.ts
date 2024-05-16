import { RouteHandler, createRoute, z } from "@hono/zod-openapi";
export const routeDifinision = createRoute({
  path: "/list",
  method: "get",
  description: "本のリストを返す",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            result: z.array(
              z.object({
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
              })
            ),
          }),
        },
      },
    },
  },
});

export const resolver: RouteHandler<typeof routeDifinision> = (context) => {
  return context.json({
    result: [
      {
        id: "fvosovmmvosmo",
        title: "テストbook1",
        description: "説明1",
      },
      {
        id: "mdsmvosdvmo",
        title: "テストbook2",
        description: "説明2",
      },
      {
        id: "ndosnvovnson",
        title: "テストbook3",
        description: "説明3",
      },
    ],
  });
};
