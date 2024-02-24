import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";
import { NextResponse , NextRequest } from "next/server";

export async function middleware(request:NextRequest){
    const { pathname } = request.nextUrl

    if(pathname == "/admin/login"){
        return NextResponse.next
    }

    const token = await getToken({req:request})

    // * Protected routes 

    const adminProtectedRoutes = ["/admin" , "/admin/appointment"]; 

    if(token == null && adminProtectedRoutes.includes(pathname)){
        return NextResponse.redirect(new URL("/admin/login?error=Login-to-access" , request.url))
    }

    const user:CustomUser|null = token?.user as CustomUser

    if(adminProtectedRoutes.includes(pathname) && user.role == 'User'){
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }

}