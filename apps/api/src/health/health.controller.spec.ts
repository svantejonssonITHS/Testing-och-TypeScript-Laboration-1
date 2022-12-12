// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { HealthResult } from '$src/types';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
	let controller: HealthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
			providers: [HealthService]
		}).compile();

		controller = module.get<HealthController>(HealthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should respond with HealthResult object', async () => {
		const result: HealthResult = await controller.checkHealth();

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);
		expect(result).toHaveProperty('status');
		expect(result).toHaveProperty('message');
		expect(result).toHaveProperty('uptime');
		expect(result).toHaveProperty('timestamp');
		expect(result).toHaveProperty('triviaApi');
		expect(result.triviaApi).toBeInstanceOf(Object);
		expect(result.triviaApi).toHaveProperty('status');
		expect(result.triviaApi).toHaveProperty('message');
	});
});
