import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export const GET = async (request: Request) => {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const todo: Todo = await res.json();

  if (!todo.id) {
    return NextResponse.json({
      message: "ID not found",
    });
  }
  return NextResponse.json(todo);
};
