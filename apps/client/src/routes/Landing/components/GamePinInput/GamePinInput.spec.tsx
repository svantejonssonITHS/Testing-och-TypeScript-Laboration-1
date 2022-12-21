// External dependencies
import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';

// Internal dependencies
import GamePinInput from './GamePinInput';

describe('GamePinInput (component)', () => {
	it('should render the input', () => {
		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={''}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={(): void => {
					console.log('onSubmit');
				}}
			/>
		);

		expect(gamePinInput.baseElement.querySelector('form')).toBeInTheDocument();
		expect(gamePinInput.baseElement.querySelector('input')).toBeInTheDocument();
		expect(gamePinInput.baseElement.querySelector('button')).toBeInTheDocument();
	});

	it('should render the input with a value', () => {
		const value: string = 'ABC123';

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={value}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={(): void => {
					console.log('onSubmit');
				}}
			/>
		);

		expect(gamePinInput.baseElement.querySelector('input')).toHaveValue(value);
	});

	it('should call setValue when the input changes', () => {
		const value: string = 'ABC123';
		const setValue: jest.Mock = jest.fn();
		const handleInput: jest.SpyInstance = jest.spyOn(React, 'useState');

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={''}
				setValue={setValue}
				onSubmit={(): void => {
					console.log('onSubmit');
				}}
			/>
		);

		const input: HTMLInputElement | null = gamePinInput.baseElement.querySelector('input');

		expect(input).toBeInTheDocument();
		if (!input) return;

		fireEvent.change(input, { target: { value } });

		expect(setValue).toHaveBeenCalledWith(value);

		handleInput.mockRestore();
	});

	it('should not be able to submit form', () => {
		const onSubmit: jest.Mock = jest.fn();
		const handleSubmit: jest.SpyInstance = jest.spyOn(React, 'useCallback');

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={''}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={onSubmit}
			/>
		);

		const form: HTMLFormElement | null = gamePinInput.baseElement.querySelector('form');

		expect(form).toBeInTheDocument();
		if (!form) return;

		fireEvent.submit(form);

		expect(onSubmit).not.toHaveBeenCalled();

		handleSubmit.mockRestore();
	});

	it('should be able to submit form', () => {
		const value: string = 'ABC123';
		const onSubmit: jest.Mock = jest.fn();
		const handleSubmit: jest.SpyInstance = jest.spyOn(React, 'useCallback');

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={value}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={onSubmit}
			/>
		);

		const form: HTMLFormElement | null = gamePinInput.baseElement.querySelector('form');

		expect(form).toBeInTheDocument();
		if (!form) return;

		fireEvent.submit(form);

		expect(onSubmit).toHaveBeenCalled();

		handleSubmit.mockRestore();
	});

	it('should be able to submit form with button', () => {
		const value: string = 'ABC123';
		const onSubmit: jest.Mock = jest.fn();
		const handleSubmit: jest.SpyInstance = jest.spyOn(React, 'useCallback');

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={value}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={onSubmit}
			/>
		);

		const button: HTMLButtonElement | null = gamePinInput.baseElement.querySelector('button');

		expect(button).toBeInTheDocument();
		if (!button) return;

		fireEvent.click(button);

		expect(onSubmit).toHaveBeenCalled();

		handleSubmit.mockRestore();
	});

	it('should not be able to submit form with button', () => {
		const onSubmit: jest.Mock = jest.fn();
		const handleSubmit: jest.SpyInstance = jest.spyOn(React, 'useCallback');

		const gamePinInput: RenderResult = render(
			<GamePinInput
				value={''}
				setValue={(): void => {
					console.log('setValue');
				}}
				onSubmit={onSubmit}
			/>
		);

		const button: HTMLButtonElement | null = gamePinInput.baseElement.querySelector('button');

		expect(button).toBeInTheDocument();
		if (!button) return;

		fireEvent.click(button);

		expect(onSubmit).not.toHaveBeenCalled();

		handleSubmit.mockRestore();
	});
});
