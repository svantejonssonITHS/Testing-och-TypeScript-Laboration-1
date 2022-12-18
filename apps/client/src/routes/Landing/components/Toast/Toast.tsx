import style from './Toast.module.css';

export default function Toast(): JSX.Element {
	return (
		<div className={style['toast']}>
			<h1>Trivia API is down</h1>
			<p>The Trivia API is not working at the moment. Please try again later!</p>
		</div>
	);
}
