import PaginationInfo from "@/components/PaginationInfo"
import SearchInput from "@/components/SearchInput"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  category: string
}

type ProductListResponse = Product[]

const PAGE_SIZES = [10, 30, 50] as const
const DEFAULT_PAGE_SIZE = 10

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    pageSize?: string
    search?: string
  }>
}) {
  const { page, pageSize, search } = await searchParams

  const currentPage = Math.max(Number(page ?? 1), 1)

  const resolvedPageSize = PAGE_SIZES.includes(
    Number(pageSize) as (typeof PAGE_SIZES)[number]
  )
    ? Number(pageSize)
    : DEFAULT_PAGE_SIZE

  const searchQuery = (search ?? '').toLowerCase()

  /* ===============================
     2️⃣ GREEDY FETCH ALL
     =============================== */
  const res = await fetch('https://fakestoreapi.com/products')

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const data: ProductListResponse = await res.json()

  const totalCount = data.length


  /* ===============================
     3️⃣ SEARCH FILTER
     =============================== */
  const filtered = searchQuery
    ? data.filter(p =>
        p.title.toLowerCase().includes(searchQuery)
      )
    : data
  
  const sorted = [...filtered].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  )

  /* ===============================
     4️⃣ PAGINATION
     =============================== */
  const totalPages = Math.max(
    Math.ceil(filtered.length / resolvedPageSize),
    1
  )

  const start = (currentPage - 1) * resolvedPageSize
  const paginated = sorted.slice(
    start,
    start + resolvedPageSize
  )

  const rangeStart = filtered.length === 0 ? 0 : start + 1
  const rangeEnd = Math.min(
    start + resolvedPageSize,
    filtered.length
  )

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Product List</h1>

      <div className="flex gap-4 justify-between items-center">
        {/* SEARCH */}
        <SearchInput />

        <div className="flex gap-4 items-center">

            {/* PAGE SIZE */}
            <div className="flex gap-2 items-center">
                <span>Page size:</span>
                {PAGE_SIZES.map(size => (
                <a
                    key={size}
                    href={`?page=1&pageSize=${size}&search=${search ?? ''}`}
                    className={`px-3 py-1 border rounded ${
                    size === resolvedPageSize
                        ? 'bg-gray-200 font-semibold'
                        : ''
                    }`}
                >
                    {size}
                </a>
                ))}
            </div>

            <div>
                |
            </div>

            {/* PAGINATION */}
            <div className="flex gap-2 items-center">
                {currentPage > 1 && (
                <a
                    href={`?page=${currentPage - 1}&pageSize=${resolvedPageSize}&search=${search ?? ''}`}
                    className="px-3 py-1 border rounded"
                >
                    Prev
                </a>
                )}

                <span className="px-3 py-1 border rounded bg-gray-100">
                Page {currentPage} of {totalPages}
                </span>

                {currentPage < totalPages && (
                <a
                    href={`?page=${currentPage + 1}&pageSize=${resolvedPageSize}&search=${search ?? ''}`}
                    className="px-3 py-1 border rounded"
                >
                    Next
                </a>
                )}
            </div>

        </div>

      </div>

      <div className="flex justify-between gap-4">

        {/* PAGINATION INFO TEXT */}
        <PaginationInfo
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          filteredCount={filtered.length}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery || undefined}
        />

        {/* 'ADD PRODUCT' BUTTON */}
        <a
          href={`/products/edit`}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
        >
          Add Product
        </a>
      </div>

      {/* TABLE */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-10 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((p, i) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">
                {start + i + 1}
              </td>
              <td className="px-4 py-2">
                {p.title}
              </td>
              <td className="px-4 py-2 text-right">
                <div className="flex gap-2">
                  <a
                    href={`/products/view?id=${p.id}`}
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    View
                  </a>
                  <a
                    href={`/products/edit?id=${p.id}`}
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    Edit
                  </a>

                  <button
                    className="px-3 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </main>
  )
}
