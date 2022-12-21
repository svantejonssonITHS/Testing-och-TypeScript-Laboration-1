import { Game } from '_packages/shared/types/src';
import api from '.';
import { createGame, getGameExists } from './game';

jest.mock('.');

interface MockGameExistsResponse {
	status: number;
	data: boolean;
}

interface MockCreateGameResponse {
	status: number;
	data?: MockCreateGameData;
}

interface MockCreateGameData {
	id: string;
	players: [];
}

describe('API service', () => {
	let axiosGetSpy: jest.SpyInstance;
	let axiosPostSpy: jest.SpyInstance;

	beforeEach(() => {
		axiosGetSpy = jest.spyOn(api, 'get');
		axiosPostSpy = jest.spyOn(api, 'post');
	});

	afterEach(() => {
		axiosGetSpy.mockReset();
		axiosPostSpy.mockReset();
	});

	it('should send a GET request to the correct URL and return the correct data for getGameExists', async () => {
		const mockResponse: MockGameExistsResponse = {
			status: 200,
			data: true
		};
		axiosGetSpy.mockImplementation(() => Promise.resolve(mockResponse));

		const gameId: string = '123456';
		const result: boolean = await getGameExists(gameId);

		expect(api.get).toHaveBeenCalledWith(`/game?gameId=${gameId}`);
		expect(result).toEqual(true);
	});

	it('should throw an error if the GET request for getGameExists fails', async () => {
		const mockResponse: MockGameExistsResponse = {
			status: 404,
			data: true
		};
		axiosGetSpy.mockImplementation(() => Promise.resolve(mockResponse));

		await expect(getGameExists('123456')).rejects.toThrow('Game check failed');
	});

	it('should send a POST request to the correct URL and return the correct data for createGame', async () => {
		const mockData: MockCreateGameData = { id: '123456', players: [] };
		const mockResponse: MockCreateGameResponse = {
			status: 201,
			data: mockData
		};
		axiosPostSpy.mockImplementation(() => Promise.resolve(mockResponse));

		const result: Promise<Game> = (await createGame()) as unknown as Promise<Game>;

		expect(api.post).toHaveBeenCalledWith('/game');
		expect(result).toEqual(mockData);
	});

	it('should throw an error if the POST request for createGame fails', async () => {
		const mockResponse: MockCreateGameResponse = {
			status: 404
		};
		axiosPostSpy.mockImplementation(() => Promise.resolve(mockResponse));

		await expect(createGame()).rejects.toThrow('Game creation failed');
	});
});
