// External dependencies
import { useState, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

// Internal dependencies
import { Item } from '_packages/shared/types/src';
import style from './Select.module.css';
interface SelectProps {
	label: string;
	options: Item[];
	selectedValue: string | undefined;
	disabled?: boolean;
	onChange: (value: string | undefined) => void;
}
export default function Select({ label, options, selectedValue, disabled, onChange }: SelectProps): JSX.Element {
	const selectRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
	const selectId: string = Math.random().toString(36).substring(2, 9);
	const [showOptions, setShowOptions]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
	useOnClickOutside(selectRef, () => {
		setShowOptions(false);
	});
	return (
		<div
			data-testid='container'
			className={style['container']}
			ref={selectRef}
		>
			<div
				data-testid='select-container'
				className={style['select-container']}
			>
				<label
					data-testid='label'
					htmlFor={selectId}
					className={style[selectedValue ? 'selected' : '']}
				>
					{label}
				</label>
				<input
					data-testid='value-input'
					className={[style['value-input'], style[selectedValue ? 'selected' : '']].join(' ')}
					id={selectId}
					type='button'
					value={options.find((option: Item): boolean => option.value === selectedValue)?.label || ''}
					onClick={(): void => setShowOptions(!showOptions)}
				/>
				{!disabled && (
					<>
						{selectedValue && (
							<button
								data-testid='clear-button'
								className={style['clear-button']}
								type='button'
								disabled={disabled}
								onClick={(): void => onChange(undefined)}
							>
								<span className='material-symbols-outlined'>close</span>
							</button>
						)}
						<div
							data-testid='expand-icon-container'
							className={style['expand-icon-container']}
						>
							<span
								className={['material-symbols-outlined', style[showOptions ? 'expanded' : '']].join(
									' '
								)}
							>
								expand_more
							</span>
						</div>
					</>
				)}
			</div>
			{showOptions && !disabled && (
				<div
					data-testid='options'
					className={style['options']}
				>
					{options ? (
						options.map(
							(option: Item): JSX.Element => (
								<p
									className={style['option']}
									key={option.label + option.value}
									onClick={(): void => {
										onChange(option.value);
										setShowOptions(false);
									}}
								>
									{option.label}
								</p>
							)
						)
					) : (
						<p>No options</p>
					)}
				</div>
			)}
		</div>
	);
}
