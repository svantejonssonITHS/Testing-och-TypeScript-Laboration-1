// External dependencies
import { Jwt, decode } from 'jsonwebtoken';

// Internal dependencies
import type { Player } from '_packages/shared/types/src';

export default async function getAuth0User(authorization: string): Promise<Player> {
	try {
		const decoded: Jwt = decode(authorization.split(' ')[1], { complete: true });

		if (!decoded) throw new Error();

		const player: Player = {
			id: decoded.payload['sub'] as string,
			name: decoded.payload['name'],
			email: decoded.payload['email'],
			profilePicture: decoded.payload['picture'],
			score: 0,
			streak: 0
		};

		return player;
	} catch (error) {
		throw new Error('Unauthorized');
	}
}
