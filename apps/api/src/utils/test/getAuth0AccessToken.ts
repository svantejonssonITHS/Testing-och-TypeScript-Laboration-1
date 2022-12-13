// External dependencies
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { lastValueFrom, map, Observable } from 'rxjs';

// Internal dependencies
import { Auth0OathResponse } from '$src/types';
import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_PASSWORD, AUTH0_USERNAME } from '../env';

export default async function getAuth0AccessToken(): Promise<string> {
	const httpService: HttpService = new HttpService();

	const observable: Observable<Auth0OathResponse> = await httpService
		.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
			client_id: AUTH0_CLIENT_ID,
			client_secret: AUTH0_CLIENT_SECRET,
			audience: `https://${AUTH0_DOMAIN}/api/v2/`,
			grant_type: 'password',
			username: AUTH0_USERNAME,
			password: AUTH0_PASSWORD,
			scope: 'openid'
		})
		.pipe(map((response: AxiosResponse) => response.data));

	const token: string = (await lastValueFrom(observable)).access_token;

	return token;
}
