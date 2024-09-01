'use client';
import SideBar from '@/components/dashboard/SideBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { userLoggedOut } from '@/redux/features/authentication/authenticationSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';
import {
	Home,
	LineChart,
	Package,
	Settings,
	ShoppingCart,
	Users2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const sidebar = [
		{
			icon: Home,
			name: 'Dashboard',
			redirectTo: '/dashboard',
		},
		{
			icon: ShoppingCart,
			name: 'Orders',
			redirectTo: '/dashboard/orders',
		},
		{
			icon: Package,
			name: 'Products',
			redirectTo: '/dashboard/products',
		},
		{
			icon: Users2,
			name: 'Customers',
			redirectTo: '/dashboard/customers',
		},
		{
			icon: LineChart,
			name: 'Analytics',
			redirectTo: '/dashboard/analytics',
		},
		{
			icon: Settings,
			name: 'Settings',
			redirectTo: '/dashboard/settings',
		},
	];

	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(userLoggedOut());
		window.location.href = '/login';
	};
	return (
		<>
			<div className='flex min-h-screen w-full flex-col bg-muted/40'>
				<SideBar />
				<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
					<DashboardHeader
						handleLogout={handleLogout}
						sidebar={sidebar}
						pathname={pathname}
					/>
					<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
						{children}
					</main>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
