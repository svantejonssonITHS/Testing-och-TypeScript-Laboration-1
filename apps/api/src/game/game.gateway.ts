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
		leave: this.gameService.handleLeave
	};

	@UseGuards(new AuthGuard())
	@SubscribeMessage('event')
	async handleEvent(client: Socket, payload: string): Promise<void> {
		try {
			const event: Event = JSON.parse(payload);

			if (!checkWsEvent(event)) {
				throw new Error('Invalid event');
			}

			await this.eventHandlers[event.type](client, event.gameId, event.data);
		} catch (error) {
			console.log(error);
		}
	}
}
