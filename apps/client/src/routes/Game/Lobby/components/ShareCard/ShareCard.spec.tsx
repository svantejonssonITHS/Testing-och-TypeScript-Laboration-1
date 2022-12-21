// External dependencies
import { render, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';

// Internal dependencies
import ShareCard from './ShareCard';

describe('ShareCard component', () => {
	it('should render the game pin and copy button correctly', () => {
		const { getByText } = render(
			<ShareCard
				gamePin='123456'
				show={true}
			/>
		);
		const gamePin: HTMLElement = getByText('123456');
		const copyButton: HTMLElement = getByText('content_copy');

		expect(gamePin).toBeInTheDocument();
		expect(copyButton).toBeInTheDocument();
	});

	it('should add the show class when show prop is true', () => {
		const { container } = render(
			<ShareCard
				gamePin='123456'
				show={true}
			/>
		);

		expect(container.firstChild).toHaveClass('show');
	});

	it('should not add the show class when show prop is false', () => {
		const { container } = render(
			<ShareCard
				gamePin='123456'
				show={false}
			/>
		);

		expect(container.firstChild).not.toHaveClass('show');
	});

	it('should call navigator.clipboard.writeText and toast.success when the copy button is clicked', () => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: jest.fn()
			},
			writable: true
		});

		const toastSuccessMock: jest.Mock = jest.fn();
		toast.success = toastSuccessMock;

		const { getByText } = render(
			<ShareCard
				gamePin='123456'
				show={true}
			/>
		);
		const copyButton: HTMLElement = getByText('content_copy');

		fireEvent.click(copyButton);

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('123456');
		expect(toastSuccessMock).toHaveBeenCalledWith('Copied to clipboard!');
	});
});
