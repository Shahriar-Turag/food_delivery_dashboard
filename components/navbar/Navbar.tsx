'use client';
import { Iceland } from 'next/font/google';
import React from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useGetRestaurantQuery } from '@/redux/features/restaurant/restaurantApi';

type Props = {};

//font
const iceland = Iceland({
	weight: '400',
	subsets: ['latin'],
});

const Navbar = (props: Props) => {
	const router = useRouter();
	const { token } = useAppSelector((state) => state.authenticationReducer);

	const pathname = usePathname();

	return (
		!pathname.includes('dashboard') && (
			<div className=''>
				<nav className='flex items-center justify-between p-5 max-w-7xl  mx-auto'>
					<div
						onClick={() => router.push('/register')}
						className={`${iceland.className} font-semibold text-3xl text-primary cursor-pointer`}
					>
						Food Delivery
					</div>
					<div className='flex items-center gap-2'>
						{token ? (
							<Button onClick={() => router.push('/login')}>
								Logout
							</Button>
						) : (
							<Button onClick={() => router.push('/login')}>
								Login
							</Button>
						)}
						<ThemeToggle />
					</div>
				</nav>
			</div>
		)
	);
};

export default Navbar;
