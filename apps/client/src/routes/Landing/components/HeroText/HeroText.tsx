import style from './HeroText.module.css';

interface HeroTextProps {
	text: string;
}

export default function HeroText({ text }: HeroTextProps): JSX.Element {
	return <h1 className={style['hero-text']}>{text}</h1>;
}
