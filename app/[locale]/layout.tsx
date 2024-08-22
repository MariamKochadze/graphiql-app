import { Footer } from '@components/Footer/Footer.component';
import { Header } from '@components/Header/Header.component';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Poppins } from 'next/font/google';
import { Metadata } from 'next/types';
import '../styles/global.css';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

/* eslint-disable react-refresh/only-export-components */
export const metadata: Metadata = {
  title: 'Rest/graphql client app',
  description: 'RS School React Task',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params: { locale } }: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-body-bg">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className={`${poppins.className}`}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
