import Title from '../Title/Title';
import style from './PlayerList.module.css';
import Player from '$src/components/Player/Player';
import { GameStage, LeaderboardMovement } from '_packages/shared/enums/src';

export default function PlayerList(): JSX.Element {
	return (
		<div className={style['player-list']}>
			<Title>Participants</Title>
			<ul className={style['list']}>
				<li>
					<Player
						player={{
							id: '1',
							name: 'John Doe',
							email: 'john.doe@email.com',
							profilePicture: 'https://thispersondoesnotexist.com/image',
							score: 0,
							isReady: true
						}}
						status='host'
						position={1}
						gameStage={GameStage.LOBBY}
						leaderboardMovement={LeaderboardMovement.NONE}
					/>
				</li>
				<li>
					<Player
						player={{
							id: '1',
							name: 'John Doe',
							email: 'john.doe@email.com',
							profilePicture: 'https://thispersondoesnotexist.com/image',
							score: 0,
							isReady: true
						}}
						status='host'
						position={1}
						gameStage={GameStage.LOBBY}
						leaderboardMovement={LeaderboardMovement.NONE}
					/>
				</li>
				<li>
					<Player
						player={{
							id: '1',
							name: 'John Doe',
							email: 'john.doe@email.com',
							profilePicture: 'https://thispersondoesnotexist.com/image',
							score: 0,
							isReady: true
						}}
						status='host'
						position={1}
						gameStage={GameStage.LOBBY}
						leaderboardMovement={LeaderboardMovement.NONE}
					/>
				</li>
				<li>
					<Player
						player={{
							id: '1',
							name: 'John Doe',
							email: 'john.doe@email.com',
							profilePicture: 'https://thispersondoesnotexist.com/image',
							score: 0,
							isReady: true
						}}
						status='host'
						position={1}
						gameStage={GameStage.LOBBY}
						leaderboardMovement={LeaderboardMovement.NONE}
					/>
				</li>
			</ul>
		</div>
	);
}
