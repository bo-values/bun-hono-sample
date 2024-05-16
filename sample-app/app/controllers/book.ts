import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  resolver as bookListGetResolver,
  routeDifinision as bookListGetRouteDifinision,
} from "../repositories/book/list/get";
import {
  resolver as bookPostResolver,
  routeDifinision as bookPostRouteDifinition,
} from "../repositories/book/post";

const bookController = new OpenAPIHono()
  .openapi(bookListGetRouteDifinision, bookListGetResolver)
  .openapi(bookPostRouteDifinition, bookPostResolver);

bookController.get(
  "/ui",
  swaggerUI({
    url: "/api/book",
  })
);
bookController.doc("/", {
  openapi: "3.1.0",
  info: {
    title: "Book API",
    version: "v1",
  },
});

export default bookController;
