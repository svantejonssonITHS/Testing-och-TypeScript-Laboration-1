import Select from './Select/Select';
import Text from './Text/Text';
import { useState, useEffect } from 'react';
import { Item } from '_packages/shared/types/src';
import style from './Form.module.css';

export default function Form(): JSX.Element {
	const [name, setName]: [Item | undefined, React.Dispatch<React.SetStateAction<Item | undefined>>] = useState();

	useEffect(() => {
		console.log(name);
	}, [name]);

	return (
		<form className={style['form']}>
			<Select
				label='Name'
				options={[
					{ value: '1', label: 'One' },
					{ value: '2', label: 'Two' },
					{ value: '3', label: 'Three' }
				]}
				selectedItem={name}
				onChange={(value: Item | undefined): void => setName(value)}
			/>
			<Text
				label='Name'
				value={name?.label ?? ''}
				onChange={(value: string): void => setName({ value, label: value })}
			/>
		</form>
	);
}
