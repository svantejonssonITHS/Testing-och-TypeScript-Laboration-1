// External dependencies
import { useOnClickOutside } from 'usehooks-ts';
import { useState, useRef } from 'react';

// Internal dependencies
import style from './Number.module.css';

interface NumberProps {
	label: string;
	value: number | undefined;
	min: number;
	max: number;
	disabled?: boolean;
	onChange: (value: number | undefined) => void;
}

export default function Number({ label, value, min, max, disabled, onChange }: NumberProps): JSX.Element {
	const inputRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const [isFocused, setIsFocused]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
	const inputId: string = Math.random().toString(36).substring(2, 9);

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
					htmlFor={inputId}
					className={[style['label'], style[value !== undefined || isFocused ? 'has-value' : '']].join(' ')}
				>
					{label}
				</label>
				<input
					tabIndex={0}
					className={[style['value-input'], style[value !== undefined ? 'has-value' : '']].join(' ')}
					id={inputId}
					type='number'
					value={value !== undefined ? value : min}
					min={min}
					max={max}
					disabled={disabled}
					onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
						// Remove any non-numeric characters
						const value: string = event.target.value.replace(/\D/g, '');

						// If the value is empty, set it to the minimum value
						if (value === '') {
							onChange(min);
							return;
						}

						onChange(value !== undefined ? parseInt(value) : undefined);
					}}
					onClick={(): void => setIsFocused(true)}
				/>
			</div>
		</div>
	);
}
