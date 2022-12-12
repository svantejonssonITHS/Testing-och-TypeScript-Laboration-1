// External dependencies
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

// Internal dependencies
import type { HealthResult } from '$src/types';
import { TRIVIA_API_URL } from '$src/utils/constants';
import axios from '$src/utils/axios';

@Injectable()
export class HealthService {
	async checkHealth(): Promise<HealthResult> {
		const triviaApi: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/questions?limit=0`);

		return {
			status: 'OK',
			message: 'The API is up and running',
			uptime: process.uptime(),
			timestamp: Date.now(),
			triviaApi: {
				status: triviaApi.status === 200 ? 'OK' : 'ERROR',
				message: triviaApi.status === 200 ? 'The Trivia API is up and running' : 'The Trivia API is down'
			}
		};
	}
}
