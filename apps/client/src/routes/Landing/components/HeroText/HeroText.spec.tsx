// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import HeroText from './HeroText';

describe('HeroText (component)', () => {
	it('should render the text', () => {
		const { getByText, baseElement } = render(<HeroText text='Hello World' />);
		expect(getByText('Hello World')).toBeInTheDocument();
		expect(baseElement.querySelector('.hero-text')).toBeInTheDocument();
	});
});
