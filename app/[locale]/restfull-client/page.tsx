/* eslint-disable react-refresh/only-export-components */
import RestPage from '@components/RestFull-client/restPage';
import Params from '@components/RestFull-client/params';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'REST-Full Client',
  description: 'RS School React Task',
};

export default function Page() {
  return (
    <>
      <RestPage />
      <Params />
    </>
  );
}
