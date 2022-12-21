// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { Options } from '_packages/shared/types';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import checkOptions from '$src/utils/test/checkOptions';

describe('OptionsController', () => {
	let controller: OptionsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OptionsController],
			providers: [OptionsService]
		}).compile();

		controller = module.get<OptionsController>(OptionsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should respond with Options object', async () => {
		const result: Options = await controller.getOptions();

		checkOptions(result);
	});
});
