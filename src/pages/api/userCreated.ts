// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { clerkClient } from '@clerk/clerk-sdk-node/dist/types/clerkClient';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const evt = req.body.evt as WebhookEvent;
	if (evt.type === 'user.created') {
		//get userlist from clerk
		await clerkClient.users.updateUser(evt.data.id, {
			publicMetadata: {
				role: 'USER',
			},
		});

		res.send('ok');
	}
}
