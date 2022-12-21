// External dependencies
import { AxiosResponse } from 'axios';

// Internal dependencies
import api from './';
import { HealthResult } from '_packages/shared/types';

async function getHealth(): Promise<HealthResult> {
	const response: AxiosResponse = await api.get('/health');

	if (response?.status === 200) {
		return response.data as HealthResult;
	} else {
		throw new Error('Health check failed');
	}
}

export { getHealth };
