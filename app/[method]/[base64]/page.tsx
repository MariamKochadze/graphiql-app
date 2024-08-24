import Params from '@components/RestFull-client/params';
import { getServerSideProps } from '@components/RestFull-client/RestfullRoute/GetServerSideProps';
import RestPage from '@components/RestFull-client/restPage';
import Response from '@components/RestFull-client/Response/response';

export default async function RestFullClient({
  params,
  searchParams,
}: {
  params: { method: string; base64: string };
  searchParams: Record<string, string>;
}) {
  const {
    props: { data, status, error },
  } = await getServerSideProps({ params, searchParams });
  return (
    <>
      <RestPage />
      <Params />
      <Response data={data as unknown} status={status} error={error} />
    </>
  );
}
