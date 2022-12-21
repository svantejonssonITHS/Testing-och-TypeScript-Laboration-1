// External dependencies
import * as request from 'supertest';

// Internal dependencies
import checkOptions from '$src/utils/test/checkOptions';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

describe('OptionsController (e2e)', () => {
	it('/options (GET) Invalid token', async () => {
		return request(global.SERVER).get('/options').set('Authorization', `Bearer invalid_token`).expect(401);
	});

	it('/options (GET) Valid token', async () => {
		const token: string = await getAuth0AccessToken();

		return request(global.SERVER)
			.get('/options')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkOptions(res.body);
			});
	});
});
