import style from './Toast.module.css';

interface ToastProps {
	title: string;
	message: string;
}

export default function Toast({ title, message }: ToastProps): JSX.Element {
	return (
		<div className={style['toast']}>
			<h1>{title}</h1>
			<p>{message}</p>
		</div>
	);
}
