// External dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Internal dependencies
import { OptionsModule } from '$src/options/options.module';

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

				expect(res.body).toHaveProperty('categories');
				expect(res.body.categories).toBeInstanceOf(Array);
				expect(res.body.categories.length).toBeGreaterThan(0);
				expect(res.body.categories[0]).toBeInstanceOf(Object);
				expect(res.body.categories[0]).toHaveProperty('label');
				expect(res.body.categories[0]).toHaveProperty('value');

				expect(res.body).toHaveProperty('tags');
				expect(res.body.tags).toBeInstanceOf(Array);
				expect(res.body.tags.length).toBeGreaterThan(0);
				expect(res.body.tags[0]).toBeInstanceOf(Object);
				expect(res.body.tags[0]).toHaveProperty('label');
				expect(res.body.tags[0]).toHaveProperty('value');

				expect(res.body).toHaveProperty('regions');
				expect(res.body.regions).toBeInstanceOf(Array);
				expect(res.body.regions.length).toBeGreaterThan(0);
				expect(res.body.regions[0]).toBeInstanceOf(Object);
				expect(res.body.regions[0]).toHaveProperty('label');
				expect(res.body.regions[0]).toHaveProperty('value');

				expect(res.body).toHaveProperty('difficulties');
				expect(res.body.difficulties).toBeInstanceOf(Array);
				expect(res.body.difficulties.length).toBeGreaterThan(0);
				expect(res.body.difficulties[0]).toBeInstanceOf(Object);
				expect(res.body.difficulties[0]).toHaveProperty('label');
				expect(res.body.difficulties[0]).toHaveProperty('value');
			});
	});
});
