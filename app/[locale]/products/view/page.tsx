'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Skeleton from '@/components/Skeleton'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function ProductViewerPage() {
  const t = useTranslations('ProductViewer')

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryProductId = searchParams.get('id')
    ? Number(searchParams.get('id'))
    : null

  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<number | ''>('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const [listLoading, setListLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  /* ===============================
     1️⃣ FETCH PRODUCT LIST
     =============================== */
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setProducts(data)
      } finally {
        setListLoading(false)
      }
    }

    loadProducts()
  }, [])

  /* ===============================
     2️⃣ FETCH PRODUCT DETAIL
     =============================== */
  useEffect(() => {
    if (!queryProductId) return

    async function fetchDetail() {
      setDetailLoading(true)
      setSelectedProduct(null)

      const res = await fetch(
        `https://fakestoreapi.com/products/${queryProductId}`
      )
      const data = await res.json()

      setSelectedProduct(data)
      setDetailLoading(false)
    }

    fetchDetail()
    setSelectedId(queryProductId)
  }, [queryProductId])

  function handleGo() {
    if (!selectedId) return

    router.push(`?id=${selectedId}`, { scroll: false })
  }

  return (
    <main className="max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {t('title')}
      </h1>

      {/* SELECT */}
      {listLoading ? (
        <div className="flex gap-3">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-16 h-10" />
        </div>
      ) : (
        <div className="flex gap-3">
          <select
            value={selectedId}
            onChange={e => {
              setSelectedProduct(null)
              router.push(pathname, { scroll: false })
              setSelectedId(
                e.target.value ? Number(e.target.value) : ''
              )
            }}
            className="flex-1 border rounded px-3 py-2"
          >
            <option value="">
              {t('chooseProduct')}
            </option>

            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleGo}
            disabled={
              !selectedId ||
              (
                queryProductId !== null &&
                selectedId === queryProductId
              )
            }
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-default"
          >
            {t('go')}
          </button>
        </div>
      )}

      {/* DETAIL LOADING */}
      {detailLoading && (
        <div className="border rounded p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-40 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      )}

      {/* DETAIL */}
      {selectedProduct && (
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold text-lg">
            {selectedProduct.title}
          </h2>

          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-40 object-contain"
          />

          <p>{selectedProduct.description}</p>

          <div className="flex justify-between text-sm">
            <span>
              {t('category')}: {selectedProduct.category}
            </span>
            <span className="font-semibold">
              ${selectedProduct.price}
            </span>
          </div>
        </div>
      )}
    </main>
  )
}
