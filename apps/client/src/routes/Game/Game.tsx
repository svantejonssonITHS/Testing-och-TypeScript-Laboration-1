import { useSocket } from '$src/hooks/useSocket';
import { getGameExists } from '$src/utils/api/game';
import { useEffect } from 'react';
import { NavigateFunction, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lobby from './Lobby/Lobby';
import Question from './Question/Question';

export default function Game(): JSX.Element {
	const { gameId } = useParams();
	const navigate: NavigateFunction = useNavigate();
	const { on, game } = useSocket();

	useEffect(() => {
		(async (): Promise<void> => {
			if (!gameId) return navigate('/');
			const exists: boolean = await getGameExists(gameId);
			if (!exists) {
				toast.error(`Game with pin ${gameId} does not exist`);
				return navigate('/');
			}
		})();
	}, [gameId]);

	on(gameId as string);

	return (
		<Routes>
			<Route
				path='/'
				element={<Lobby game={game} />}
			/>
			<Route
				path='question'
				element={<Question game={game} />}
			/>
		</Routes>
	);
}
