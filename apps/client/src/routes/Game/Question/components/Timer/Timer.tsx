import { useEffect, useState } from 'react';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';
import style from './Timer.module.css';

interface TimerProps {
	countUp: number;
	countDown: number;
	onCountUpEnd: () => void;
}

export default function Timer({ countUp, countDown, onCountUpEnd }: TimerProps): JSX.Element {
	const [timer, setTimer]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
	const [startCountdown, setStartCountdown]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
		useState(false);
	const [timerFinished, setTimerFinished]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);

	useEffect(() => {
		if (timerFinished) return;
		const endTime: number = Date.now() + countUp * 1000;

		const interval: NodeJS.Timer = setInterval(() => {
			const progress: number = 100 - Math.round(((endTime - Date.now()) / (countUp * 1000)) * 100);

			setTimer(progress);

			if (progress >= 100) {
				clearInterval(interval);
				setStartCountdown(true);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [countUp]);

	useEffect(() => {
		if (!startCountdown || timerFinished) return;

		const endTime: number = Date.now() + countDown * 1000;

		const interval: NodeJS.Timer = setInterval(() => {
			const progress: number = Math.round(((endTime - Date.now()) / (countDown * 1000)) * 100);

			setTimer(progress);

			if (progress <= 0) {
				clearInterval(interval);
				setTimerFinished(true);
			}
		}, 100);

		return () => clearInterval(interval);
	}, [startCountdown, countDown]);

	useEffect(() => {
		if (startCountdown) onCountUpEnd();
	}, [startCountdown]);

	return (
		<div className={style['timer']}>
			<div
				className={style['progress']}
				style={{ width: `${timer}%` }}
			/>
		</div>
	);
}
