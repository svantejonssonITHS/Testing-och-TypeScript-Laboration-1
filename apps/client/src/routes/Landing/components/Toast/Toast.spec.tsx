// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Toast from './Toast';

describe('Toast (component)', () => {
	it('should render the title and message', () => {
		const { getByText, baseElement } = render(
			<Toast
				title='Hello World'
				message='This is a test'
			/>
		);

		expect(getByText('Hello World')).toBeInTheDocument();
		expect(baseElement.querySelector('.toast')).toBeInTheDocument();
	});
});
