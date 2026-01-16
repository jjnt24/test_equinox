import { useTranslations } from 'next-intl'

interface PaginationInfoProps {
  rangeStart: number
  rangeEnd: number
  filteredCount: number
  totalCount: number
  currentPage: number
  totalPages: number
  searchQuery?: string
}

export default function PaginationInfo({
  rangeStart,
  rangeEnd,
  filteredCount,
  totalCount,
  currentPage,
  totalPages,
  searchQuery,
}: PaginationInfoProps) {
  const t = useTranslations('PaginationInfo')

  if (filteredCount === 0) {
    return (
      <p className="text-sm text-gray-600">
        {t('noResults', {
          search: searchQuery ?? '',
        })}
      </p>
    )
  }

  return (
    <p className="text-sm text-gray-600">
      {searchQuery
        ? t.rich('showingFiltered', {
            start: rangeStart,
            end: rangeEnd,
            count: filteredCount,
            search: searchQuery,
            strong: (chunks) => <strong>{chunks}</strong>,
          })
        : t.rich('showingAll', {
            start: rangeStart,
            end: rangeEnd,
            count: totalCount,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}

      {' '}

      {totalPages > 1 &&
        t.rich('pageInfo', {
          current: currentPage,
          total: totalPages,
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
    </p>
  )
}
