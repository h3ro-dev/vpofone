'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface LazyImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallback?: string
  blur?: boolean
}

export function LazyImage({
  src,
  alt,
  fallback = '/placeholder.png',
  blur = true,
  className = '',
  ...props
}: LazyImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  })

  const handleError = () => {
    setError(true)
  }

  const handleLoad = () => {
    setLoaded(true)
  }

  const imageSrc = error ? fallback : src

  return (
    <div ref={ref} className={`relative ${className}`}>
      {inView && (
        <>
          <Image
            {...props}
            src={imageSrc}
            alt={alt}
            className={`transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onError={handleError}
            onLoadingComplete={handleLoad}
            loading="lazy"
            placeholder={blur ? 'blur' : 'empty'}
            quality={85}
          />
          {!loaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
          )}
        </>
      )}
    </div>
  )
}