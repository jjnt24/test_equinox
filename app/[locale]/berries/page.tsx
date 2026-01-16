import PaginationInfo from "@/components/PaginationInfo"
import SearchInput from "@/components/SearchInput"

interface Berry {
  name: string
  url: string
}

interface BerryListResponse {
  count: number
  results: Berry[]
}

const PAGE_SIZES = [10, 30, 50] as const
const DEFAULT_PAGE_SIZE = 10

export default async function BerriesPage({
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
  const res = await fetch(
    `https://pokeapi.co/api/v2/berry/?limit=1000000`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch all berries')
  }

  const data: BerryListResponse = await res.json()

  /* ===============================
     3️⃣ SEARCH FILTER
     =============================== */
  const filtered = searchQuery
    ? data.results.filter(b =>
        b.name.toLowerCase().includes(searchQuery)
      )
    : data.results
  
  const sorted = [...filtered].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
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
      <h1 className="text-2xl font-bold">Berry List</h1>

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

            {/* <div>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <a
                  key={n}
                  href={`?page=${n}&pageSize=${resolvedPageSize}&search=${search ?? ''}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 border-y border-slate-300 dark:border-slate-700 ${
                    n === currentPage
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {n}
                </a>
              ))}
            </div> */}

        </div>

      </div>

      {/* PAGINATION INFO TEXT */}
      <PaginationInfo
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        filteredCount={filtered.length}
        totalCount={data.count}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery || undefined}
      />


      {/* TABLE */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-10 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((b, i) => (
            <tr key={b.name} className="border-t">
              <td className="px-4 py-2">
                {start + i + 1}
              </td>
              <td className="px-4 py-2 capitalize">
                {b.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </main>
  )
}
