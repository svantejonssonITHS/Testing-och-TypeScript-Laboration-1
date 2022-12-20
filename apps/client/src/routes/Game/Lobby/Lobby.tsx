// External dependencies
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Lobby.module.css';
import Form from './components/Form/Form';
import PlayerList from './components/PlayerList/PlayerList';
import Button from '$src/components/Button/Button';
import { ButtonVariant } from '$src/enums';
import Sharecard from './components/ShareCard/ShareCard';
import { Event, Game, Options, Player } from '_packages/shared/types/src';
import { getOptions } from '$src/utils/api/options';
import { useSocket } from '$src/hooks/useSocket';

interface LobbyProps {
	game: Game | undefined;
}

export default function Lobby({ game }: LobbyProps): JSX.Element {
	const { gameId } = useParams();
	const { user } = useAuth0();
	const { emit } = useSocket();
	const navigate: NavigateFunction = useNavigate();
	const [options, setOptions] = useState({} as Options);
	const [isHost, setIsHost] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [isGameReady, setIsGameReady] = useState(false);

	useEffect(() => {
		(async (): Promise<void> => {
			const gameOptions: Options = await getOptions();
			if (!gameOptions) {
				toast.error(`Could not get options for game with pin ${gameId}`);
				return navigate('/');
			}
			setOptions(gameOptions);
		})();
	}, [gameId]);

	useEffect(() => {
		emit('event', {
			gameId: gameId,
			type: 'join'
		} as Event);
	}, [gameId]);

	useEffect(() => {
		if (!game || !user) return;
		setIsHost(game.host.id === user.sub);

		// Check if the numberOfQuestions is the same as questionCount
		const questionsReady: boolean = game.numberOfQuestions === game.options.questionCount;

		// Check if all players are ready
		const playersReady: boolean = game.players.every((player: Player) => player.isReady);

		if (questionsReady && playersReady) {
			setIsGameReady(true);
		} else {
			setIsGameReady(false);
		}
	}, [game, user]);

	return (
		<div className={style['lobby']}>
			<div className={style['contianer']}>
				<div className={style['column']}>
					<Form
						options={options}
						gameValues={game?.options}
						isHost={isHost}
					/>
				</div>
				<div className={style['column']}>
					<PlayerList game={game} />
				</div>
				<div className={style['row']}>
					<Button
						onClick={(): void => navigate('/')}
						variant={ButtonVariant.OUTLINE}
					>
						Go back
					</Button>
					<Button
						onClick={(): void => {
							if (isHost) {
								emit('event', {
									gameId: gameId,
									type: 'startRound'
								} as Event);
								navigate(`./question`);
							} else {
								console.log('ready');

								setIsReady(!isReady);
								emit('event', {
									gameId: gameId,
									type: 'changePlayerStatus',
									data: {
										isReady: !isReady
									}
								} as Event);
							}
						}}
						variant={ButtonVariant.FILL}
						disabled={isHost && !isGameReady}
					>
						{isHost ? 'Start game' : isReady ? 'Unready' : 'Ready'}
					</Button>
				</div>
			</div>
			<Sharecard
				gamePin={gameId}
				show
			/>
		</div>
	);
}
