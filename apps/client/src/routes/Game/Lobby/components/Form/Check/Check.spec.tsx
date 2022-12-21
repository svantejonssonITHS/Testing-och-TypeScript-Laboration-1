import { render, fireEvent } from '@testing-library/react';
import Check from './Check';

describe('Check component', () => {
	it('should render without crashing', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick = (value: boolean): void => {};
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);
		const checkContainerElement: HTMLElement = getByTestId('check-container');
		expect(checkContainerElement).toBeInTheDocument();
	});

	it('should render the correct className for the container element', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick = (value: boolean): void => {};
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);
		const checkContainerElement: HTMLElement = getByTestId('check-container');
		expect(checkContainerElement).toHaveClass('container');
	});

	it('should render the correct className for the check button element', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick = (value: boolean): void => {};
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);
		const checkButtonElement: HTMLElement = getByTestId('check-button');
		expect(checkButtonElement).toHaveClass('check');
	});

	it('should render the correct className for the label element', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick = (value: boolean): void => {};
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);
		const labelElement: HTMLElement = getByTestId('check-label');
		expect(labelElement).toHaveClass('label');
	});

	it('should render the correct label text', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick = (value: boolean): void => {};
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);
		const labelElement: HTMLElement = getByTestId('check-label');
		expect(labelElement).toHaveTextContent(label);
	});

	it('should call the onClick prop function when the check button is clicked with the correct value', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = false;
		const onClick: jest.Mock = jest.fn();
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);

		const checkButtonElement: HTMLElement = getByTestId('check-button');
		fireEvent.click(checkButtonElement);
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(true);
	});

	it('should not call the onClick prop function when the check button is clicked and the component is disabled', () => {
		const label: string = 'Private';
		const checked: boolean = false;
		const disabled: boolean = true;
		const onClick: jest.Mock = jest.fn();
		const { getByTestId } = render(
			<Check
				label={label}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
			/>
		);

		const checkButtonElement: HTMLElement = getByTestId('check-button');
		fireEvent.click(checkButtonElement);
		expect(onClick).toHaveBeenCalledTimes(0);
	});
});
