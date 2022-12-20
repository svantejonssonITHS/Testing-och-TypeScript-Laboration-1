// External dependencies
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Lobby.module.css';
import Background from '$src/components/Background/Background';
import Form from './components/Form/Form';
import PlayerList from './components/PlayerList/PlayerList';
import Button from '$src/components/Button/Button';
import { ButtonVariant } from '$src/enums';
import Sharecard from './components/ShareCard/ShareCard';
import { getGameExists } from '$src/utils/api/game';
import { Event, Options } from '_packages/shared/types/src';
import { getOptions } from '$src/utils/api/options';
import { useSocket } from '$src/hooks/useSocket';

export default function Lobby(): JSX.Element {
	const { gameId } = useParams();
	const { user } = useAuth0();
	const { emit, on, game } = useSocket();
	const navigate: NavigateFunction = useNavigate();
	const [gameExists, setGameExists] = useState(false);
	const [options, setOptions] = useState({} as Options);
	const [isHost, setIsHost] = useState(false);

	useEffect(() => {
		(async (): Promise<void> => {
			if (!gameId) return navigate('/');
			const exists: boolean = await getGameExists(gameId);
			if (!exists) {
				toast.error(`Game with pin ${gameId} does not exist`);
				return navigate('/');
			}
			const gameOptions: Options = await getOptions();
			if (!gameOptions) {
				toast.error(`Could not get options for game with pin ${gameId}`);
				return navigate('/');
			}
			setGameExists(exists);
			setOptions(gameOptions);
		})();
	}, [gameId]);

	useEffect(() => {
		if (!gameExists) return;

		on(gameId as string);

		emit('event', {
			gameId: gameId,
			type: 'join'
		} as Event);
	}, [gameExists]);

	useEffect(() => {
		if (!game || !user) return;
		setIsHost(game.host.id === user.sub);
	}, [game, user]);

	return (
		<Background>
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
							onClick={(): void => {}}
							variant={ButtonVariant.OUTLINE}
						>
							Go back
						</Button>
						<Button
							onClick={(): void => {}}
							variant={ButtonVariant.FILL}
						>
							Start Game
						</Button>
					</div>
				</div>
				<Sharecard
					gamePin={gameId}
					show
				/>
			</div>
		</Background>
	);
}
