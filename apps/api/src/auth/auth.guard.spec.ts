// External dependencies
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { Observable, map, lastValueFrom } from 'rxjs';

// Internal dependencies
import { AuthGuard } from './auth.guard';
import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_USERNAME, AUTH0_PASSWORD } from '$src/utils/env';
import { Auth0OathResponse } from '$src/types';

describe('AuthGuard', () => {
	let authGuard: AuthGuard;

	let mockContext: DeepMocked<ExecutionContext>;

	beforeEach(() => {
		authGuard = new AuthGuard();
		mockContext = createMock<ExecutionContext>();
	});

	it('should be defined', () => {
		expect(authGuard).toBeDefined();
	});

	it('should not be able to activate', async () => {
		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: 'Bearer invalid-token'
			}
		});

		const canActivate: boolean = await authGuard.canActivate(mockContext);

		expect(canActivate).toBe(false);
	});

	it('should be able to activate', async () => {
		const httpService: HttpService = new HttpService();

		const observable: Observable<Auth0OathResponse> = await httpService
			.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
				client_id: AUTH0_CLIENT_ID,
				client_secret: AUTH0_CLIENT_SECRET,
				audience: `https://${AUTH0_DOMAIN}/api/v2/`,
				grant_type: 'password',
				username: AUTH0_USERNAME,
				password: AUTH0_PASSWORD
			})
			.pipe(map((response: AxiosResponse) => response.data));

		const data: Auth0OathResponse = await lastValueFrom(observable);

		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: `Bearer ${data.access_token}`
			}
		});

		const canActivate: boolean = await authGuard.canActivate(mockContext);

		expect(canActivate).toBe(true);
	});
});
