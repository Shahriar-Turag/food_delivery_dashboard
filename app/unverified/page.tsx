'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks/hooks';
import Image from 'next/image';
export default function Unverified() {
	const Router = useRouter();
	const user_info = useAppSelector(
		(state) => state.authenticationReducer.user_info
	);

	console.log(user_info, 'user_info');

	useEffect(() => {
		if (user_info?.verified) {
			Router.push('/dashboard');
		}
	}, [user_info?.verified]);
	return (
		<main className='flex flex-col lg:flex-row items-center justify-center mt-10 p-6'>
			<div className='space-y-5'>
				<h1 className='text-3xl font-bold'>
					It looks like your restaurant isn't verified yet.
				</h1>
				<p>
					Wait for some moment. One of our investigator will reach you
					and make sure you are eligible for our platform
				</p>
				<p>Thanks for your patience 😁</p>
			</div>
			<Image
				src={'/images/waiting.png'}
				alt='waiting'
				width={600}
				height={600}
			/>
		</main>
	);
}
