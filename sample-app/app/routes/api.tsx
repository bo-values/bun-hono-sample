import { Hono } from "hono";
import { logger } from "hono/logger";
import bookController from "../controllers/book";

import { deleteCookie, setCookie } from "hono/cookie";
import { jwt, sign } from "hono/jwt";

const payload = {
  sub: "test_user",
  role: "admin",
  exp: Math.floor(Date.now() / 1000) + 60 * 5, // 有効期限 5分
};
const secret = "ENV_JWT_SECRET_KEY";
const token = await sign(payload, secret);

const app = new Hono();

app.use("*", logger());

app.get("/login", (c) => {
  setCookie(c, "hono-app", token);
  return c.text("success login.");
});

app.get("/logout", (c) => {
  deleteCookie(c, "hono-app");
  return c.text("success logout.");
});

app.use("/admin/*", (c, next) => {
  const jwtMiddleware = jwt({
    cookie: "hono-app",
    secret,
  });
  return jwtMiddleware(c, next);
});

app.get("/admin/page", (c) => {
  return c.text("You are authorized");
});

app.route("/book", bookController);

export default app;
