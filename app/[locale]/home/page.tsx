import LanguageSwitcher from '@/components/LanguageSwitcher';
import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return <>
    <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
            <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            </tr>
        </thead>
        <tbody>
            {[{id: 1, name: 'jo', email: 'email'}].map((u) => (
            <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
            </tr>
            ))}
        </tbody>
    </table>

    <h1>{t('title')}</h1>
    <LanguageSwitcher />
  </>;
}