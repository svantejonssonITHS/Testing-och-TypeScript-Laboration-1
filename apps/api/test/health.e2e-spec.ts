// External dependencies
import * as request from 'supertest';

// Internal dependencies
import checkHealthResult from '$src/utils/test/checkHealthResult';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

describe('HealthController (e2e)', () => {
	it('/health (GET) Invalid token', async () => {
		return request(global.SERVER).get('/health').set('Authorization', `Bearer invalid_token`).expect(401);
	});

	it('/health (GET) Valid token', async () => {
		const token: string = await getAuth0AccessToken();

		return request(global.SERVER)
			.get('/health')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkHealthResult(res.body);
			});
	});
});
