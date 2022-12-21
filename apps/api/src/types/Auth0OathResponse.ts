type Auth0OathResponse = {
	access_token: string;
	id_token: string;
	expires_in: number;
	token_type: string;
};

export default Auth0OathResponse;
