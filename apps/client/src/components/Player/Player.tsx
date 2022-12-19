import { GameStage, LeaderboardMovement } from '_packages/shared/enums/src';
import { Player as PlayerObject } from '_packages/shared/types';
import style from './Player.module.css';

interface PlayerProps {
	player: PlayerObject;
	gameStage: GameStage;
	status?: string;
	position?: number;
	leaderboardMovement?: LeaderboardMovement;
}

export default function Player({ player, gameStage, status, position, leaderboardMovement }: PlayerProps): JSX.Element {
	const movement: string =
		leaderboardMovement === LeaderboardMovement.UP
			? 'expand_less'
			: leaderboardMovement === LeaderboardMovement.DOWN
			? 'expand_more'
			: 'remove';

	return (
		<div className={style['card']}>
			{gameStage === GameStage.LOBBY && <div className={[style['status'], style[status ?? '']].join(' ')} />}
			{gameStage === GameStage.LEADERBOARD && leaderboardMovement && (
				<>
					<p className={style['position']}>{position}.</p>
					<span className={['material-symbols-outlined', style[movement]].join(' ')}>{movement}</span>
				</>
			)}
			<img
				className={style['image']}
				src='https://thispersondoesnotexist.com/image'
				alt={`Profile picture of ${player.name}`}
			/>
			<div className={style['name']}>{player.name}</div>
			{gameStage === GameStage.LEADERBOARD && <div className={style['score']}>{player.score}</div>}
		</div>
	);
}
