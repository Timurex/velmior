'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductGallery({ images, title, heightClass = 'h-[560px]' }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images?.length || images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [images]);

  return (
    <div>
      <div className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 ${heightClass}`}>
        <Image
          src={images[active]}
          alt={`${title} ${active + 1}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5">
          <div className="text-sm text-neutral-200">{title}</div>
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${active === index ? 'w-10 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setActive(index)}
              className={`relative h-28 overflow-hidden rounded-[1.25rem] border transition ${active === index ? 'border-white/60' : 'border-white/10 hover:border-white/30'}`}
            >
              <Image src={image} alt={`${title} thumbnail ${index + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/15" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
