'use client';
import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useRestaurantOwnerLoginMutation } from '@/redux/features/authentication/authenticationApi';
import * as Yup from 'yup';
import { LoginData } from '@/data/models/authentication';
import { userLoggedIn } from '@/redux/features/authentication/authenticationSlice';
import { useAppDispatch } from '@/redux/hooks/hooks';

// Define the validation schema
const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

const SignIn = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const [login, { isLoading, isSuccess, isError, error }] =
		useRestaurantOwnerLoginMutation();

	const dispatch = useAppDispatch();

	// Set up useForm with Yup validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: yupResolver(loginSchema),
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		try {
			const result = await login(data).unwrap();

			// Extracting token and user_info from the result
			const { token, user_info } = result;

			// Storing token and user_info in localStorage
			localStorage.setItem('token', JSON.stringify({ token, user_info }));

			// Dispatch an action to update the Redux store with the logged-in user information
			dispatch(userLoggedIn({ token, user_info }));

			toast({
				title: 'Success',
				description: 'You have successfully logged in!',
			});

			if (!user_info.verified) {
				router.push('/unverified');
			} else {
				router.push('/dashboard');
			}
		} catch (error: any) {
			const errorMessage =
				error?.data?.message || 'Failed to log in. Please try again.';

			toast({
				variant: 'destructive',
				title: 'Error',
				description: errorMessage,
			});
		}
	};
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-10 mt-10'>
			<div className='space-y-5'>
				<h1 className='text-3xl font-semibold text-center lg:text-left'>
					Boost your revenue with food delivery!
				</h1>
				<p className='text-primary font-bold w-full lg:w-[80%] text-center lg:text-left'>
					Sign up now and start earning more with the leading food
					delivery service foodpanda.
				</p>
			</div>
			<Card className='w-[350px] lg:w-[450px]'>
				<CardHeader>
					<CardTitle>Welcome Back. Login!</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid w-full items-center gap-5'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>
									Enter Your Business Email
								</Label>
								<Input
									type='email'
									id='email'
									placeholder='johndoe@gmail.com'
									className='shadow-sm'
									{...register('email')}
								/>
								<p className='text-red-500 text-sm'>
									{errors.email?.message}
								</p>
							</div>

							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<div className='relative bg-transparent'>
									<input
										type={
											showPassword ? 'text' : 'password'
										}
										placeholder='Password'
										className='w-full px-4 py-2 border border-slate-200 rounded-md shadow-sm focus:outline-none bg-transparent'
										{...register('password')}
									/>
									<div
										className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<VscEyeClosed
												className='text-primary font-bold'
												size={22}
											/>
										) : (
											<VscEye
												className='text-primary font-bold'
												size={22}
											/>
										)}
									</div>
								</div>
								<p className='text-red-500 text-sm'>
									{errors.password?.message}
								</p>
							</div>
						</div>
						<CardFooter className='flex flex-col justify-between w-full mt-5'>
							<Button
								type='submit'
								className='w-full'
								disabled={isLoading}
							>
								{isLoading ? 'Logging in...' : 'Log In'}
							</Button>
							<div className='flex items-center w-full mt-5'>
								<p>Don't have an account?</p>
								<Button
									onClick={() => router.push('/register')}
									variant={'link'}
									className=''
								>
									Sign Up
								</Button>
							</div>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
