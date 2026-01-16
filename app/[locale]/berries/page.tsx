interface BerryListObject {
  name: string
  url: string
}

interface BerryListResponse {
  count: number
  results: BerryListObject[]
}

const PAGE_SIZES = [10, 30, 50] as const
const DEFAULT_PAGE_SIZE = 10

export default async function BerriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    pageSize?: string
  }>
}) {
  const { page, pageSize } = await searchParams

  const currentPage = Math.max(Number(page ?? 1), 1)

  const resolvedPageSize = PAGE_SIZES.includes(
    Number(pageSize) as (typeof PAGE_SIZES)[number]
  )
    ? Number(pageSize)
    : DEFAULT_PAGE_SIZE

  const offset = (currentPage - 1) * resolvedPageSize

  const res = await fetch(
    `https://pokeapi.co/api/v2/berry/?offset=${offset}&limit=${resolvedPageSize}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch berries')
  }

  const data: BerryListResponse = await res.json()
  const totalPages = Math.ceil(data.count / resolvedPageSize)

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Berry List</h1>

      {/* PAGE SIZE SELECTOR */}
      <div className="flex items-center gap-2">
        <span>Page size:</span>
        {PAGE_SIZES.map((size) => (
          <a
            key={size}
            href={`?page=1&pageSize=${size}`}
            className={`px-3 py-1 border rounded ${
              resolvedPageSize === size
                ? 'bg-gray-200 font-semibold'
                : ''
            }`}
          >
            {size}
          </a>
        ))}
      </div>

      {/* TABLE */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-10 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((b, i) => (
            <tr key={b.name} className="border-t">
              <td className="px-4 py-2">
                {offset + i + 1}
              </td>
              <td className="px-4 py-2 capitalize">
                {b.name}
              </td>
              <td className="px-4 py-2">
                <a
                  href={`/berries/${b.name}`}
                  className="text-blue-600 hover:underline"
                >
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <a
            href={`?page=${currentPage - 1}&pageSize=${resolvedPageSize}`}
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
            href={`?page=${currentPage + 1}&pageSize=${resolvedPageSize}`}
            className="px-3 py-1 border rounded"
          >
            Next
          </a>
        )}
      </div>
    </main>
  )
}
