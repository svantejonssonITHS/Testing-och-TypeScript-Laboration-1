// External dependencies
import { Controller, Get } from '@nestjs/common';

// Internal dependencies
import { HealthService } from './health.service';
import type { HealthResult } from '_packages/shared/types';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	checkHealth(): Promise<HealthResult> {
		return this.healthService.checkHealth();
	}
}
