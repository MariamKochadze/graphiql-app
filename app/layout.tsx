/* eslint-disable react-refresh/only-export-components */
import { Footer } from '@components/Footer/Footer.component';
import { Header } from '@components/Header/Header.components';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Rest/graphql client app',
  description: 'RS School React Task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
