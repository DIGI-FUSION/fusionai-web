"use client";

import { useRef, useState, useEffect, RefObject } from "react";

interface UseVisibilityAnimationOptions {
    threshold?: number;
    rootMargin?: string;
}

interface UseVisibilityAnimationReturn<T extends HTMLElement> {
    ref: RefObject<T | null>;
    isVisible: boolean;
}

/**
 * Custom hook that uses Intersection Observer to detect when an element
 * is visible in the viewport. Used to pause/resume animations for performance.
 *
 * @param options.threshold - Percentage of element that must be visible (0-1)
 * @param options.rootMargin - Margin around the root (viewport)
 * @returns { ref, isVisible } - Ref to attach to element and visibility state
 */
export function useVisibilityAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseVisibilityAnimationOptions = {}
): UseVisibilityAnimationReturn<T> {
    const { threshold = 0.1, rootMargin = "50px" } = options;
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    return { ref, isVisible };
}
