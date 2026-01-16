'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function ProductViewerPage() {
  const router = useRouter()
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
     1️⃣ Fetch product list
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


  /* ===============================
     2️⃣ Fetch product detail
     =============================== */
  async function handleGo() {
    if (!selectedId) return

    router.push(
        `?id=${selectedId}`,
        { scroll: false }
    )
  }

  return (
    <main className="max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Product Viewer
      </h1>

      {/* SELECT */}
      {listLoading ? (
        <p className="text-gray-500">Loading products…</p>
      ) : (
        <div className="flex gap-3">
          <select
            value={selectedId}
            onChange={e => {
                setSelectedId(Number(e.target.value))
            }}
            className="flex-1 border rounded px-3 py-2"
          >
            <option value="">Choose product</option>
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
            className="px-4 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
          >
            Go
          </button>
        </div>
      )}

      {/* DETAIL */}
      {detailLoading && (
        <p className="text-gray-500">
          Loading product details…
        </p>
      )}

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
              Category: {selectedProduct.category}
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
