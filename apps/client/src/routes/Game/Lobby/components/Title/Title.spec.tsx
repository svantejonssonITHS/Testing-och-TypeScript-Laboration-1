// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Title from './Title';

describe('Title component', () => {
	it('should render the title correctly', () => {
		const { getByText } = render(<Title>Hello World</Title>);
		const title: HTMLElement = getByText('Hello World');

		expect(title).toBeInTheDocument();
	});

	it('should render the title with the correct class', () => {
		const { getByText } = render(<Title>Hello World</Title>);
		const title: HTMLElement = getByText('Hello World');

		expect(title).toHaveClass('title');
	});
});
