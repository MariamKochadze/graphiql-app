import RestPage from '@components/RestFull-client/restPage';
import { Metadata } from 'next/types';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'REST-Full Client',
  description: 'RS School React Task',
};

export default function Page() {
  return <RestPage />;
}
