// External dependencies
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Internal dependencies
import Select from './Select/Select';
import Number from './Text/Number';
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
					if (values) setValues({ ...values, region: value ?? '' });
				}}
			/>
			<Select
				label='Category'
				options={options?.categories ?? []}
				selectedValue={values?.category}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values) setValues({ ...values, category: value ?? '' });
				}}
			/>
			<Select
				label='Tag'
				options={options?.tags ?? []}
				selectedValue={values?.tag}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values) setValues({ ...values, tag: value ?? '' });
				}}
			/>
			<Select
				label='Difficulty'
				options={options?.difficulties ?? []}
				selectedValue={values?.difficulty}
				disabled={!isHost}
				onChange={(value: string | undefined): void => {
					if (values) setValues({ ...values, difficulty: value ?? '' });
				}}
			/>
			<Number
				label='Number of questions'
				value={values?.questionCount}
				min={1}
				max={15}
				disabled={!isHost}
				onChange={(value: number | undefined): void => {
					if (values) setValues({ ...values, questionCount: value ?? 0 });
				}}
			/>
			<Number
				label='Time per question'
				value={values?.questionTime}
				min={10}
				max={60}
				disabled={!isHost}
				onChange={(value: number | undefined): void => {
					if (values) setValues({ ...values, questionTime: value ?? 0 });
				}}
			/>
			<Check
				label='Allow other players to join'
				checked={!values?.isPrivate ?? true}
				disabled={!isHost}
				onClick={(value: boolean): void => {
					if (values) setValues({ ...values, isPrivate: !value });
				}}
			/>
		</form>
	);
}
