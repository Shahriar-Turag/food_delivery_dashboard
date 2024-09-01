import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '../ui/breadcrumb';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useGetRestaurantQuery } from '@/redux/features/restaurant/restaurantApi';

type Props = {
	handleLogout: () => void;
	pathname: string;
	sidebar: {
		icon: any;
		name: string;
		redirectTo: string;
	}[];
};

const labelMapping: Record<string, string> = {
	dashboard: 'Dashboard',
	products: 'Products',
	edit: 'Edit Product',
	// Add more mappings as needed
};

const DashboardHeader = ({
	handleLogout,
	pathname,
	sidebar: Sidebar,
}: Props) => {
	const restaurantID = useAppSelector(
		(state) => state.authenticationReducer.user_info.restaurant_id
	);
	const { data, error, isLoading } = useGetRestaurantQuery(restaurantID);
	console.log(data, 'data');
	const pathSegments = pathname.split('/').filter(Boolean);

	return (
		<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline' className='sm:hidden'>
						<PanelLeft className='h-5 w-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='sm:max-w-xs'>
					<nav className='grid gap-6 text-lg font-medium'>
						{Sidebar.map((item, index) => (
							<Link
								key={index}
								href={item.redirectTo}
								className={`flex items-center gap-4 px-2.5 ${
									pathname === item.redirectTo
										? 'text-foreground'
										: 'text-muted-foreground'
								} hover:text-foreground`}
							>
								<item.icon className='h-5 w-5' />
								{item.name}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>
			<Breadcrumb className='hidden md:flex'>
				<BreadcrumbList>
					{pathSegments.map((segment, index) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link
										href={`/${pathSegments
											.slice(0, index + 1)
											.join('/')}`}
									>
										{labelMapping[segment] || segment}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index < pathSegments.length - 1 && (
								<BreadcrumbSeparator />
							)}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<div className='relative ml-auto flex-1 md:grow-0 flex gap-2'>
				<ThemeToggle />
				<div className='relative ml-auto flex-1 md:grow-0'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						placeholder='Search...'
						className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='overflow-hidden rounded-full'
						>
							{data?.user?.image ? (
								<Image
									src={data?.user?.image}
									width={36}
									height={36}
									alt='Avatar'
									className='overflow-hidden rounded-full'
								/>
							) : (
								<div className='overflow-hidden rounded-full bg-primary w-9 h-9 flex items-center justify-center text-primary-foreground'>
									{data?.user?.first_name[0].toUpperCase() +
										data?.user?.last_name[0].toUpperCase()}
								</div>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default DashboardHeader;
