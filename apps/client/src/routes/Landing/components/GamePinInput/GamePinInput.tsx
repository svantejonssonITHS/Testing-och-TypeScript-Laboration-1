// External dependencies
import { useEffect, useState } from 'react';

// Internal dependencies
import style from './GamePinInput.module.css';

interface GamePinInputProps {
	value: string;
	setValue: (value: string) => void;
	disabled?: boolean;
	onSubmit: () => void;
}

export default function GamePinInput({ value, setValue, disabled, onSubmit }: GamePinInputProps): JSX.Element {
	const [validPin, setValidPin] = useState(false);

	useEffect(() => {
		// Check if the value is a valid game pin. Format is: AAA123
		if (value && value.length === 6 && /^[A-Z]{3}[0-9]{3}$/.test(value)) {
			setValidPin(true);
		} else {
			setValidPin(false);
		}
	}, [value]);

	return (
		<form
			className={style['form']}
			onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
				event.preventDefault();

				if (!validPin) return;

				onSubmit();
			}}
		>
			<input
				className={[style['input'], style[validPin ? 'valid' : value.length > 5 ? 'invalid' : '']].join(' ')}
				type='text'
				placeholder='Enter game pin'
				value={value}
				onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
					setValue(event.target.value.toUpperCase())
				}
				disabled={disabled}
				maxLength={6}
			/>
			<button
				className={[style['button'], style[validPin && !disabled ? 'show' : '']].join(' ')}
				type='submit'
				disabled={disabled}
			>
				Join
			</button>
		</form>
	);
}
