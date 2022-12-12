// External dependencies
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

// Internal dependencies
import axios from '$src/utils/axios';
import { TRIVIA_API_URL } from '$src/utils/constants';
import { Options, Category, Tag, Region, Difficulty } from '_packages/shared-types';

@Injectable()
export class OptionsService {
	async getOptions(): Promise<Options> {
		const triviaCategories: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/categories`);

		const categories: Category[] = [];

		if (triviaCategories.data) {
			for (const category in triviaCategories.data) {
				categories.push({
					label: category,
					value: triviaCategories.data[category][0]
				});
			}
		}

		const triviaTags: AxiosResponse = await axios.get(`${TRIVIA_API_URL}/tags`);

		const tags: Tag[] = [];

		if (triviaTags.data) {
			triviaTags.data.forEach((tag: string) => {
				tags.push({
					label: tag
						// Replace underscores with spaces
						.replace(/_/g, ' ')
						// Capitalize first letter of each word
						.replace(
							/\w\S*/g,
							(txt: string) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
						),
					value: tag
				});
			});
		}

		const regions: Region[] = [
			{
				label: 'Sweden',
				value: 'SE'
			},
			{
				label: 'United States',
				value: 'US'
			}
		];

		const difficulties: Difficulty[] = [
			{
				label: 'Easy',
				value: 'easy'
			},
			{
				label: 'Medium',
				value: 'medium'
			},
			{
				label: 'Hard',
				value: 'hard'
			}
		];

		return {
			categories,
			tags,
			regions,
			difficulties
		};
	}
}
