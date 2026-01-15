'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {routing.locales.map(l => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          disabled={l === locale}
          style={{
            padding: '4px 8px',
            opacity: l === locale ? 0.5 : 1,
            cursor: l === locale ? 'default' : 'pointer'
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
