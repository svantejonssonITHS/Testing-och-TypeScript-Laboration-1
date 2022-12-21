import { render, fireEvent } from '@testing-library/react';
import Number from './Number';

describe('Number component', () => {
	it('should render the label and input correctly', () => {
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={5}
				min={0}
				max={10}
				onChange={() => {}}
			/>
		);
		const input: HTMLElement = getByLabelText('Number');

		expect(input).toBeInTheDocument();
		expect(input).toHaveValue(5);
	});

	it('should update the value when the input is changed', () => {
		const onChangeMock: jest.Mock = jest.fn();
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={5}
				min={0}
				max={10}
				onChange={onChangeMock}
			/>
		);
		const input: HTMLElement = getByLabelText('Number');

		fireEvent.change(input, { target: { value: '7' } });

		expect(onChangeMock).toHaveBeenCalledWith(7);
	});

	it('should set the value to the minimum value if the input is cleared', () => {
		const onChangeMock: jest.Mock = jest.fn();
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={5}
				min={0}
				max={10}
				onChange={onChangeMock}
			/>
		);
		const input: HTMLElement = getByLabelText('Number');

		fireEvent.change(input, { target: { value: '' } });

		expect(onChangeMock).toHaveBeenCalledWith(0);
	});

	it('should render the input with the correct class if it has a value', () => {
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={5}
				min={0}
				max={10}
				onChange={() => {}}
			/>
		);
		const input: HTMLElement = getByLabelText('Number');

		expect(input).toHaveClass('has-value');
	});

	it('should render the label with the correct class if it has a value', () => {
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={5}
				min={0}
				max={10}
				onChange={() => {}}
			/>
		);
		const label: HTMLElement = getByLabelText('Number');

		expect(label).toHaveClass('has-value');
	});

	it('should render the label and input with the correct class if it has a value and the input is clicked', () => {
		const { getByLabelText } = render(
			<Number
				label='Number'
				value={4}
				min={0}
				max={10}
				onChange={() => {}}
			/>
		);
		const label: HTMLElement = getByLabelText('Number');
		const input: HTMLElement = getByLabelText('Number');

		fireEvent.click(input);

		expect(label).toHaveClass('has-value');
		expect(input).toHaveClass('has-value');
	});
});
