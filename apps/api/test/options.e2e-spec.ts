// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { OptionsModule } from '$src/options/options.module';
import checkOptions from '$src/utils/test/checkOptions';

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
				checkOptions(res.body);
			});
	});
});
