import React from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';

const FadeInOnScroll: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { ref, visible } = useOnScreen<HTMLDivElement>({ rootMargin: '0px 0px -80px 0px' });
	return (
		<div ref={ref} className={visible ? 'fade-in' : ''}>
			{children}
		</div>
	);
};

export default FadeInOnScroll;
