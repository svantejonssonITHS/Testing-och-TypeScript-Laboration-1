// External dependencies
import { Routes, Route } from 'react-router-dom';

// Internal dependencies
import Lobby from './Lobby';
import Test from './Test';

export default function index(): JSX.Element {
	return (
		<Routes>
			<Route
				path='/'
				element={<Lobby />}
			/>
			<Route
				path='/test'
				element={<Test />}
			/>
		</Routes>
	);
}
