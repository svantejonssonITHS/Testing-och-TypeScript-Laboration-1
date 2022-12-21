import { Game } from '_packages/shared/types/src';
import style from './Leaderboard.module.css';
import Player from '$src/components/Player/Player';
import { Player as PlayerObject } from '_packages/shared/types/src';
import { useEffect, useState } from 'react';
import { GameStage } from '_packages/shared/enums/src';
import Button from '$src/components/Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '$src/hooks/useSocket';

interface LeaderboardProps {
	game: Game | undefined;
}

export default function Leaderboard({ game }: LeaderboardProps): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const { user } = useAuth0();
	const { emit } = useSocket();
	const { gameId } = useParams();
	const [finalLeaderboard, setFinalLeaderboard] = useState(false);
	const [players, setPlayers] = useState([] as PlayerObject[]);
	const [isHost, setIsHost] = useState(false);

	useEffect(() => {
		if (!game) return;
		if (game.stage !== GameStage.LEADERBOARD) return;

		// If previousQuestions + 1 === numberOfQuestions, then we're on the final leaderboard
		if (game.previousQuestions.length + 1 === game.numberOfQuestions) {
			setFinalLeaderboard(true);
		}
	}, [game]);

	useEffect(() => {
		if (!game) return;
		if (game.stage !== GameStage.LEADERBOARD) return;

		// Sort players by score
		const sortedPlayers: PlayerObject[] = game.players.sort(
			(a: PlayerObject, b: PlayerObject) => (b?.score || 0) - (a?.score || 0)
		);
		setPlayers(sortedPlayers);
	}, [game]);

	useEffect(() => {
		if (!game) return;
		if (game.stage !== GameStage.LEADERBOARD) return;

		// Check if the current player is the host
		if (game.host.id === user?.sub) {
			setIsHost(true);
		}
	}, [game, user]);

	useEffect(() => {
		if (!game) return;
		if (game.stage !== GameStage.QUESTION) return;

		navigate('../question');
	}, [game]);

	return (
		<div className={style['leaderboard']}>
			<div className={style['container']}>
				<h1 className={style['leaderboard-title']}>
					{finalLeaderboard && players[0] !== undefined ? `${players[0].name} won!` : 'Leaderboard'}
				</h1>
				<ul className={style['list']}>
					{game &&
						players.map((player: PlayerObject, index: number) => (
							<li key={player.id}>
								<Player
									player={player}
									gameStage={game.stage}
									position={index + 1}
								/>
							</li>
						))}
				</ul>
				<Button
					disabled={!finalLeaderboard && !isHost}
					onClick={(): void => {
						if (finalLeaderboard) {
							navigate('/');
						} else {
							emit('event', {
								gameId: gameId as string,
								type: 'startRound'
							});
						}
					}}
				>
					{finalLeaderboard ? (isHost ? 'End game' : 'Leave game') : 'Next round'}
				</Button>
			</div>
		</div>
	);
}
