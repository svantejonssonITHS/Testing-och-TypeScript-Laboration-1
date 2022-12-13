// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { HealthModule } from '$src/health/health.module';
import checkHealthResult from '$src/utils/test/checkHealthResult';

describe('HealthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [HealthModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/health (GET)', () => {
		return request(app.getHttpServer())
			.get('/health')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res: request.Response) => {
				checkHealthResult(res.body);
			});
	});
});
