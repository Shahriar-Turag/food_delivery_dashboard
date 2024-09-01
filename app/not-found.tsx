'use client';
import React from 'react';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hooks/hooks';
export default function NotFound() {
	const token = useAppSelector((state) => state.authenticationReducer.token);
	return (
		<main className='grid min-h-screen place-content-center space-y-5 text-center'>
			<h2 className='text-2xl font-semibold'>Not Found</h2>
			<p>Could not find requested resource</p>
			<div className='flex items-center justify-center'>
				<Button className='font-semibold'>
					<Link
						className='no-underline'
						href={token ? '/dashboard' : '/login'}
					>
						Return Home
					</Link>
				</Button>
			</div>
		</main>
	);
}
