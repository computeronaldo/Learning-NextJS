import { NextResponse } from "next/server";

export const middleware = (request: Request) => {
  const regex = new RegExp("/api/*");

  if (regex.test(request.url)) {
  }

  console.log("Middleware");
  console.log(request.method);
  console.log(request.url);

  const origin = request.headers.get("origin");
  console.log(origin);

  return NextResponse.next();
};

export const config = {
  matcher: "/api/:path*",
};
