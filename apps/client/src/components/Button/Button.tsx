import { ButtonVariant } from '$src/enums';
import style from './Button.module.css';

interface ButtonProps {
	children: JSX.Element | string;
	onClick: () => void;
	variant?: ButtonVariant;
	disabled?: boolean;
}

export default function Button({
	children,
	onClick,
	variant = ButtonVariant.FILL,
	disabled
}: ButtonProps): JSX.Element {
	return (
		<button
			className={[style['button'], style[variant]].join(' ')}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
