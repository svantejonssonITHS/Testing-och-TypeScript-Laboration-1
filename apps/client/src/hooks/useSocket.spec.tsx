// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import { SocketProvider, useSocket } from './useSocket';

jest.mock('socket.io-client');

describe('SocketProvider', () => {
	it('throws an error if no token is provided', () => {
		expect(() => {
			render(
				// @ts-expect-error - missing prop token
				<SocketProvider>
					<div />
				</SocketProvider>
			);
		}).toThrowError('Token not found');
	});
});

describe('useSocket', () => {
	it('throws an error if the Socket context is not found', () => {
		const TestComponent = () => {
			useSocket();
			return null;
		};

		expect(() => {
			render(<TestComponent />);
		}).toThrowError('Socket context not found');
	});
});
