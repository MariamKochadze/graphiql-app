import { decodeBase64 } from './Base64Route';

export async function getServerSideProps({
  params,
  searchParams,
}: {
  params: { method: string; base64?: string; body?: string };
  searchParams: Record<string, string>;
}) {
  const { url, body } = decodeBase64({ params });
  const bodyObject = body ? (JSON.parse(body) as Record<string, unknown>) : undefined;
  if (bodyObject && (bodyObject['apiDogVariables'] || bodyObject['apiDogBody'])) {
    delete bodyObject['apiDogVariables'];
    delete bodyObject['apiDogBody'];
  }
  try {
    const response = await fetch(url, {
      method: params.method,
      body: Object.keys(bodyObject || {}).length > 0 ? JSON.stringify(bodyObject) : undefined,
      headers: {
        ...searchParams,
      },
    });
    try {
      const data = (await response.json()) || null;
      const status = response.status;
      if (!response.ok) {
        return { props: { data: null, status, error: data } };
      }
      return { props: { data, status, error: null } };
    } catch (error) {
      return { props: { data: null, status: response.status, error: response.statusText || 'Error' } };
    }
  } catch (error) {
    return { props: { data: null, status: 0, error: error.message || 'Error' } };
  }
}
