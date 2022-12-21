import Title from '../Title/Title';
import style from './PlayerList.module.css';
import Player from '$src/components/Player/Player';
import { Game, Player as PlayerObject } from '_packages/shared/types/src';

interface PlayerListProps {
	game: Game | undefined;
}

export default function PlayerList({ game }: PlayerListProps): JSX.Element {
	return (
		<div className={style['player-list']}>
			<Title>Participants</Title>
			<ul className={style['list']}>
				{game &&
					game.players &&
					game.host &&
					game.players.map((player: PlayerObject) => (
						<li key={player.id}>
							<Player
								player={player}
								status={player.id === game.host.id ? 'host' : player.isReady ? 'ready' : 'not-ready'}
								gameStage={game.stage}
							/>
						</li>
					))}
			</ul>
		</div>
	);
}
