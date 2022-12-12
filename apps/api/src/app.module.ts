// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthModule } from './health/health.module';
import { OptionsModule } from './options/options.module';

@Module({
	imports: [HealthModule, OptionsModule]
})
export class AppModule {}
