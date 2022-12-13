// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { GameModule } from '$src/game/game.module';
import checkGame from '$src/utils/test/checkGame';
import getAuth0AccessToken from '$src/utils/test/getAuth0AccessToken';

describe('GameController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [GameModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/game (POST)', async () => {
		const token: string = await getAuth0AccessToken();

		return request(app.getHttpServer())
			.post('/game')
			.set('Authorization', `Bearer ${token}`)
			.expect(201)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkGame(res.body);
			});
	});
});
