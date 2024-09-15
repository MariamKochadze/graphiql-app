import { METHODS_GRAPHQL } from '@app/common/constants';
import { decodeBase64 } from '@components/Base64Route/Base64Route';
import Response from '@components/Response/response';
import InputEditor from '@components/RestFull-client/InputEditor';
import Params from '@components/RestFull-client/params';

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
      <div className={params.method === METHODS_GRAPHQL.GRAPHQL ? 'flex' : ''}>
        <Params />
        <Response
          headers={searchParams}
          url={url}
          method={params.method}
          body={body}
          clientType={params.method === METHODS_GRAPHQL.GRAPHQL ? 'graphql' : 'rest'}
          // there can be Sdl url
        />
      </div>
    </>
  );
}
