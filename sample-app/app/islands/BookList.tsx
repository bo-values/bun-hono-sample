import { InferResponseType, hc } from "hono/client";
import { useEffect, useState } from "hono/jsx";
import BookController from "../controllers/book";

export default function BookList() {
  const bookClient = hc<typeof BookController>("/api/book");
  const [bookList, setBookList] =
    useState<InferResponseType<typeof bookClient.list.$get>>();
  useEffect(() => {
    (async () => {
      const res = await bookClient.list.$get();
      if (res.ok) {
        const data = await res.json();
        setBookList(data);
      }
    })();
  }, []);

  if (!bookList) return <></>;
  return (
    <>
      {bookList.result.map((book) => (
        <div>
          <p>{book.title}</p>
          <p>{book.description}</p>
        </div>
      ))}
    </>
  );
}
