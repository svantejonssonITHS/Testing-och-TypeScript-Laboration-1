// External dependencies
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Internal dependencies
import Select from './Select/Select';
import Number from './Number/Number';
import Check from './Check/Check';
import Title from '../Title/Title';
import { GameOptions, Options } from '_packages/shared/types/src';
import style from './Form.module.css';
import { useSocket } from '$src/hooks/useSocket';
interface FormProps {
	options: Options | undefined;
	gameValues: GameOptions | undefined;
	isHost: boolean;
}
export default function Form({ options, gameValues, isHost }: FormProps): JSX.Element {
	const { gameId } = useParams();
	const { emit } = useSocket();
	const [values, setValues] = useState(gameValues);

	useEffect(() => {
		setValues(gameValues);
	}, [gameValues]);

	useEffect(() => {
		if (!values || !isHost) return;

		// Check if the options have changed
		let hasChanged: boolean = false;

		if (values.region !== gameValues?.region) hasChanged = true;
		if (values.category !== gameValues?.category) hasChanged = true;
		if (values.tag !== gameValues?.tag) hasChanged = true;
		if (values.difficulty !== gameValues?.difficulty) hasChanged = true;
		if (values.questionCount !== gameValues?.questionCount) hasChanged = true;
		if (values.questionTime !== gameValues?.questionTime) hasChanged = true;
		if (values.isPrivate !== gameValues?.isPrivate) hasChanged = true;

		if (!hasChanged) return;

		const optionDebounce: NodeJS.Timeout = setTimeout(() => {
			emit('event', {
				gameId: gameId as string,
				type: 'changeOptions',
				data: {
					options: values
				}
			});
		}, 1000);

		return (): void => {
			clearTimeout(optionDebounce);
		};
	}, [values]);

	return (
		<form className={style['form']}>
			<Title>Game Settings</Title>
			<Select
				label='Region'
				options={options?.regions ?? []}
				selectedValue={values?.region}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values && values.region !== value) setValues({ ...values, region: value ?? '' });
				}}
			/>
			<Select
				label='Category'
				options={options?.categories ?? []}
				selectedValue={values?.category}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values && values.category !== value) setValues({ ...values, category: value ?? '' });
				}}
			/>
			<Select
				label='Tag'
				options={options?.tags ?? []}
				selectedValue={values?.tag}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values && values.tag !== value) setValues({ ...values, tag: value ?? '' });
				}}
			/>
			<Select
				label='Difficulty'
				options={options?.difficulties ?? []}
				selectedValue={values?.difficulty}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values && values.difficulty !== value) setValues({ ...values, difficulty: value ?? '' });
				}}
			/>
			<Number
				label='Number of questions'
				value={values?.questionCount}
				min={1}
				max={15}
				disabled={!isHost}
				onChange={(value: number | undefined): void => {
					if (values && values.questionCount !== value) setValues({ ...values, questionCount: value ?? 0 });
				}}
			/>
			<Number
				label='Time per question'
				value={values?.questionTime}
				min={10}
				max={60}
				disabled={!isHost}
				onChange={(value: number | undefined): void => {
					if (values && values.questionTime !== value) setValues({ ...values, questionTime: value ?? 0 });
				}}
			/>
			<Check
				label='Allow other players to join'
				checked={!values?.isPrivate ?? true}
				disabled={!isHost}
				onClick={(value: boolean): void => {
					if (values && values.isPrivate === value) setValues({ ...values, isPrivate: !value });
				}}
			/>
		</form>
	);
}
