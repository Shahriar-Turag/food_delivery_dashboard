import { LoginData, RegistrationData } from '@/data/models/authentication';
import { apiSlice } from '@/redux/apiSlice';
import { userLoggedIn } from './authenticationSlice';

export const authenticationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		restaurantOwnerRegistration: builder.mutation({
			query: (data: RegistrationData) => ({
				url: `register/restaurant/`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
		restaurantOwnerLogin: builder.mutation({
			query: (data: LoginData) => ({
				url: `login/`,
				method: 'POST',
				body: {
					email: data.email,
					password: data.password,
				},
			}),
			invalidatesTags: ['User'],
			async onQueryStarted(
				arg: LoginData,
				{ queryFulfilled, dispatch }: any
			): Promise<void> {
				try {
					const result = await queryFulfilled;
					localStorage.setItem(
						`token`,
						JSON.stringify({
							token: result.token,
							user_info: result.user_info,
						})
					);
					dispatch(
						userLoggedIn({
							token: result.token,
							user_info: result.user_info,
						})
					);
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export const {
	useRestaurantOwnerRegistrationMutation,
	useRestaurantOwnerLoginMutation,
} = authenticationApi;
