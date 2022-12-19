import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import style from './Lobby.module.css';
import Background from '$src/components/Background/Background';
import Form from './components/Form/Form';
import PlayerList from './components/PlayerList/PlayerList';
import Button from '$src/components/Button/Button';
import { ButtonVariant } from '$src/enums';
import Sharecard from './components/ShareCard/ShareCard';
import { useEffect, useState } from 'react';
import { getGameExists } from '$src/utils/api/game';
import { toast } from 'react-toastify';
import { Options } from '_packages/shared/types/src';
import { getOptions } from '$src/utils/api/options';

export default function Lobby(): JSX.Element {
	const { gameId } = useParams();
	const navigate: NavigateFunction = useNavigate();
	const [gameExists, setGameExists] = useState(false);
	const [options, setOptions] = useState({} as Options);

	useEffect(() => {
		(async (): Promise<void> => {
			if (!gameId) return navigate('/');

			console.log('gameId', gameId);

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

	return (
		<Background>
			<div className={style['lobby']}>
				<div className={style['contianer']}>
					<div className={style['column']}>
						<Form options={options} />
					</div>
					<div className={style['column']}>
						<PlayerList />
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
