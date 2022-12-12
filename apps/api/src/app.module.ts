// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthModule } from './health/health.module';

@Module({
	imports: [HealthModule]
})
export class AppModule {}
