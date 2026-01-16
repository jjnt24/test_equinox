import BackButton from '@/components/BackButton'

interface Product {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default async function ProductEditPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const isEdit = Boolean(id)

  let product: Product = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  }

  if (isEdit) {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`
    )

    if (!res.ok) {
      throw new Error('Failed to fetch product')
    }

    product = await res.json()
  }

  return (
    <main className="max-w-2xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {isEdit ? 'Edit Product' : 'Create Product'}
      </h1>

      <form
        action="https://fakestoreapi.com/products"
        method="post"
        className="space-y-4"
      >
        {/* ID (hidden for edit) */}
        {isEdit && (
          <input
            type="hidden"
            name="id"
            value={product.id}
          />
        )}

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            defaultValue={product.title}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium">
            Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium">
            Category
          </label>
          <input
            name="category"
            defaultValue={product.category}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block text-sm font-medium">
            Image URL
          </label>
          <input
            name="image"
            defaultValue={product.image}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>

          <BackButton />
        </div>
      </form>
    </main>
  )
}
