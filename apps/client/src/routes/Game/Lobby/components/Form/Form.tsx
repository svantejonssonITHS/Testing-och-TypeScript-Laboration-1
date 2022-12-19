import Select from './Select/Select';
import Number from './Text/Number';
import Check from './Check/Check';
import Title from '../Title/Title';
import { useEffect, useState } from 'react';
import { GameOptions, Item, Options } from '_packages/shared/types/src';
import style from './Form.module.css';
interface FormProps {
	options: Options | undefined;
	values: GameOptions | undefined;
}
export default function Form({ options, values }: FormProps): JSX.Element {
	const [test, setTest] = useState(0);

	useEffect(() => {
		console.log(test);
	}, [test]);

	return (
		<form className={style['form']}>
			<Title>Game Settings</Title>
			<Select
				label='Region'
				options={options?.regions ?? []}
				selectedValue={values?.region}
				onChange={(value: string | undefined): void => {
					if (values) values.region = value ?? '';
				}}
			/>
			<Select
				label='Category'
				options={options?.categories ?? []}
				selectedValue={values?.category}
				onChange={(value: string | undefined): void => {
					if (values) values.category = value ?? '';
				}}
			/>
			<Select
				label='Tag'
				options={options?.tags ?? []}
				selectedValue={values?.tag}
				onChange={(value: string | undefined): void => {
					if (values) values.tag = value ?? '';
				}}
			/>
			<Select
				label='Difficulty'
				options={options?.difficulties ?? []}
				selectedValue={values?.difficulty}
				onChange={(value: string | undefined): void => {
					if (values) values.difficulty = value ?? '';
				}}
			/>
			<Number
				label='Number of questions'
				value={values?.questionCount}
				onChange={(value: number | undefined): void => {
					if (values) values.questionCount = value ?? 0;
				}}
			/>
			<Number
				label='Time per question'
				value={values?.questionTime}
				onChange={(value: number | undefined): void => {
					if (values) values.questionTime = value ?? 0;
				}}
			/>
			<Check
				label='Allow other players to join'
				checked={values?.isPrivate ?? true}
				onClick={(value: boolean): void => {
					if (values) values.isPrivate = value;
				}}
			/>
		</form>
	);
}
