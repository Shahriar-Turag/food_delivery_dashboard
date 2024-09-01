import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/navbar/Navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Container from '@/components/Container';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Food Delivery',
	description: 'Food delivery app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Container>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<TooltipProvider>
							<Navbar />
							{children}
							<Toaster />
						</TooltipProvider>
					</ThemeProvider>
				</Container>
			</body>
		</html>
	);
}
