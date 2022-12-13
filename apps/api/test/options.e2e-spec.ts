// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { OptionsModule } from '$src/options/options.module';
import checkOptionsProperty from '$src/utils/test/checkOptionsProperty';

describe('OptionsController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [OptionsModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/options (GET)', () => {
		return request(app.getHttpServer())
			.get('/options')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				expect(res.body).toBeDefined();
				expect(res.body).toBeInstanceOf(Object);

				for (const property of ['categories', 'tags', 'regions', 'difficulties']) {
					checkOptionsProperty(res.body, property);
				}
			});
	});
});
