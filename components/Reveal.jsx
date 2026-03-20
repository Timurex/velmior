'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', delay = 0, y = 28 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shown ? 'translateY(0px)' : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
        filter: shown ? 'blur(0px)' : 'blur(2px)',
        transition: `transform 700ms ease, opacity 700ms ease, filter 700ms ease`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
}
