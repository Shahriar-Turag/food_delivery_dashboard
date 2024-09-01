export type RegistrationData = {
	first_name: string;
	last_name: string;
	email: string;
	restaurant_name: string;
	restaurant_location: string;
	phone_number: string;
	password: string;
	user_type: string;
};

export type LoginData = {
	email: string;
	password: string;
};
