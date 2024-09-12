import { getServerSideProps } from '@components/Base64Route/GetServerSideProps';
import Response from '@components/Response/response';
import Params from '@components/RestFull-client/params';
import InputEditor from '@components/RestFull-client/InputEditor';
import { decodeBase64 } from '@components/Base64Route/Base64Route';
import { METHODS_GRAPHQL } from '@app/common/constants';

export default async function RestFullAndGraph({
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
      <InputEditor />
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
        clientType={params.method === METHODS_GRAPHQL.GRAPHQL ? 'graphql' : 'rest'}
        urlSdl={''}
      />
    </>
  );
}
