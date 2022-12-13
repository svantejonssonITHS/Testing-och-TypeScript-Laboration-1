// External dependencies
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

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
		const token: string = await getAuth0AccessToken();

		mockContext.switchToHttp().getRequest.mockReturnValue({
			headers: {
				authorization: `Bearer ${token}`
			}
		});

		const canActivate: boolean = await authGuard.canActivate(mockContext);

		expect(canActivate).toBe(true);
	});
});
