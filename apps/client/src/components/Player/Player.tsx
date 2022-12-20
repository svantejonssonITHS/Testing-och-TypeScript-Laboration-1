import { GameStage } from '_packages/shared/enums/src';
import { Player as PlayerObject } from '_packages/shared/types';
import style from './Player.module.css';

interface PlayerProps {
	player: PlayerObject;
	gameStage: GameStage;
	status?: string;
	position?: number;
}

export default function Player({ player, gameStage, status, position }: PlayerProps): JSX.Element {
	return (
		<div className={style['card']}>
			{gameStage === GameStage.LOBBY && <div className={[style['status'], style[status ?? '']].join(' ')} />}
			{gameStage === GameStage.LEADERBOARD && <p className={style['position']}>{position}.</p>}
			<img
				className={style['image']}
				src={player.profilePicture}
				alt={`Profile picture of ${player.name}`}
			/>
			<div className={style['name']}>{player.name}</div>
			{gameStage === GameStage.LEADERBOARD && <div className={style['score']}>{player.score}</div>}
		</div>
	);
}
