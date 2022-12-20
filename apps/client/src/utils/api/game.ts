// External dependencies
import { AxiosResponse } from 'axios';
import { Game } from '_packages/shared/types/src';

// Internal dependencies
import api from '.';

async function getGameExists(gameId: string): Promise<boolean> {
	const response: AxiosResponse = await api.get(`/game?gameId=${gameId}`);

	if (response?.status === 200) {
		return response.data;
	} else {
		throw new Error('Game check failed');
	}
}

async function createGame(): Promise<Game> {
	const response: AxiosResponse = await api.post('/game');

	if (response?.status === 201) {
		return response.data;
	} else {
		throw new Error('Game creation failed');
	}
}

export { getGameExists, createGame };
