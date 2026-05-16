import React from 'react';

export function useOnScreen<T extends Element>(options?: IntersectionObserverInit) {
	const ref = React.useRef<T | null>(null);
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), options);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [options]);

	return { ref, visible } as const;
}
