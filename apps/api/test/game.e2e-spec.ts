// External dependencies
import * as request from 'supertest';

// Internal dependencies
import checkGame from '$src/utils/test/checkGame';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

describe('GameController (e2e)', () => {
	it('/game (POST) Invalid token', async () => {
		return request(global.SERVER).post('/game').set('Authorization', `Bearer invalid_token`).expect(401);
	});

	it('/game (POST) Valid token', async () => {
		const token: string = await getAuth0AccessToken();

		return request(global.SERVER)
			.post('/game')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkGame(res.body);
			});
	});
});
