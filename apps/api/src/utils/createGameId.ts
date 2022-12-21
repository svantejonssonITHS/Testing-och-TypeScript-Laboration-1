export default function createGameId(gameIds?: string[]): string {
	let gameId: string = '';

	for (let i: number = 0; i < 3; i++) {
		gameId += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	for (let i: number = 0; i < 3; i++) {
		gameId += Math.floor(Math.random() * 10);
	}

	const gameIdsIsValid: boolean = gameIds && Array.isArray(gameIds);

	if (gameIdsIsValid && gameIds.includes(gameId)) {
		return createGameId(gameIds);
	}

	return gameId;
}
