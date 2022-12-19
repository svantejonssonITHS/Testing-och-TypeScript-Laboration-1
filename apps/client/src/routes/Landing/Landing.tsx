// External dependencies
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Internal dependencies
import style from './Landing.module.css';
import Background from '$src/components/Background/Background';
import HeroText from './components/HeroText/HeroText';
import GamePinInput from '$src/routes/Landing/components/GamePinInput/GamePinInput';
import getHealth from '$src/utils/api/health';
import { HealthResult } from '_packages/shared/types/src';

export default function Landing(): JSX.Element {
	const [gamePin, setGamePin] = useState('');
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

	return (
		<Background>
			<div className={style['layout']}>
				<HeroText text='Domanda!' />
				<div>
					<GamePinInput
						value={gamePin}
						setValue={setGamePin}
						onSubmit={(): void => console.log('submit')}
						disabled={!apiHealthy && apiCheckComplete}
					/>
					<p className={style['alternative']}>
						or{' '}
						<Link
							to='/question/1'
							className={!apiHealthy && apiCheckComplete ? style['link-disabled'] : ''}
						>
							create your own game
						</Link>
					</p>
				</div>
			</div>
		</Background>
	);
}
