import { getServerSideProps } from '@components/Base64Route/GetServerSideProps';
import Response from '@components/Response/response';
import Params from '@components/RestFull-client/params';
import RestPage from '@components/RestFull-client/restPage';

export default async function RestFullClient({
  params,
  searchParams,
}: {
  params: { method: string; base64: string; body?: string };
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
