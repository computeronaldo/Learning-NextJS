import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

const API_KEY: string = process.env.DATA_API_KEY as string;

export const GET = async (request: Request) => {
  const origin = request.headers.get("origin");
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  });
};

export const DELETE = async (request: Request) => {
  const { id }: Partial<Todo> = await request.json();

  //   const { id }: {[P in keyof Todo]? : Todo[P] | undefined} = await request.json();
  if (!id) return NextResponse.json({ message: "Todo id required" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({
    message: `Todo ${id} deleted`,
  });
};

export const POST = async (request: Request) => {
  const { userId, title }: Partial<Todo> = await request.json();

  //   const { id }: {[P in keyof Todo]? : Todo[P] | undefined} = await request.json();
  if (!userId || !title)
    return NextResponse.json({
      message: "All required fields are not specified",
    });

  const res = await fetch(`${DATA_SOURCE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
};

export const PUT = async (request: Request) => {
  const { userId, id, title, completed }: Todo = await request.json();

  if (!userId || !title || !id || typeof completed !== "boolean")
    return NextResponse.json({
      message: "All required fields are not specified",
    });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
};
