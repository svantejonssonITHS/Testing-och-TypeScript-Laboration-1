import { Event } from '_packages/shared/types';

export default function checkWsEvent(event: Event): boolean {
	if (!event || typeof event !== 'object' || (event && Array.isArray(event))) return false;

	const { gameId, type, data } = event;

	if (!gameId || typeof gameId !== 'string') {
		return false;
	}

	if (!type || typeof type !== 'string') {
		return false;
	}

	if (
		(data && typeof data !== 'object') ||
		(data && typeof data === 'object' && Array.isArray(data)) ||
		!isNaN(data ?? 'data is null')
	) {
		return false;
	}

	return true;
}
