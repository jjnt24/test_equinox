import { getTranslations } from "next-intl/server"

export default async function LoadingBerries() {
  const t = await getTranslations('Berries')
  
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">        
        {t('title')}
      </h1>

      {/* TOP CONTROLS */}
      <div className="flex gap-4 justify-between items-center">
        {/* SEARCH */}
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />

        <div className="flex gap-4 items-center">
          {/* PAGE SIZE */}
          <div className="flex gap-2 items-center">
            <span>Page size:</span>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-8 w-10 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          <div>|</div>

          {/* PAGINATION */}
          <div className="flex gap-2 items-center">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* PAGINATION INFO */}
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />

      {/* TABLE */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-10 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">
                <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
