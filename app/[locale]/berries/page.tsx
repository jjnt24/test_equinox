import PaginationInfo from "@/components/PaginationInfo"
import SearchInput from "@/components/SearchInput"
import { getTranslations } from "next-intl/server"
import BerryDetailButton from "./BerryDetailButton"

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
  const t = await getTranslations('Berries')

  const { page, pageSize, search } = await searchParams

  const currentPage = Math.max(Number(page ?? 1), 1)

  const resolvedPageSize = PAGE_SIZES.includes(
    Number(pageSize) as (typeof PAGE_SIZES)[number]
  )
    ? Number(pageSize)
    : DEFAULT_PAGE_SIZE

  const searchQuery = (search ?? '').toLowerCase()

  /* ===============================
     2️⃣ FETCH ALL DATA
     =============================== */
  const res = await fetch(
    `https://pokeapi.co/api/v2/berry/?limit=1000000`
  )

  if (!res.ok) {
    throw new Error(t('errorFetch'))
  }

  const data: BerryListResponse = await res.json()

  /* ===============================
     3️⃣ SEARCH + SORT
     =============================== */
  const filtered = searchQuery
    ? data.results.filter(b =>
        b.name.toLowerCase().includes(searchQuery)
      )
    : data.results

  const sorted = [...filtered].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  /* ===============================
     4️⃣ PAGINATION
     =============================== */
  const totalPages = Math.max(
    Math.ceil(filtered.length / resolvedPageSize),
    1
  )

  const start = (currentPage - 1) * resolvedPageSize
  const paginated = sorted.slice(start, start + resolvedPageSize)

  const rangeStart = filtered.length === 0 ? 0 : start + 1
  const rangeEnd = Math.min(start + resolvedPageSize, filtered.length)

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {t('title')}
      </h1>

      <div className="flex gap-4 justify-between items-center">
        {/* SEARCH */}
        <SearchInput />

        <div className="flex gap-4 items-center">
          {/* PAGE SIZE */}
          <div className="flex gap-2 items-center">
            <span>{t('pageSize')}:</span>

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

          <span>|</span>

          {/* PAGINATION */}
          <div className="flex gap-2 items-center">
            {currentPage > 1 && (
              <a
                href={`?page=${currentPage - 1}&pageSize=${resolvedPageSize}&search=${search ?? ''}`}
                className="px-2 py-1 border rounded"
              >
                {'<'}
              </a>
            )}

            <span className="px-3 py-1 border rounded bg-gray-100">
              {t('pageIndicator', {
                current: currentPage,
                total: totalPages,
              })}
            </span>

            {currentPage < totalPages && (
              <a
                href={`?page=${currentPage + 1}&pageSize=${resolvedPageSize}&search=${search ?? ''}`}
                className="px-2 py-1 border rounded"
              >
                {'>'}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* PAGINATION INFO */}
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
            <th className="px-4 py-2 w-10 text-left">
              {t('table.no')}
            </th>
            <th className="px-4 py-2 text-left">
              {t('table.name')}
            </th>
            <th className="px-4 py-2 text-left">
              {t('table.actions')}
            </th>
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

              <td className="px-4 py-2 w-70 text-right">
                <div className="flex gap-2">
                  <BerryDetailButton url={b.url} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
