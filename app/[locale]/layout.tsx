import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import SidebarWrapper from './SidebarWrapper';
import '../globals.css'
import ToastContainer from '@/components/ToastContainer';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html>
      <body>
        <NextIntlClientProvider>
          <SidebarWrapper locale={locale} children={children} />
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}