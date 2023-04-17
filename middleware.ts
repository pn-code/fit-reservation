import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Setting up public paths
const publicPaths = ["/", "/register*", "/login*"];

// Function to determine if current url matches our public paths...
const isPublic = (path: string) => {
	return publicPaths.find((x) =>
		path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
	);
};

// How to deal with authenticated users and nonauthenticated users...
export default withClerkMiddleware((req: NextRequest) => {
	const { userId } = getAuth(req);

	// if user is signed in and at a public url, redirect to dashboard
	if (userId && isPublic(req.nextUrl.pathname)) {
		const dashboardUrl = new URL("/dashboard", req.url);
		return NextResponse.redirect(dashboardUrl);
	}

	if (isPublic(req.nextUrl.pathname)) {
		return NextResponse.next();
	}

	// if the user is not signed in redirect them to the sign in page.
	if (!userId) {
		const signInUrl = new URL("/login", req.url);
		signInUrl.searchParams.set("redirect_url", req.url);
		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 * - public folder
		 */
		"/((?!static|.*\\..*|_next|favicon.ico).*)",
		"/",
	],
};
