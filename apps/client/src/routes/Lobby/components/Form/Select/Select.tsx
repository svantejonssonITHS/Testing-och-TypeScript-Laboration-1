import { Item } from '_packages/shared/types/src';
import { useState } from 'react';
import style from './Select.module.css';
import Close from '$src/assets/icons/close.svg';

interface SelectProps {
	label: string;
	options: Item[];
	selectedItem: Item | undefined;
	onChange: (value: Item | undefined) => void;
}

export default function Select({ label, options, selectedItem, onChange }: SelectProps): JSX.Element {
	const selectId: string = Math.random().toString(36).substring(2, 9);
	const [showOptions, setShowOptions]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);

	return (
		<div className={style['container']}>
			<div className={style['select-container']}>
				<label
					htmlFor={selectId}
					className={style[selectedItem?.label ? 'selected' : '']}
				>
					{label}
				</label>
				<input
					className={[style['value-input'], style[selectedItem?.label ? 'selected' : '']].join(' ')}
					id={selectId}
					type='button'
					value={selectedItem?.label ?? ''}
					onClick={(): void => setShowOptions(!showOptions)}
				/>
				{selectedItem && (
					<button
						className={style['clear-button']}
						type='button'
						onClick={(): void => onChange(undefined)}
					>
						<span className='material-symbols-outlined'>close</span>
					</button>
				)}
				<div className={style['expand-icon-container']}>
					<span className={['material-symbols-outlined', style[showOptions ? 'expanded' : '']].join(' ')}>
						expand_more
					</span>
				</div>
			</div>
			{showOptions && (
				<div className={style['options']}>
					{options ? (
						options.map(
							(option: Item): JSX.Element => (
								<p
									className={style['option']}
									key={option.value}
									onClick={(): void => {
										onChange(option);
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
