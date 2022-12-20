import { useEffect, useState } from 'react';
import { GameStage } from '_packages/shared/enums/src';
import { Game, Question as QuestionObject } from '_packages/shared/types/src';
import style from './Question.module.css';
import Timer from './components/Timer/Timer';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';
import { useSocket } from '$src/hooks/useSocket';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface QuestionProps {
	game: Game | undefined;
}

export default function Question({ game }: QuestionProps): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const [activeQuestion, setActiveQuestion]: [
		QuestionObject | undefined,
		React.Dispatch<React.SetStateAction<QuestionObject | undefined>>
	] = useState(game?.activeQuestion);
	const [questionNumber, setQuestionNumber]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
	const [hideAnswers, setHideAnswers]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(true);
	const [correctAnswer, setCorrectAnswer]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
	const [showCorrectAnswer, setShowCorrectAnswer]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
		useState(false);
	const [playerAnswer, setPlayerAnswer]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
	const { emit } = useSocket();

	// Set active question
	useEffect(() => {
		if (!game) return;
		setActiveQuestion(game.activeQuestion);
	}, [game]);

	// Set question number
	useEffect(() => {
		if (!game || !game.previousQuestions) return;
		setQuestionNumber(game.previousQuestions.length + 1);
	}, [game]);

	// Show correct answer when question and move to leaderboard when time is up
	useEffect(() => {
		if (!game || game.stage !== GameStage.LEADERBOARD || !activeQuestion?.correctAnswer) return;

		setCorrectAnswer(activeQuestion?.correctAnswer);
		setShowCorrectAnswer(true);

		const interval: NodeJS.Timeout = setTimeout(() => {
			navigate('../leaderboard');
		}, 5000);

		return () => clearTimeout(interval);
	}, [activeQuestion]);

	return (
		<div className={style['question']}>
			<div className={style['container']}>
				<h1 className={style['question-title']}>
					<span>{questionNumber}.</span> {game?.activeQuestion?.question}
				</h1>
				<Timer
					countUp={QUESTION_INTRO_DURATION}
					countDown={game?.options?.questionTime || 0}
					onCountUpEnd={(): void => setHideAnswers(false)}
				/>
				<div className={style['answer-container']}>
					{game?.activeQuestion?.answers.map((answer: string, index: number) => (
						<button
							key={index}
							className={[
								style['answer'],
								style[!hideAnswers ? 'available' : ''],
								style[
									playerAnswer.length ? (playerAnswer === answer ? 'selected' : 'not-selected') : ''
								],
								style[showCorrectAnswer ? (answer === correctAnswer ? 'correct' : 'incorrect') : '']
							].join(' ')}
							disabled={hideAnswers || !!playerAnswer || showCorrectAnswer}
							onClick={(): void => {
								emit('event', {
									gameId: game?.id,
									type: 'playerAnswer',
									data: { answer }
								});
								setPlayerAnswer(answer);
							}}
						>
							{hideAnswers ? '???' : answer}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
