'use client'

import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

export default function QrScannerComponent({ onScan }: { onScan: (data: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!videoRef.current) return

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        onScan(result.data)
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment',
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
  }, [onScan])

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-black">
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
