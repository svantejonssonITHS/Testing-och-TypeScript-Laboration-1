// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';

@Module({
	controllers: [OptionsController],
	providers: [OptionsService]
})
export class OptionsModule {}
