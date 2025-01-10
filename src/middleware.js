import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken");
  const accessToken = request.cookies.get("accessToken");
  const session = accessToken ? jwtDecode(accessToken?.value) : null;
  const { searchParams, pathname } = new URL(request.url);
  // if user is signed in => reroute from landing page to profile
  if (refreshToken && accessToken && pathname == "/") {
    return NextResponse.redirect(
      `${process.env.CLIENT_API_BASE_URL}/dashboard/`
    );
  }
  // if user is signed out => reroute to landing page
  if (!refreshToken && request.nextUrl.href.includes("dashboard")) {
    return NextResponse.redirect(`${process.env.CLIENT_API_BASE_URL}/`);
  }
  // if user is still authenticated -> gain new access token via refresh api route
  if (refreshToken && !accessToken) {
    return refreshSession(request);
  }
  // correct url format for categories and pictograms if it is incorrect
  if (pathname.includes("categories") || pathname.includes("pictograms")) {
    return correctPathname(request, searchParams, pathname);
  }
  // check if user has rights to visit certains routes
  if (
    (pathname.includes("users") ||
      pathname.includes("patients") ||
      pathname.includes("notes")) &&
    pathname.split("/").length == 3 &&
    !session.roles.includes("ROLE_ADMIN")
  ) {
    return NextResponse.redirect(
      `${process.env.CLIENT_API_BASE_URL}/dashboard`
    );
  }
  if (
    pathname.includes("institutions") &&
    pathname.split("/").length == 3 &&
    !session.roles.includes("ROLE_SUPERADMIN")
  ) {
    return NextResponse.redirect(
      `${process.env.CLIENT_API_BASE_URL}/dashboard`
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

const restrictAccess = async (pathname, session) => {
  if (
    (pathname.includes("users") ||
      pathname.includes("patients") ||
      pathname.includes("notes")) &&
    pathname.split("/").length == 3 &&
    !session.roles.includes("ROLE_ADMIN")
  ) {
    return NextResponse.redirect(
      `${process.env.CLIENT_API_BASE_URL}/dashboard`
    );
  }
  if (
    pathname.includes("institutions") &&
    pathname.split("/").length == 3 &&
    !session.roles.includes("ROLE_SUPERADMIN")
  ) {
    return NextResponse.redirect(
      `${process.env.CLIENT_API_BASE_URL}/dashboard`
    );
  }
};

const correctPathname = async (request, searchParams, pathname) => {
  {
    const size = Number(searchParams.get("size"));
    const page = Number(searchParams.get("page"));
    const type = searchParams.get("type");

    if (
      pathname.includes("dashboard") &&
      pathname.split("/").length == 3 &&
      (size < 5 || page < 0)
    ) {
      const url = request.nextUrl.clone();
      url.searchParams.set("size", "5");
      url.searchParams.set("page", "0");
      return NextResponse.redirect(url);
    }
    if (
      pathname.includes("dashboard") &&
      pathname.split("/").length == 3 &&
      !type
    ) {
      const url = request.nextUrl.clone();
      url.searchParams.set("type", "all");
      return NextResponse.redirect(url);
    }
  }
};

const refreshSession = async (request) => {
  const cookies = request.headers.get("cookie");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_BASE_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: cookies,
        },
        credentials: "include",
      }
    );
    if (res.status == 404 || res.status == 401) {
      const response = NextResponse.redirect(new URL("/", request.url));

      response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 0,
        sameSite: "none",
      });
      return response;
    }
    if (res.headers.getSetCookie().length > 0) {
      const setCookieHeader = res.headers.getSetCookie();
      const [cookie, ...cookieAttributes] = setCookieHeader[0]?.split("; ");
      const attributes = {};
      cookieAttributes.forEach((attr) => {
        const [key, value] = attr.split("=");
        attributes[key.toLowerCase()] = value || true;
      });
      const response = NextResponse.next();
      response.cookies.set(cookie.split("=")[0], cookie.split("=")[1], {
        httpOnly: attributes["httponly"] || false,
        secure: attributes["secure"] || false,
        path: attributes["path"] || "/",
        maxAge: attributes["max-age"]
          ? parseInt(attributes["max-age"], 10)
          : undefined,
        expires: attributes["expires"]
          ? new Date(attributes["expires"])
          : undefined,
        sameSite: attributes["samesite"],
      });
      return response;
    }
  } catch (error) {
    console.error("Error refreshing access-token:", error.message);
    return NextResponse.json(
      { message: "Internal server error while refreshing token" },
      { status: 500 }
    );
  }
};
