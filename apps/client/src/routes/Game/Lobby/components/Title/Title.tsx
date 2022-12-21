import style from './Title.module.css';

interface TitleProps {
	children: string;
}

export default function Title({ children }: TitleProps): JSX.Element {
	return <h1 className={style['title']}>{children}</h1>;
}
