import { useAuth } from '@clerk/nextjs';
import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Claims = {
	userId: string;
	sessionClaims: {
		metadata: {
			role: string;
		};
	};
};

export default withClerkMiddleware((req: NextRequest) => {
	const { userId, sessionClaims: role } = getAuth(req) as unknown as Claims;
	return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
	matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
