// External dependencies
import { Test, TestingModule } from '@nestjs/testing';

// Internal dependencies
import { Options } from '_packages/shared-types';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

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

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Object);

		expect(result).toHaveProperty('categories');
		expect(result.categories).toBeInstanceOf(Array);
		expect(result.categories.length).toBeGreaterThan(0);
		expect(result.categories[0]).toBeInstanceOf(Object);
		expect(result.categories[0]).toHaveProperty('label');
		expect(result.categories[0]).toHaveProperty('value');

		expect(result).toHaveProperty('tags');
		expect(result.tags).toBeInstanceOf(Array);
		expect(result.tags.length).toBeGreaterThan(0);
		expect(result.tags[0]).toBeInstanceOf(Object);
		expect(result.tags[0]).toHaveProperty('label');
		expect(result.tags[0]).toHaveProperty('value');

		expect(result).toHaveProperty('regions');
		expect(result.regions).toBeInstanceOf(Array);
		expect(result.regions.length).toBeGreaterThan(0);
		expect(result.regions[0]).toBeInstanceOf(Object);
		expect(result.regions[0]).toHaveProperty('label');
		expect(result.regions[0]).toHaveProperty('value');

		expect(result).toHaveProperty('difficulties');
		expect(result.difficulties).toBeInstanceOf(Array);
		expect(result.difficulties.length).toBeGreaterThan(0);
		expect(result.difficulties[0]).toBeInstanceOf(Object);
		expect(result.difficulties[0]).toHaveProperty('label');
		expect(result.difficulties[0]).toHaveProperty('value');
	});
});
