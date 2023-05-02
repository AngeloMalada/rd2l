// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { WebhookEvent, clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const evt = req.body as WebhookEvent;
	if (evt.type === 'user.created') {
		//get userlist from clerk
		await clerkClient.users.updateUser(evt.data.id, {
			publicMetadata: {
				role: 'USER',
			},
		});
	}
	res.status(200).json({ status: 'ok' });
}
