import { useEffect, useState } from 'react';
import { GameStage } from '_packages/shared/enums/src';
import { Game, Question as QuestionObject } from '_packages/shared/types/src';
import style from './Question.module.css';
import Timer from './components/Timer/Timer';
import { QUESTION_INTRO_DURATION } from '_packages/shared/constants/src';
import { useSocket } from '$src/hooks/useSocket';

interface QuestionProps {
	game: Game | undefined;
}

export default function Question({ game }: QuestionProps): JSX.Element {
	const [activeQuestion, setActiveQuestion]: [
		QuestionObject | undefined,
		React.Dispatch<React.SetStateAction<QuestionObject | undefined>>
	] = useState(game?.activeQuestion);
	const [questionEndAt, setQuestionEndAt]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
	const [questionNumber, setQuestionNumber]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);
	const [showAnswers, setShowAnswers]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
	const { emit } = useSocket();

	useEffect(() => {
		if (!game) return;
		if (game.stage !== GameStage.QUESTION) return;

		setActiveQuestion(game.activeQuestion);
	}, [game]);

	useEffect(() => {
		if (!game || !activeQuestion) return;
		if (game.stage !== GameStage.QUESTION) return;

		const endTime: number =
			(activeQuestion.sentAt || Date.now()) + (QUESTION_INTRO_DURATION + game?.options?.questionTime) * 1000;

		setQuestionEndAt(endTime);
	}, [game, activeQuestion]);

	useEffect(() => {
		if (!game || !game.previousQuestions) return;

		setQuestionNumber(game.previousQuestions.length + 1);
	}, [game]);

	useEffect(() => {
		if (!game || !activeQuestion) return;
		if (game.stage !== GameStage.QUESTION) return;

		const timeout: NodeJS.Timeout = setInterval(() => {
			if (Date.now() > (activeQuestion?.sentAt || Date.now()) + QUESTION_INTRO_DURATION * 1000) {
				setShowAnswers(true);
				clearInterval(timeout);
			}
		}, 1000);

		return () => clearInterval(timeout);
	}, [game, activeQuestion]);

	return (
		<div className={style['question']}>
			<div className={style['container']}>
				<h1 className={style['question-title']}>
					<span>{questionNumber}.</span> {game?.activeQuestion?.question}
				</h1>
				<Timer
					startTime={Date.now()}
					endTime={questionEndAt}
				/>
				<div className={style['answer-container']}>
					{game?.activeQuestion?.answers.map((answer: string, index: number) => (
						<button
							key={index}
							className={style['answer']}
							disabled={!showAnswers}
							onClick={(): void => {
								emit('event', {
									gameId: game?.id,
									type: 'playerAnswer',
									data: { answer }
								});
							}}
						>
							{showAnswers ? answer : '???'}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
