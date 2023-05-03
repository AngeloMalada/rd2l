//create next api route

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useAuth } from '@clerk/nextjs';
import { requireAuth } from '@clerk/nextjs/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerGetToken } from '@clerk/types';

interface ClerkRequest extends NextApiRequest {
	auth: {
		userId?: string | null;
		sessionId?: string | null;
		getToken: ServerGetToken;
	};
}

interface User {
	userId: string;
	sessionClaims: {
		email: string;
		name: string;
		surname: string;
		metadata: {
			role: string;
		};
	};
}

export default requireAuth(async (req: ClerkRequest, res: NextApiResponse) => {
	const user = req.auth as unknown as User;
	res
		.status(200)
		.json(
			user.sessionClaims.metadata.role === 'USER'
				? 'you shall pass'
				: 'you cant pass'
		);
});
