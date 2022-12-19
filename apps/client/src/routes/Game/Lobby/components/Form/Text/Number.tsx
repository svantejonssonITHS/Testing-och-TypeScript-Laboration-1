import style from './Number.module.css';
import { useOnClickOutside } from 'usehooks-ts';
import { useState, useRef } from 'react';

interface TextProps {
	label: string;
	value: number | undefined;
	onChange: (value: number | undefined) => void;
}

export default function Number({ label, value, onChange }: TextProps): JSX.Element {
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
					className={[style['label'], style[value !== undefined || isFocused ? 'has-value' : '']].join(' ')}
				>
					{label}
				</label>
				<input
					tabIndex={0}
					className={[style['value-input'], style[value !== undefined ? 'has-value' : '']].join(' ')}
					id={selectId}
					type='number'
					value={value}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						// Remove any non-numeric characters
						const value: string = event.target.value.replace(/\D/g, '');
						onChange(value !== undefined ? parseInt(value) : undefined);
					}}
					onClick={(): void => setIsFocused(true)}
				/>
			</div>
		</div>
	);
}
