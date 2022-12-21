// External dependencies
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext, HttpException } from '@nestjs/common';

// Internal dependencies
import { AuthGuard } from './auth.guard';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

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

	it('Auth header is invalid | should not be able to activate', async () => {
		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: 'Bearer invalid-token'
			}
		});

		await expect(authGuard.canActivate(mockContext)).rejects.toThrow(HttpException);
	});

	it('Auth header is valid | should be able to activate', async () => {
		const token: string = await getAuth0AccessToken();

		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: `Bearer ${token}`
			}
		});

		expect(await authGuard.canActivate(mockContext)).toBe(true);
	});
});
