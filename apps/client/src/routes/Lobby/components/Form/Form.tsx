import Select from './Select/Select';
import Text from './Text/Text';
import Check from './Check/Check';
import Title from '../Title/Title';
import { useState } from 'react';
import { Item } from '_packages/shared/types/src';
import style from './Form.module.css';

export default function Form(): JSX.Element {
	const [region, setRegion]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] = useState();
	const [category, setCategory]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] =
		useState();
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
				options={[
					{ value: '1', label: 'One' },
					{ value: '2', label: 'Two' },
					{ value: '3', label: 'Three' }
				]}
				selectedItem={region}
				onChange={(value: Item | undefined): void => setRegion(value)}
			/>
			<Select
				label='Category'
				options={[
					{ value: '1', label: 'One' },
					{ value: '2', label: 'Two' },
					{ value: '3', label: 'Three' }
				]}
				selectedItem={category}
				onChange={(value: Item | undefined): void => setCategory(value)}
			/>
			<Select
				label='Difficulty'
				options={[
					{ value: '1', label: 'One' },
					{ value: '2', label: 'Two' },
					{ value: '3', label: 'Three' }
				]}
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
