import { request } from "http";
import { NextResponse } from "next/server";

type Feedback = {
  name?: string;
  email?: string;
  message?: string;
};

export const POST = async (request: Request) => {
  const data: Feedback = await request.json();
  console.log("data: ", data);

  const { email, name, message } = data;

  return NextResponse.json({
    name,
    email,
    message,
  });
};
