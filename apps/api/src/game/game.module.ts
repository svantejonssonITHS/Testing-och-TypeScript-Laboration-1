// External dependencies
import { Module } from '@nestjs/common';

// Internal dependencies
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
	controllers: [GameController],
	providers: [GameService]
})
export class GameModule {}
