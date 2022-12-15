import { Event } from '_packages/shared/types';

export default function checkWsEvent(event: Event): boolean {
	const { gameId, type, data } = event;

	if (!gameId || typeof gameId !== 'string') {
		return false;
	}

	if (!type || typeof type !== 'string') {
		return false;
	}

	if (data && typeof data !== 'object') {
		return false;
	}

	return true;
}
