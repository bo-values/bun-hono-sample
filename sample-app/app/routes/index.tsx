import { css } from "hono/css";
import { createRoute } from "honox/factory";
import BookList from "../islands/BookList";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  return c.render(
    <div class={className}>
      <h1>Hello, {name}!</h1>
      <BookList />
    </div>,
    { title: name }
  );
});
