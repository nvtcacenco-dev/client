import { useEffect, useState, useRef, RefObject } from 'react';

export function useOnScreen(ref: RefObject<HTMLElement>) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isOnScreen, setIsOnScreen] = useState(false);

    useEffect(() => {
        // Create the IntersectionObserver
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );

        const currentElement = ref.current;

        if (currentElement) {
            observerRef.current.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observerRef.current?.disconnect();
            }
        };
    }, [ref]);

    return isOnScreen;
}