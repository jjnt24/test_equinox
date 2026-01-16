'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('SearchInput')


  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())

    // reset page intentionally on search
    params.set('page', '1')

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    router.replace(`?${params.toString()}`)
  }

  return (
    <input
      type="text"
      placeholder={t('searchPlaceholder')}
      defaultValue={searchParams.get('search') ?? ''}
      onChange={e => onChange(e.target.value)}
      className="border px-3 py-2 rounded"
    />
  )
}
