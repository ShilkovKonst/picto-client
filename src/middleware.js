import { NextResponse } from "next/server";

export async function middleware(request) {
  const { searchParams, pathname } = new URL(request.url);
  // if user is signed in => reroute from landing page to profile
  if (
    request.cookies.get("refreshToken") &&
    request.cookies.get("accessToken") &&
    pathname == "/"
  ) {
    return NextResponse.redirect(`${process.env.CLIENT_API_BASE_URL}/dashboard/`);
  }
  // if user is signed out => reroute to landing page
  if (
    !request.cookies.get("refreshToken") &&
    request.nextUrl.href.includes("dashboard")
  ) {
    return NextResponse.redirect(`${process.env.CLIENT_API_BASE_URL}/`);
  }
  // if user is still authenticated -> gain new access token via refresh api route
  if (
    request.cookies.get("refreshToken") &&
    !request.cookies.get("accessToken")
  ) {
    const cookies = request.headers.get("cookie");
    //await refreshAccessToken(cookies); // doesn't work, don't know why
    try {
      const res = await fetch(
        `${process.env.CLIENT_API_BASE_URL}/api/auth/refresh`,
        {
          method: "POST",
          headers: {
            Cookie: cookies,
          },
          credentials: "include",
        }
      );
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
        // console.log("response from middleware", response);
        return response;
      }
    } catch (error) {
      console.error("Error refreshing access-token:", error.message);
      return NextResponse.json(
        { message: "Internal server error while refreshing token" },
        { status: 500 }
      );
    }
    // console.log("middleware accessToken: ", request.cookies.get("accessToken"));
  }
  // correct url format for categories and pictograms if it is incorrect
  if (pathname.includes("categories") || pathname.includes("pictograms")) {
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
    if (!type) {
      const url = request.nextUrl.clone();
      url.searchParams.set("type", "all");
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
