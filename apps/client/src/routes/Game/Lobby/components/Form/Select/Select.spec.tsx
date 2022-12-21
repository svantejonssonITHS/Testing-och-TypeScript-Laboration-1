import { render, fireEvent } from '@testing-library/react';
import Select from './Select';
import { Item } from '_packages/shared/types/src';

const label: string = 'Region';
const options: Item[] = [
	{ label: 'North America', value: 'na' },
	{ label: 'Europe', value: 'eu' },
	{ label: 'Australia', value: 'au' },
	{ label: 'Asia', value: 'as' },
	{ label: 'South America', value: 'sa' }
];
const selectedValue: string = 'eu';
const disabled: boolean = false;
const onChange = (value: string | undefined): void => {};

describe('Select component', () => {
	it('should render without crashing', () => {
		const { getByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		const containerElement: HTMLElement = getByTestId('container');
		expect(containerElement).toBeInTheDocument();
	});

	it('should render the correct className for the container, label and input elements', () => {
		const { getByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		const containerElement: HTMLElement = getByTestId('container');
		expect(containerElement).toHaveClass('container');

		const selectContainerElement: HTMLElement = getByTestId('select-container');
		expect(selectContainerElement).toHaveClass('select-container');

		const labelElement: HTMLElement = getByTestId('label');
		expect(labelElement).toHaveClass('selected');

		const valueInputElement: HTMLElement = getByTestId('value-input');
		expect(valueInputElement).toHaveClass('selected');
	});

	it('should only render the clear-button element when the selectedValue prop is defined and the disabled prop is false', () => {
		const { queryByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		const clearButtonElement: HTMLElement | null = queryByTestId('clear-button');
		expect(clearButtonElement).toBeTruthy();
		expect(clearButtonElement).toBeInTheDocument();
	});

	it('should not render the expand-icon-container element when the disabled prop is true', () => {
		const { queryByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={true}
				onChange={onChange}
			/>
		);
		const expandIconContainerElement: HTMLElement | null = queryByTestId('expand-icon-container');
		expect(expandIconContainerElement).not.toBeInTheDocument();
	});

	it('should only render the expand-icon-container element when the disabled prop is false', () => {
		const { queryByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		const expandIconContainerElement: HTMLElement | null = queryByTestId('expand-icon-container');
		expect(expandIconContainerElement).toBeInTheDocument();
	});

	it('should only render the options element when the showOptions state variable is true and the disabled prop is false', () => {
		const { queryByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		const optionsElement: HTMLElement | null = queryByTestId('options');
		expect(optionsElement).not.toBeInTheDocument();
	});

	it('should toggle the showOptions state variable when the input element is clicked', () => {
		const { queryByTestId, getByTestId } = render(
			<Select
				label={label}
				options={options}
				selectedValue={selectedValue}
				disabled={disabled}
				onChange={onChange}
			/>
		);
		let optionsElement: HTMLElement | null = queryByTestId('options');
		expect(optionsElement).not.toBeInTheDocument();

		const valueInputElement: HTMLElement = getByTestId('value-input');
		fireEvent.click(valueInputElement);

		optionsElement = queryByTestId('options');
		expect(optionsElement).toBeInTheDocument();
	});
});
