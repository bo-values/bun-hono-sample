import { RouteHandler, createRoute, z } from "@hono/zod-openapi";

export const routeDifinision = createRoute({
  path: "/",
  method: "post",
  description: "本を登録する",
  request: {
    body: {
      required: false,
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().openapi({
              example: "book title",
              description: "本のタイトル",
            }),
            description: z.string().openapi({
              example: "book description",
              description: "本の説明",
            }),
            detail: z.string().nullable().openapi({
              example: "book details",
              description: "本の詳細",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            result: z.object({
              message: z.string().openapi({
                example: "success",
                description: "Success create book: [book title]",
              }),
            }),
          }),
        },
      },
    },
  },
});

export const resolver: RouteHandler<typeof routeDifinision> = (context) => {
  const { title } = context.req.valid("json");
  return context.json({
    result: {
      message: `Success create book: ${title}`,
    },
  });
};
