import Select from './Select/Select';
import Text from './Text/Text';
import Check from './Check/Check';
import Title from '../Title/Title';
import { useState } from 'react';
import { Item, Options } from '_packages/shared/types/src';
import style from './Form.module.css';

interface FormProps {
	options: Options | undefined;
}

export default function Form({ options }: FormProps): JSX.Element {
	const [regions]: [Item[] | undefined, React.Dispatch<React.SetStateAction<Item[] | undefined>>] = useState(
		options?.regions
	);
	const [region, setRegion]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] = useState();

	const [categories]: [Item[] | undefined, React.Dispatch<React.SetStateAction<Item[] | undefined>>] = useState(
		options?.categories
	);
	const [category, setCategory]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] =
		useState();
	const [tags]: [Item[] | undefined, React.Dispatch<React.SetStateAction<Item[] | undefined>>] = useState(
		options?.tags
	);
	const [tag, setTag]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] = useState();

	const [difficulties]: [Item[] | undefined, React.Dispatch<React.SetStateAction<Item[] | undefined>>] = useState(
		options?.difficulties
	);
	const [difficulty, setDifficulty]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] =
		useState();

	const [questionAmount, setQuestionAmount]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
	const [questionTime, setQuestionTime]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
	const [isPrivate, setIsPrivate]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);

	return (
		<form className={style['form']}>
			<Title>Game Settings</Title>
			<Select
				label='Region'
				options={regions ?? []}
				selectedItem={region}
				onChange={(value: Item | undefined): void => setRegion(value)}
			/>
			<Select
				label='Category'
				options={categories ?? []}
				selectedItem={category}
				onChange={(value: Item | undefined): void => setCategory(value)}
			/>
			<Select
				label='Tag'
				options={tags ?? []}
				selectedItem={tag}
				onChange={(value: Item | undefined): void => setTag(value)}
			/>
			<Select
				label='Difficulty'
				options={difficulties ?? []}
				selectedItem={difficulty}
				onChange={(value: Item | undefined): void => setDifficulty(value)}
			/>
			<Text
				label='Number of questions'
				value={questionAmount}
				onChange={(value: string): void => setQuestionAmount(value)}
			/>
			<Text
				label='Time per question'
				value={questionTime}
				onChange={(value: string): void => setQuestionTime(value)}
			/>
			<Check
				label='Allow other players to join'
				checked={isPrivate}
				onClick={(value: boolean): void => setIsPrivate(value)}
			/>
		</form>
	);
}
