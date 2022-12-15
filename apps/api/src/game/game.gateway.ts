import checkWsEvent from '$src/utils/checkWsEvent';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Event } from '_packages/shared/types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '$src/auth/auth.guard';
import { GameService } from './game.service';

@WebSocketGateway()
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	private readonly eventHandlers = {
		join: this.gameService.handleJoin,
		leave: this.gameService.handleLeave,
		changeOptions: this.gameService.handleChangeOptions
	};

	@UseGuards(new AuthGuard())
	@SubscribeMessage('event')
	async handleEvent(client: Socket, payload: Event): Promise<void> {
		try {
			if (!checkWsEvent(payload)) {
				throw new Error('Invalid payload');
			}

			await this.eventHandlers[payload.type](client, payload);
		} catch (error) {
			console.log(error);
		}
	}
}
