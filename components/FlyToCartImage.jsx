'use client';

import { useEffect, useState } from 'react';

export default function FlyToCartImage({ animation }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!animation) return;
    const id = requestAnimationFrame(() => setActive(true));
    return () => {
      cancelAnimationFrame(id);
      setActive(false);
    };
  }, [animation]);

  if (!animation) return null;

  return (
    <img
      src={animation.image}
      alt=""
      className="pointer-events-none fixed z-[70] overflow-hidden rounded-full border border-white/20 object-cover shadow-2xl"
      style={{
        left: animation.from.left,
        top: animation.from.top,
        width: animation.from.width,
        height: animation.from.height,
        transform: active ? `translate(${animation.dx}px, ${animation.dy}px) scale(0.18)` : 'translate(0px, 0px) scale(1)',
        opacity: active ? 0 : 0.95,
        transition: 'transform 720ms cubic-bezier(.18,.8,.2,1), opacity 720ms ease',
      }}
    />
  );
}
