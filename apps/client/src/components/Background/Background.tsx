import RedBlob from '$src/assets/blobs/red.svg';
import OrangeBlob from '$src/assets/blobs/orange.svg';
import YellowBlob from '$src/assets/blobs/yellow.svg';
import GreenBlob from '$src/assets/blobs/green.svg';
import BlueBlob from '$src/assets/blobs/blue.svg';
import PinkBlob from '$src/assets/blobs/pink.svg';

import style from './Background.module.css';

interface BackgroundProps {
	children: JSX.Element;
}

export default function Background({ children }: BackgroundProps): JSX.Element {
	return (
		<div className={style['background']}>
			<RedBlob />
			<OrangeBlob />
			<PinkBlob />
			<YellowBlob />
			<BlueBlob />
			<GreenBlob />
			<div className={style['content-container']}>{children}</div>
		</div>
	);
}
