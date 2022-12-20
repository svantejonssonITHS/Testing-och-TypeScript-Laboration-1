// External dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Internal dependencies
import './main.css';
import Routes from './routes';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '$src/utils/env';
import Background from './components/Background/Background';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ToastContainer
			pauseOnFocusLoss={false}
			pauseOnHover={false}
			autoClose={2500}
		/>
		<Auth0Provider
			domain={AUTH0_DOMAIN}
			clientId={AUTH0_CLIENT_ID}
			redirectUri={window.location.origin}
			offline_access={true}
			cacheLocation='localstorage'
		>
			<Background>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</Background>
		</Auth0Provider>
	</React.StrictMode>
);
