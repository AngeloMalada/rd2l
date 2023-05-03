// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { WebhookEvent, clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const role = req.body.role;
	console.log(req.body);
	if (req.method === 'POST') {
		await clerkClient.users.updateUser(req.body.userId, {
			publicMetadata: {
				role: role,
			},
		});
	}

	res.status(200).json({ status: 'role changed to ', role });
}
