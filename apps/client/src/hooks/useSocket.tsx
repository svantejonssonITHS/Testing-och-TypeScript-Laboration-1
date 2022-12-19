// External dependencies
import { createContext, Dispatch, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Internal dependencies
import { API_URL } from '$src/utils/env';
import { Event, Game } from '_packages/shared/types/src';

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
	token: string;
	children: JSX.Element;
}

export const SocketProvider = ({ token, children }: SocketProviderProps): JSX.Element => {
	const [socket, setSocket] = useState<Socket | null>(null);

	if (!token) throw new Error('Token not found');

	useEffect(() => {
		const newSocket = io(API_URL, {
			extraHeaders: {
				authorization: `Bearer ${token}`
			}
		});

		setSocket(newSocket);

		return () => {
			if (socket) socket.disconnect();
		};
	}, []);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
	const socket = useContext(SocketContext);
	const [game, setGame]: [Game | undefined, Dispatch<React.SetStateAction<Game | undefined>>] = useState();

	if (!socket) {
		throw new Error('Socket not found');
	}

	const emit = (event: string, data: Event) => {
		socket.emit(event, data);
	};

	const on = (event: string) => {
		socket.on(event, (data: Game) => {
			setGame(data);
		});
	};

	return { emit, on, game };
};
