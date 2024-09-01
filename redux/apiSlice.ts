import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store'; // Import the RootState type

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/`,
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		// Define your endpoints here
	}),
});
