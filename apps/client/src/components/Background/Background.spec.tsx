// External dependencies
import { render } from '@testing-library/react';

// Internal dependencies
import Background from './Background';

describe('Background component', () => {
	it('should render the component when all props are defined', () => {
		const { container } = render(
			<Background>
				<div>Test child</div>
			</Background>
		);

		const contentContainer: Element | null = container.querySelector('.content-container');
		expect(contentContainer).toBeInTheDocument();

		if (!contentContainer) return;

		expect(contentContainer.textContent).toBe('Test child');
	});

	it('should throw error when children prop is not defined', () => {
		// @ts-expect-error - children prop is required
		expect(() => render(<Background />)).toThrowError('Background component requires children');
	});

	it("should set the className of the root div element to 'background'", () => {
		const { container } = render(
			<Background>
				<div>Test child</div>
			</Background>
		);

		const rootElement: ChildNode | null = container.firstChild;
		expect(rootElement).toHaveClass('background');
	});

	it("should set the className of the div element with the 'content-container' class correctly", () => {
		const { container } = render(
			<Background>
				<div>Test child</div>
			</Background>
		);

		const contentContainer: Element | null = container.querySelector('.content-container');
		expect(contentContainer).toHaveClass('content-container');
	});
});
