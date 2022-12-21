// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Player from './Player';
import { GameStage } from '_packages/shared/enums/src';
import { Player as PlayerObject } from '_packages/shared/types/src';

const player: PlayerObject = {
	id: '1234',
	name: 'John',
	email: 'john@doe.com',
	profilePicture: 'https://example.com/profile.jpg',
	score: 100
};

describe('Player component', () => {
	it('renders player name and profile picture', () => {
		const { getByAltText, getByText } = render(
			<Player
				player={player}
				gameStage={GameStage.LOBBY}
			/>
		);
		expect(getByAltText(`Profile picture of ${player.name}`)).toBeInTheDocument();
		expect(getByText(player.name)).toBeInTheDocument();
	});

	it('renders player status for GameStage LOBBY', () => {
		const { getByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LOBBY}
				status='ready'
			/>
		);
		expect(getByTestId('status')).toHaveClass('ready');
	});

	it('renders player position for GameStage LEADERBOARD', () => {
		const { getByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LEADERBOARD}
				position={1}
			/>
		);
		expect(getByTestId('position')).toHaveTextContent('1.');
	});

	it('renders player score for GameStage LEADERBOARD', () => {
		const { getByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LEADERBOARD}
				position={1}
			/>
		);
		expect(getByTestId('score')).toHaveTextContent((player.score as number).toString());
	});

	it('does not render status for GameStage LEADERBOARD', () => {
		const { queryByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LEADERBOARD}
				position={1}
			/>
		);
		expect(queryByTestId('status')).not.toBeInTheDocument();
	});

	it('does not render position for GameStage LOBBY', () => {
		const { queryByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LOBBY}
			/>
		);
		expect(queryByTestId('position')).not.toBeInTheDocument();
	});

	it('does not render score for GameStage LOBBY', () => {
		const { queryByTestId } = render(
			<Player
				player={player}
				gameStage={GameStage.LOBBY}
			/>
		);
		expect(queryByTestId('score')).not.toBeInTheDocument();
	});
});
