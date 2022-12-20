import { useEffect, useState } from 'react';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';
import style from './Timer.module.css';

interface TimerProps {
	startTime: number;
	endTime: number;
}

export default function Timer({ startTime, endTime }: TimerProps): JSX.Element {
	const [timer, setTimer]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
	const [startCountdown, setStartCountdown]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
		useState(false);

	useEffect(() => {
		const interval: NodeJS.Timer = setInterval(() => {
			// Should be between 0 and 100 with two decimals
			const progress: number = Math.round(((Date.now() - startTime) / (QUESTION_INTRO_DURATION * 1000)) * 100);

			setTimer(progress);

			if (progress >= 100 || Date.now() < startTime) {
				setStartCountdown(true);
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [startTime]);

	useEffect(() => {
		if (!startCountdown) return;

		// Count down from 100 to 0 in the time from now to endTime
		const interval: NodeJS.Timer = setInterval(() => {
			const progress: number = Math.round(((endTime - Date.now()) / (endTime - startTime)) * 100);

			setTimer(progress);

			if (progress <= 0) {
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [startCountdown, endTime]);

	return (
		<div className={style['timer']}>
			<div
				className={style['progress']}
				style={{ width: `${timer}%` }}
			/>
		</div>
	);
}
