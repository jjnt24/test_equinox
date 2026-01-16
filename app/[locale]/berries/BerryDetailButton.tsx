'use client'

import Skeleton from '@/components/Skeleton'
import { useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  url: string
}

interface BerryDetail {
  name: string
  growth_time: number
  max_harvest: number
  size: number
  smoothness: number
  soil_dryness: number
}

export default function BerryDetailModal({ url }: Props) {
  const t = useTranslations('BerryDetail')

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<BerryDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  const openModal = async () => {
    setOpen(true)

    if (data) return

    try {
      setLoading(true)
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')

      const json = await res.json()
      setData(json)
    } catch {
      setError(t('errors.loadDetail'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={openModal}
        className="px-3 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
      >
        {t('actions.showDetail')}
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative text-center">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              aria-label={t('actions.close')}
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-bold capitalize mb-4">
              {data ? t('detail.title', { name: data.name }) : t('detail.loadingTitle')}
            </h2>

            {/* CONTENT */}
            {loading && <BerryDetailSkeleton />}

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            {data && !loading && (
              <div className="space-y-2 text-sm text-left">
                <div><b>{t('detail.growthTime')}:</b> {data.growth_time}</div>
                <div><b>{t('detail.maxHarvest')}:</b> {data.max_harvest}</div>
                <div><b>{t('detail.size')}:</b> {data.size}</div>
                <div><b>{t('detail.smoothness')}:</b> {data.smoothness}</div>
                <div><b>{t('detail.soilDryness')}:</b> {data.soil_dryness}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* =========================
   Skeleton Loader
========================= */
function BerryDetailSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between gap-4">
          <Skeleton className="h-4 bg-gray-200 rounded w-1/3" />
          <Skeleton className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}
