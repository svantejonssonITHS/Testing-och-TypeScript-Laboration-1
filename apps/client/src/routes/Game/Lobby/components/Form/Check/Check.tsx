import style from './Check.module.css';

interface CheckProps {
	label: string;
	checked: boolean;
	onClick: (value: boolean) => void;
}

export default function Check({ label, checked, onClick }: CheckProps): JSX.Element {
	const selectId: string = Math.random().toString(36).substring(2, 9);

	return (
		<div className={style['container']}>
			<button
				className={style['check']}
				type='button'
				tabIndex={0}
				id={selectId}
				onClick={(): void => onClick(!checked)}
			>
				{checked && <span className='material-symbols-outlined'>gesture</span>}
			</button>
			<label
				htmlFor={selectId}
				className={style['label']}
			>
				{label}
			</label>
		</div>
	);
}
