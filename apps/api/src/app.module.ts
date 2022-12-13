// External dependencies
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Internal dependencies
import { HealthModule } from './health/health.module';
import { OptionsModule } from './options/options.module';

@Module({
	imports: [ConfigModule.forRoot(), HealthModule, OptionsModule]
})
export class AppModule {}
