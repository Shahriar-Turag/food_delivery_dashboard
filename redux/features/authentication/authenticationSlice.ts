import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: '',
	user_info: {
		first_name: '',
		last_name: '',
		email: '',
		restaurant_name: '',
		restaurant_location: '',
		phone_number: '',
		verified: false,
		user_type: 'restaurant',
		restaurant_id: '',
	},
	userAccountData: {
		first_name: '',
		last_name: '',
		email: '',
		restaurant_name: '',
		restaurant_location: '',
		phone_number: '',
		verified: false,
		user_type: 'restaurant',
		restaurant_id: '',
	},
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		userLoggedIn: (
			state,
			action: PayloadAction<{ token: string; user_info: any }>
		) => {
			state.token = action.payload.token;
			state.user_info = action.payload.user_info;
		},
		userLoggedOut(state) {
			state.token = '';
			state.user_info = {
				first_name: '',
				last_name: '',
				email: '',
				restaurant_name: '',
				restaurant_location: '',
				phone_number: '',
				verified: false,
				user_type: 'restaurant',
				restaurant_id: '',
			};
		},
		setToken(state, action) {
			state.token = action.payload;
		},
		setUserInfo(state, action) {
			state.user_info = action.payload;
		},
		setUserAccountData(state, action) {
			state.userAccountData = action.payload;
		},
	},
});

export const {
	userLoggedIn,
	userLoggedOut,
	setToken,
	setUserInfo,
	setUserAccountData,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
