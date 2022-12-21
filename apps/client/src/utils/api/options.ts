// External dependencies
import { AxiosResponse } from 'axios';

// Internal dependencies
import api from './';
import { Options } from '_packages/shared/types';

async function getOptions(): Promise<Options> {
	const response: AxiosResponse = await api.get('/options');

	if (response?.status === 200) {
		return response.data as Options;
	} else {
		throw new Error('Health check failed');
	}
}

export { getOptions };
