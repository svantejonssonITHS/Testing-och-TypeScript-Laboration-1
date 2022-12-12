// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { HealthModule } from '$src/health/health.module';

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
				expect(res.body).toBeDefined();
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty('status');
				expect(res.body).toHaveProperty('message');
				expect(res.body).toHaveProperty('uptime');
				expect(res.body).toHaveProperty('timestamp');
				expect(res.body).toHaveProperty('triviaApi');
				expect(res.body.triviaApi).toBeInstanceOf(Object);
				expect(res.body.triviaApi).toHaveProperty('status');
				expect(res.body.triviaApi).toHaveProperty('message');
			});
	});
});
