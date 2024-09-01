'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className='grid min-h-screen place-content-center space-y-5 text-center'>
			<h1 className='text-2xl font-semibold'>There was a problem</h1>
			<p>
				Something went wrong, it&lsquo;s not you. It&lsquo;s us. Please
				refresh the page or click on home. Thank you.
			</p>
			<section className='grid gap-3'>
				<Button onClick={() => reset()} className='font-semibold'>
					Try again
				</Button>
			</section>
		</main>
	);
}
