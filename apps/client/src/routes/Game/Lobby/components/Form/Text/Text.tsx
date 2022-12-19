import style from './Text.module.css';
import { useOnClickOutside } from 'usehooks-ts';
import { useState, useRef } from 'react';

interface TextProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export default function Select({ label, value, onChange }: TextProps): JSX.Element {
	const inputRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const [isFocused, setIsFocused]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
	const selectId: string = Math.random().toString(36).substring(2, 9);

	useOnClickOutside(inputRef, () => {
		setIsFocused(false);
	});

	return (
		<div
			className={style['container']}
			ref={inputRef}
		>
			<div className={style['select-container']}>
				<label
					htmlFor={selectId}
					className={[style['label'], style[value.length || isFocused ? 'has-value' : '']].join(' ')}
				>
					{label}
				</label>
				<input
					tabIndex={0}
					className={[style['value-input'], style[value.length ? 'has-value' : '']].join(' ')}
					id={selectId}
					type='text'
					value={value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value)}
					onClick={(): void => setIsFocused(true)}
				/>
			</div>
		</div>
	);
}
