// External dependencies
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Internal dependencies
import style from './Landing.module.css';
import Background from '$src/components/Background/Background';
import HeroText from './components/HeroText/HeroText';
import GamePinInput from '$src/routes/Landing/components/GamePinInput/GamePinInput';
import getHealth from '$src/utils/api/health';
import { HealthResult } from '_packages/shared/types/src';
import Toast from './components/Toast/Toast';

export default function Landing(): JSX.Element {
	const [gamePin, setGamePin] = useState('');
	const [triviaApiHealthy, setTriviaApiHealthy] = useState(false);
	const [triviaApiCheckComplete, setTriviaApiCheckComplete] = useState(false);

	useEffect(() => {
		(async (): Promise<void> => {
			try {
				const response: HealthResult = await getHealth();
				setTriviaApiHealthy(response.triviaApi.status === 'OK' ? true : false);
				setTriviaApiCheckComplete(true);
			} catch (error) {
				setTriviaApiHealthy(false);
				setTriviaApiCheckComplete(true);
			}
		})();
	}, []);

	return (
		<Background>
			<>
				<div className={style['layout']}>
					<HeroText text='Domanda!' />
					<div>
						<GamePinInput
							value={gamePin}
							setValue={setGamePin}
							onSubmit={(): void => console.log('submit')}
							disabled={!triviaApiHealthy && triviaApiCheckComplete}
						/>
						<p className={style['alternative']}>
							or{' '}
							<Link
								to='/question/1'
								className={!triviaApiHealthy && triviaApiCheckComplete ? style['link-disabled'] : ''}
							>
								create your own game
							</Link>
						</p>
					</div>
				</div>
				{/* Display error message if the Trivia API is down */}
				{triviaApiCheckComplete && !triviaApiHealthy && (
					<Toast
						title='Trivia API is down'
						message='The Trivia API is not working at the moment. Please try again later!'
					/>
				)}
			</>
		</Background>
	);
}
