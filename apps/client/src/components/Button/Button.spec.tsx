// External dependencies
import { render, fireEvent } from '@testing-library/react';

// Internal dependencies
import { ButtonVariant } from '$src/enums';
import Button from './Button';

describe('Button component', () => {
	it('should render without crashing', () => {
		const { container } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(container).toBeTruthy();
	});

	it('should render the correct className when variant prop is passed', () => {
		const { container } = render(
			<Button
				variant={ButtonVariant.FILL}
				onClick={() => {}}
			>
				Click me
			</Button>
		);
		expect(container.firstChild).toHaveClass('button');
		expect(container.firstChild).toHaveClass(ButtonVariant.FILL);
	});

	it('should render the correct className when no variant prop is passed', () => {
		const { container } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(container.firstChild).toHaveClass('button');
		expect(container.firstChild).toHaveClass(ButtonVariant.FILL);
	});

	it('should render the disabled attribute when disabled prop is passed', () => {
		const { container } = render(
			<Button
				disabled
				onClick={() => {}}
			>
				Click me
			</Button>
		);
		expect(container.firstChild).toBeDisabled();
	});

	it('should not render the disabled attribute when disabled prop is not passed', () => {
		const { container } = render(<Button onClick={() => {}}>Click me</Button>);
		expect(container.firstChild).not.toBeDisabled();
	});

	it('should call the onClick prop when clicked', () => {
		const onClick: jest.Mock = jest.fn();
		const { container } = render(<Button onClick={onClick}>Click me</Button>);

		expect(container).toBeTruthy();
		expect(container.firstChild).toBeTruthy();

		if (!container.firstChild) return;

		fireEvent.click(container.firstChild);
		expect(onClick).toHaveBeenCalled();
	});
});
