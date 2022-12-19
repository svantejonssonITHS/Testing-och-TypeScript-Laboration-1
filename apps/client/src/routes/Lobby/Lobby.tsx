import style from './Lobby.module.css';
import Background from '$src/components/Background/Background';
import Form from './components/Form/Form';
import PlayerList from './components/PlayerList/PlayerList';
import Button from '$src/components/Button/Button';
import { ButtonVariant } from '$src/enums';
import Sharecard from './components/ShareCard/ShareCard';

export default function Lobby(): JSX.Element {
	return (
		<Background>
			<div className={style['lobby']}>
				<div className={style['contianer']}>
					<div className={style['column']}>
						<Form />
					</div>
					<div className={style['column']}>
						<PlayerList />
					</div>
					<div className={style['row']}>
						<Button
							onClick={(): void => {}}
							variant={ButtonVariant.OUTLINE}
						>
							Go back
						</Button>
						<Button
							onClick={(): void => {}}
							variant={ButtonVariant.FILL}
						>
							Start Game
						</Button>
					</div>
				</div>
				<Sharecard
					gamePin='tjo'
					show
				/>
			</div>
		</Background>
	);
}
