'use client'

import { useToast } from '@/store/useToastStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function DeleteProductButton({
  productId,
}: {
  productId: number
}) {
  const t = useTranslations('Products')
  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(t('confirmDelete'))) return

    setLoading(true)

    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
        { method: 'DELETE' }
      )

      if (!res.ok) throw new Error()

      toast.success(t('toast.deleteSuccess'))
      router.refresh() // re-fetch server component
    } catch {
      toast.error(t('toast.deleteError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      {loading ? t('actions.deleting') : t('actions.delete')}
    </button>
  )
}
