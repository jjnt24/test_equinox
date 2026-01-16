'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('LanguageSwitcher')

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">{t('language')}</span>

      <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
        {routing.locales.map(l => {
          const isActive = l === locale

          return (
            <button
              key={l}
              onClick={() => router.replace(pathname, { locale: l })}
              disabled={isActive}
              className={`
                px-4 py-1.5 text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-gray-900 text-white cursor-default'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
                disabled:opacity-100
                focus:outline-none focus:ring-2 focus:ring-gray-400
              `}
            >
              {l.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
