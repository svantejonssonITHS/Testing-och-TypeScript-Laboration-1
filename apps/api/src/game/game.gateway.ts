import checkWsEvent from '$src/utils/checkWsEvent';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Event, Game } from '_packages/shared/types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '$src/auth/auth.guard';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	private readonly eventHandlers = {
		join: this.gameService.handleJoin,
		leave: this.gameService.handleLeave,
		changePlayerStatus: this.gameService.handleChangePlayerStatus,
		changeOptions: this.gameService.handleChangeOptions,
		startRound: this.gameService.handleStartRound,
		playerAnswer: this.gameService.handlePlayerAnswer
	};

	@UseGuards(new AuthGuard())
	@SubscribeMessage('event')
	async handleEvent(client: Socket, payload: Event): Promise<Game | void> {
		try {
			if (!checkWsEvent(payload)) {
				throw new Error('Invalid payload');
			}

			return await this.eventHandlers[payload.type](client, payload);
		} catch (error) {
			console.log(error);
		}
	}
}
