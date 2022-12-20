// External dependencies
import { createContext, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Internal dependencies
import { API_URL } from '$src/utils/env';
import { Event, Game } from '_packages/shared/types/src';

const SocketContext: React.Context<Socket | undefined> = createContext(undefined as Socket | undefined);

interface SocketProviderProps {
	token: string;
	children: JSX.Element;
}

export const SocketProvider = ({ token, children }: SocketProviderProps): JSX.Element => {
	if (!token) throw new Error('Token not found');

	console.log('TJOMME');

	const socket: Socket = io(API_URL, {
		extraHeaders: {
			Authorization: `Bearer ${token}`
		}
	});

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

interface UseSocket {
	emit: (event: string, data: Event) => void;
	on: (event: string) => void;
	game: Game | undefined;
}

export const useSocket = (): UseSocket => {
	const socket: Socket | undefined = useContext(SocketContext);
	const [game, setGame] = useState(undefined as Game | undefined);

	if (!socket) throw new Error('Socket context not found');

	const emit = (event: string, data: Event): void => {
		socket.emit(event, data);
	};

	const on = (event: string): void => {
		socket.on(event, (data: string) => {
			setGame(JSON.parse(data) as Game);
		});
	};

	return { emit, on, game };
};
