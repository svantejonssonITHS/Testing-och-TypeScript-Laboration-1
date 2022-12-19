// External dependencies
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { IdToken, useAuth0 } from '@auth0/auth0-react';

// Internal dependencies
import api from '$src/utils/api';
import Landing from './Landing/Landing';
import Game from './Game/Game';
import { SocketProvider } from '$src/hooks/useSocket';

export default function index(): JSX.Element {
	const { getIdTokenClaims, loginWithPopup } = useAuth0();
	const [token, setToken]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');

	const checkAuth: () => Promise<void> = async () => {
		const tokenClaims: IdToken | undefined = await getIdTokenClaims();

		const idToken: string | undefined = tokenClaims?.__raw;

		if (idToken) {
			setToken(idToken);
			api.defaults.headers.common.Authorization = `Bearer ${idToken}`;
		} else {
			setToken('');
		}
	};

	useEffect(() => {
		(async (): Promise<void> => {
			if (token.length) return;
			await loginWithPopup();
			checkAuth();
		})();
	}, [token]);

	if (token.length) {
		return (
			<SocketProvider token={token}>
				<Routes>
					<Route
						path='/'
						element={<Landing />}
					/>
					<Route
						path='/game/:gameId/*'
						element={<Game />}
					/>
					<Route
						path='*'
						element={<Navigate to='/' />}
					/>
				</Routes>
			</SocketProvider>
		);
	} else {
		return <></>;
	}
}
