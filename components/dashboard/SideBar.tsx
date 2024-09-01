'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
	Home,
	ShoppingCart,
	Package,
	Users2,
	LineChart,
	Settings,
	PanelLeft,
	Search,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';
import { ThreeCircles } from 'react-loader-spinner';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { userLoggedOut } from '@/redux/features/authentication/authenticationSlice';
import { Input } from '../ui/input';
import DashboardHeader from './DashboardHeader';

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

const SideBar = () => {
	const token = useAuth();
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const handleLogout = () => {
		dispatch(userLoggedOut());
		// Perform client-side navigation to /login
		window.location.href = '/login';
	};

	if (!token) {
		return (
			<ThreeCircles
				visible={true}
				height='100'
				width='100'
				color='#4fa94d'
				ariaLabel='three-circles-loading'
				wrapperStyle={{}}
				wrapperClass=''
			/>
		);
	}

	return (
		<aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
			<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
				{sidebar.map((item, index) => (
					<Tooltip key={index}>
						<TooltipTrigger asChild>
							<Link
								href={item.redirectTo}
								className={`flex h-9 w-9 items-center justify-center rounded-lg ${
									pathname === item.redirectTo
										? 'text-primary-foreground bg-primary hover:text-primary-foreground'
										: 'text-muted-foreground'
								} transition-colors hover:text-foreground md:h-8 md:w-8`}
							>
								<item.icon className='h-5 w-5' />
								<span className='sr-only'>{item.name}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>
							{item.name}
						</TooltipContent>
					</Tooltip>
				))}
			</nav>
		</aside>
	);
};

export default SideBar;
