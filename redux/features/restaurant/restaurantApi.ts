import { apiSlice } from '@/redux/apiSlice';

export const restaurantApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRestaurant: builder.query({
			query: (id: string) => ({
				url: `restaurants/${id}/`,
				method: 'GET',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('token') || '{}').token
					}`,
				},
			}),
		}),
	}),
});

export const { useGetRestaurantQuery } = restaurantApi;
