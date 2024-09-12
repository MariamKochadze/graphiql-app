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
  const { url, body } = decodeBase64({ params });
  return (
    <>
      <InputEditor />
      <Params />
      <Response
        headers={searchParams}
        url={url}
        method={params.method}
        body={body}
        clientType={params.method === METHODS_GRAPHQL.GRAPHQL ? 'graphql' : 'rest'}
      />
    </>
  );
}
