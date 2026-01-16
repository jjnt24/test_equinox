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
  if (filteredCount === 0) {
    return (
      <p className="text-sm text-gray-600">
        No results found
        {searchQuery && ` for "${searchQuery}"`}.
      </p>
    )
  }

  return (
    <p className="text-sm text-gray-600">
      {searchQuery ? (
        <>
          Showing <strong>{rangeStart}–{rangeEnd}</strong> of{' '}
          <strong>{filteredCount}</strong> result(s) for{' '}
          <strong>"{searchQuery}"</strong>.
        </>
      ) : (
        <>
          Showing <strong>{rangeStart}–{rangeEnd}</strong> of{' '}
          <strong>{totalCount}</strong> berries.
        </>
      )}
      {' '}Page <strong>{currentPage}</strong> of{' '}
      <strong>{totalPages}</strong>.
    </p>
  )
}
