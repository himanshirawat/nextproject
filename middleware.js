import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  console.log("Current Path:", path);

  const isPublicPath = path === "/login" || path === "/signup";
  const authToken = request.cookies.get("authToken");

  console.log("Auth Token:", authToken);

  if (isPublicPath) {
    if (authToken) {
      console.log("User is already authenticated. Redirecting to home page.");
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      console.log("User is not authenticated. Allowing access to login page.");
      return null;
    }
  } else {
    console.log("User is trying to access a protected route.");
    if (authToken == null) {
      console.log("User is not authenticated. Redirecting to login page.");
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    } else {
      console.log("User is authenticated. Allowing access to protected route.");
      return null; 
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
