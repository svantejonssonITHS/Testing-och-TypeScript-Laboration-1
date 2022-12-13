// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { HealthModule } from './health/health.module';
import { OptionsModule } from './options/options.module';
import { GameModule } from './game/game.module';

@Module({
	imports: [HealthModule, OptionsModule, GameModule]
})
export class AppModule {}
