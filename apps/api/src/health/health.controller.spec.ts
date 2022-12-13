// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import type { HealthResult } from '_packages/shared-types';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import checkHealthResult from '$src/utils/test/checkHealthResult';

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

		checkHealthResult(result);
	});
});
