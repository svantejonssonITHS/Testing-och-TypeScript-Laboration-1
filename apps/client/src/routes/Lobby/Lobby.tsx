import style from './Lobby.module.css';
import Background from '$src/components/Background/Background';
import Form from './components/Form/Form';

export default function Lobby(): JSX.Element {
	return (
		<Background>
			<div className={style['lobby']}>
				<div className={style['contianer']}>
					<div className={style['column']}>
						<Form />
					</div>
					<div className={style['column']}></div>
				</div>
			</div>
		</Background>
	);
}
