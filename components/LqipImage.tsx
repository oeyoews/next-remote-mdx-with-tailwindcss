'use client';
import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import lqip from 'lqip-modern';

interface LqipImageProps extends ImageProps {
	src: string;
}

const LqipImage: React.FC<LqipImageProps> = ({ src, ...rest }) => {
	const [lqipSrc, setLqipSrc] = useState('');

	useEffect(() => {
		const fetchLqip = async () => {
			const result = await lqip(src);
			setLqipSrc(result.metadata.dataURIBase64);
		};

		fetchLqip();
	}, [src]);

	return <Image src={src} placeholder="blur" blurDataURL={lqipSrc} {...rest} />;
};

export default LqipImage;