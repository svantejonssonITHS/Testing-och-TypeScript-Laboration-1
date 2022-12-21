// External dependencies
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// Internal dependencies
import { HealthModule } from './health/health.module';
import { OptionsModule } from './options/options.module';
import { GameModule } from './game/game.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
	imports: [HealthModule, OptionsModule, GameModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule {}
