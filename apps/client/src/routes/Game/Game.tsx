import { Route, Routes } from 'react-router-dom';
import Lobby from './Lobby/Lobby';

export default function Game(): JSX.Element {
	return (
		<Routes>
			<Route
				path='/'
				element={<Lobby />}
			/>
		</Routes>
	);
}
