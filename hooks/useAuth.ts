'use client';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
	const router = useRouter();
	const { token, user_info } = useAppSelector(
		(state) => state.authenticationReducer
	);

	console.log(user_info.verified, 'user_info');

	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [token, router]);

	return { token };
};

export default useAuth;
