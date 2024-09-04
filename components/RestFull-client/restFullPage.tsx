import { getServerSideProps } from '@components/Base64Route/GetServerSideProps';
import Response from '@components/Response/response';
import Params from '@components/RestFull-client/params';
import RestPage from '@components/RestFull-client/restPage';
import { decodeBase64 } from '@components/Base64Route/Base64Route';

export default async function RestFullClient({
  params,
  searchParams,
}: {
  params: { method: string; base64?: string; body?: string };
  searchParams: Record<string, string>;
}) {
  const { url, body, submit } = decodeBase64({ params });
  const {
    props: { data, status, error },
  } = submit ? await getServerSideProps({ params, searchParams }) : { props: { data: null, status: 0, error: null } };
  return (
    <>
      <RestPage />
      <Params />
      <Response
        data={data as unknown}
        status={status}
        error={error}
        headers={searchParams}
        url={url}
        method={params.method}
        body={body}
        submit={submit}
      />
    </>
  );
}
