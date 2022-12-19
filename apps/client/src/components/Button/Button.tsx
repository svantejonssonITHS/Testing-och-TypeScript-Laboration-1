import { ButtonVariant } from '$src/enums';
import style from './Button.module.css';

interface ButtonProps {
	children: JSX.Element | string;
	onClick: () => void;
	variant?: ButtonVariant;
}

export default function Button({ children, onClick, variant = ButtonVariant.FILL }: ButtonProps): JSX.Element {
	return (
		<button
			className={[style['button'], style[variant]].join(' ')}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
