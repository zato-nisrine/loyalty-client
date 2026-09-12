'use client'

import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js'

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const onScanRef = useRef(onScan)
  const [error, setError] = useState('')

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  useEffect(() => {
    if (!videoRef.current) return

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScanRef.current(result.data)
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment',
        calculateScanRegion: (video) => {
          const size = Math.round(Math.min(video.videoWidth, video.videoHeight) * 0.9)
          return {
            x: Math.round((video.videoWidth - size) / 2),
            y: Math.round((video.videoHeight - size) / 2),
            width: size,
            height: size,
          }
        },
      }
    )

    scannerRef.current = scanner

    scanner.start().catch(() => {
      setError("Impossible d'accéder à la caméra. Vérifiez les autorisations de votre navigateur.")
    })

    return () => {
      scanner.stop()
      scanner.destroy()
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-black">
      {error ? (
        <div className="p-8 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      ) : (
        <video ref={videoRef} className="aspect-square w-full object-cover" />
      )}
    </div>
  )
}
