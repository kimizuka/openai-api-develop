import { RefObject, useCallback, useEffect, useState } from 'react';

export function useScroll(ref: RefObject<Window | HTMLElement>) {
  const [ target, setTarget ] = useState<Window | HTMLElement | null>(null);
  const [ scrollTop, setScrollTop ] = useState(0);
  const [ scrollLeft, setScrollLeft ] = useState(0);

  const handleScroll = useCallback(() => {
    if (target) {
      setScrollTop((target as Window).scrollY || (target as HTMLElement).scrollTop || 0);
      setScrollLeft((target as Window).scrollX || (target as HTMLElement).scrollLeft || 0);
    }
  }, [target]);

  useEffect(() => {
    if (ref.current) {
      setTarget(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (target) {
      target.removeEventListener('scroll', handleScroll);
      target.addEventListener('scroll', handleScroll, {
        passive: true
      });

      handleScroll();
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', handleScroll);
      }
    };
  }, [target, handleScroll]);

  return { scrollLeft, scrollTop };
}
