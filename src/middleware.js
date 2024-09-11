import { NextResponse } from "next/server";

export function middleware(request) {
  // const currentUser = request.cookies.get('currentUser')?.value

  // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return Response.redirect(new URL('/dashboard', request.url))
  // }

  // if (!currentUser && !request.nextUrl.pathname.startsWith('/')) {
  //   return Response.redirect(new URL('/', request.url))
  // }

  const { searchParams, pathname } = new URL(request.url);
  const size = Number(searchParams.get("size"));
  const page = Number(searchParams.get("page"));
  const type = searchParams.get("type");
  console.log(pathname.split("/").length);
  if (pathname.split("/").length > 2 && (size <= 0 || page < 0)) {
    // Если size некорректен, перенаправляем на корректный URL
    const url = request.nextUrl.clone();
    url.searchParams.set("size", "5"); // Устанавливаем минимальное значение
    url.searchParams.set("page", "0"); // Убедимся, что страница остается той же
    return NextResponse.redirect(url);
  }
  if (
    pathname.split("/")[2] == "categories" &&
    type != "supercategories" &&
    type != "subcategories" &&
    type != "all"
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.set("type", "all"); 
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
