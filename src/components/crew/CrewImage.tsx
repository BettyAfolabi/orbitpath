"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=800&q=80";

interface CrewImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function CrewImage({
  src,
  alt,
  fill,
  sizes,
  priority,
  className,
}: CrewImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}