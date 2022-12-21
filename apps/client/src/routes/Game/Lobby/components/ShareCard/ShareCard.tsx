// External dependencies
import { toast } from 'react-toastify';

// Internal dependencies
import style from './ShareCard.module.css';

interface ShareCardProps {
	gamePin: string;
	show: boolean;
}

export default function Sharecard({ gamePin, show }: ShareCardProps): JSX.Element {
	return (
		<div className={[style['share-card'], style[show ? 'show' : '']].join(' ')}>
			<h1>Invite your friends!</h1>
			<div className={style['pin-container']}>
				<p>{gamePin}</p>
				<button
					onClick={(): void => {
						navigator.clipboard.writeText(gamePin);
						toast.success('Copied to clipboard!');
					}}
				>
					<span className='material-symbols-outlined'>content_copy</span>
				</button>
			</div>
		</div>
	);
}
