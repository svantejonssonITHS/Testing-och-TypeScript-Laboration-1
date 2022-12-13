// External dependencies
import { AxiosResponse } from 'axios';

// Internal dependencies
import axios from '$src/utils/axios';
import { AUTH0_DOMAIN } from './env';
import type { Player } from '_packages/shared-types/src';

export default async function getAuth0User(authorization: string): Promise<Player> {
	const response: AxiosResponse = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
		headers: { authorization }
	});

	const player: Player = {
		id: response.data.sub,
		name: response.data.name,
		email: response.data.email,
		profilePicture: response.data.picture
	};

	return player;
}
