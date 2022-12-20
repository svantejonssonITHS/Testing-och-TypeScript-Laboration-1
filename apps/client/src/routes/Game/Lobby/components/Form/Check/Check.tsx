import style from './Check.module.css';

interface CheckProps {
	label: string;
	checked: boolean;
	disabled: boolean;
	onClick: (value: boolean) => void;
}

export default function Check({ label, checked, disabled, onClick }: CheckProps): JSX.Element {
	const selectId: string = Math.random().toString(36).substring(2, 9);

	return (
		<div
			data-testid='check-container'
			className={style['container']}
		>
			<button
				data-testid='check-button'
				className={style['check']}
				type='button'
				tabIndex={0}
				id={selectId}
				disabled={disabled}
				onClick={(): void => onClick(!checked)}
			>
				{checked && <span className='material-symbols-outlined'>gesture</span>}
			</button>
			<label
				data-testid='check-label'
				htmlFor={selectId}
				className={style['label']}
			>
				{label}
			</label>
		</div>
	);
}
