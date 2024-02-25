import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    try {
        const token = await getToken({ req: request });

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login?error=Login-to-access", request.url));
        }

        const adminProtectedRoutes = ["/admin", "/admin/appointment"];

        if (adminProtectedRoutes.includes(pathname)) {
            const user: CustomUser | null = token?.user as CustomUser;

            if (!user || user.role !== 'Admin') {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }
        }
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(new URL("/admin/login?error=Login-to-access", request.url));
    }

    return NextResponse.next();
}
