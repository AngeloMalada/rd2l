import { SignedIn, UserButton, useUser } from '@clerk/nextjs';

import React from 'react';

type Props = {};

type Role = 'ADMIN' | 'USER';

function HomePage({}: Props) {
	//get clerk user data
	const user = useUser();
	return (
		<div className='h-screen bg-[#151515] justify-center items-center flex flex-col gap-10'>
			<UserButton
				appearance={{
					elements: {
						userButtonAvatarBox: 'w-24 h-24',
					},
				}}
			/>
			<div className='flex flex-col text-center font-bold uppercase'>
				<span>{user.user?.primaryEmailAddress?.emailAddress}</span>
				<span>{user.user?.publicMetadata?.role as Role}</span>
				<span>{user.user?.fullName}</span>
			</div>
		</div>
	);
}

export default HomePage;
