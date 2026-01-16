'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import BackButton from '@/components/BackButton'
import { useToast } from '@/store/useToastStore'

interface Product {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function ProductEditPage() {
  const t = useTranslations('ProductForm')
  const router = useRouter()
  const searchParams = useSearchParams()
  const toast = useToast()

  const id = searchParams.get('id')
  const isEdit = Boolean(id)

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  })

  /* -------- fetch product (edit) -------- */
  useEffect(() => {
    if (!isEdit) return

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error()
        setProduct(await res.json())
      } catch {
        toast.error(t('toast.loadError'))
      }
    }

    fetchProduct()
  }, [id, isEdit, toast, t])

  /* -------- submit -------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(
        isEdit
          ? `https://fakestoreapi.com/products/${id}`
          : `https://fakestoreapi.com/products`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        }
      )

      if (!res.ok) throw new Error()

      toast.success(
        isEdit ? t('toast.updateSuccess') : t('toast.createSuccess')
      )

      router.back()
    } catch {
      toast.error(
        isEdit ? t('toast.updateError') : t('toast.createError')
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {isEdit ? t('title.edit') : t('title.create')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium">
            {t('field.title')}
          </label>
          <input
            required
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium">
            {t('field.price')}
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium">
            {t('field.category')}
          </label>
          <input
            required
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-medium">
            {t('field.image')}
          </label>
          <input
            value={product.image}
            onChange={(e) =>
              setProduct({ ...product, image: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium">
            {t('field.description')}
          </label>
          <textarea
            rows={4}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
          >
            {isLoading
              ? isEdit
                ? t('button.updating')
                : t('button.creating')
              : isEdit
              ? t('button.update')
              : t('button.create')}
          </button>

          <BackButton />
        </div>
      </form>
    </main>
  )
}
