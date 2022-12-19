// External dependencies
import { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Landing.module.css';
import Background from '$src/components/Background/Background';
import HeroText from './components/HeroText/HeroText';
import GamePinInput from '$src/routes/Landing/components/GamePinInput/GamePinInput';
import { getHealth } from '$src/utils/api/health';
import { Game, HealthResult } from '_packages/shared/types/src';
import { getGameExists, createGame } from '$src/utils/api/game';

export default function Landing(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const [gamePin, setGamePin] = useState('');
	const [gamePinSubmitted, setGamePinSubmitted] = useState(false);
	const [apiHealthy, setApiHealthy] = useState(false);
	const [apiCheckComplete, setApiCheckComplete] = useState(false);

	useEffect(() => {
		(async (): Promise<void> => {
			try {
				const response: HealthResult = await getHealth();
				if (response.triviaApi.status === 'OK') {
					setApiHealthy(true);
				} else {
					toast.error('Trivia API is down!');
				}
				setApiCheckComplete(true);
			} catch (error) {
				toast.error('Trivia API is down!');
				setApiCheckComplete(true);
			}
		})();
	}, []);

	useEffect(() => {
		(async (): Promise<void> => {
			if (!gamePinSubmitted || !gamePin) return;

			console.log(gamePin);

			const gameExists: boolean = await getGameExists(gamePin);

			if (gameExists) {
				navigate(`/game/${gamePin}`);
			} else {
				toast.error(`Game with pin ${gamePin} does not exist`);
			}

			setGamePinSubmitted(false);
		})();
	}, [gamePinSubmitted]);

	return (
		<Background>
			<div className={style['layout']}>
				<div className={style['container']}>
					<HeroText text='Domanda!' />
					<div>
						<GamePinInput
							value={gamePin}
							setValue={setGamePin}
							onSubmit={(): void => setGamePinSubmitted(true)}
							disabled={!apiHealthy && apiCheckComplete}
						/>
						<p className={style['alternative']}>
							or{' '}
							<button
								type='button'
								onClick={async (): Promise<void> => {
									if (!apiHealthy && apiCheckComplete) return;

									try {
										const game: Game = await createGame();

										navigate(`/game/${game.id}`);
									} catch (error) {
										toast.error('Something went wrong');
									}
								}}
								className={[
									!apiHealthy && apiCheckComplete ? style['link-disabled'] : '',
									style['link']
								].join(' ')}
							>
								create your own game
							</button>
						</p>
					</div>
				</div>
			</div>
		</Background>
	);
}
