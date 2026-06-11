"use client";

import Image from "next/image";
import { useState } from "react";

export function FleetImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 px-4 text-center">
        <span className="text-xs font-semibold text-brand-800/70">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setError(true)}
    />
  );
}
