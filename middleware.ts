import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(req: NextRequest) {
    return await updateSession(req)
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}


