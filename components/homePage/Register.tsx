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
import * as Yup from 'yup';
import { useToast } from '@/hooks/use-toast';
import { useRestaurantOwnerRegistrationMutation } from '@/redux/features/authentication/authenticationApi';
import { useRouter } from 'next/navigation';

// Define the validation schema
const registrationSchema = Yup.object().shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	restaurant_name: Yup.string().required('Restaurant name is required'),
	restaurant_location: Yup.string().required(
		'Restaurant location is required'
	),
	phone_number: Yup.string()
		.matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
		.required('Phone number is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});

interface FormData {
	first_name: string;
	last_name: string;
	email: string;
	restaurant_name: string;
	restaurant_location: string;
	phone_number: string;
	password: string;
	user_type?: string; // Optional because it's set in the onSubmit
}

const Register = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const [registerRestaurantOwner, { isLoading, isSuccess, isError }] =
		useRestaurantOwnerRegistrationMutation();

	// Set up useForm with Yup validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(registrationSchema),
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const formData = { ...data, user_type: 'restaurant' }; // Set user_type to 'restaurant' by default
		try {
			await registerRestaurantOwner(formData).unwrap();
			toast({
				title: 'Success',
				description: 'You have successfully registered!',
			});
			reset(); // Reset the form after successful registration
			router.push('/login');
		} catch (error: any) {
			const errorMessage =
				error?.data?.message || 'Failed to register. Please try again.';

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
					<CardTitle>Ready to grow your business?</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid w-full items-center gap-5'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='firstName'>
									Business Owner First Name
								</Label>
								<Input
									id='firstName'
									placeholder='John'
									className='shadow-sm'
									{...register('first_name')}
								/>
								<p className='text-red-500 text-sm'>
									{errors.first_name?.message}
								</p>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='lastName'>
									Business Owner Last Name
								</Label>
								<Input
									id='lastName'
									placeholder='Doe'
									className='shadow-sm'
									{...register('last_name')}
								/>
								<p className='text-red-500 text-sm'>
									{errors.last_name?.message}
								</p>
							</div>
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
								<Label htmlFor='restaurantName'>
									Restaurant Name
								</Label>
								<Input
									type='text'
									id='restaurantName'
									placeholder="John's Cuisine"
									className='shadow-sm'
									{...register('restaurant_name')}
								/>
								<p className='text-red-500 text-sm'>
									{errors.restaurant_name?.message}
								</p>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='restaurantLocation'>
									Restaurant Location
								</Label>
								<Input
									type='text'
									id='restaurantLocation'
									placeholder='123 Main St, New York, NY 10030'
									className='shadow-sm'
									{...register('restaurant_location')}
								/>
								<p className='text-red-500 text-sm'>
									{errors.restaurant_location?.message}
								</p>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='phoneNumber'>
									Phone Number
								</Label>
								<div className='flex items-center border border-slate-200 rounded-md overflow-hidden bg-transparent shadow-sm'>
									<div className='flex items-center bg-gray-100 px-2 py-2 lg:pr-7'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg'
											alt='Bangladesh Flag'
											className='w-6 h-4'
										/>
										<p className='text-gray-700'>+880</p>
									</div>
									<input
										type='tel'
										{...register('phone_number')}
										placeholder='Mobile Number'
										className='flex-1 px-4 py-2 outline-none bg-transparent text-gray-700'
									/>
								</div>
								<span className='text-red-500 px-1'>
									{errors.phone_number?.message}
								</span>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<div className='relative bg-transparent'>
									<input
										type={
											showPassword ? 'text' : 'password'
										}
										{...register('password')}
										placeholder='Password'
										className='w-full px-4 py-2 border border-slate-200 rounded-md shadow-sm focus:outline-none bg-transparent'
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
									<p className='text-red-500 text-sm'>
										{errors.password?.message}
									</p>
								</div>
							</div>
						</div>
						<CardFooter className='flex justify-between w-full mt-5'>
							<Button
								type='submit'
								className='w-full'
								disabled={isLoading}
							>
								{isLoading ? 'Registering...' : 'Get Started'}
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;
