import { decodeBase64 } from './Base64Route';

export async function getServerSideProps({
  params,
  searchParams,
}: {
  params: { method: string; base64: string; body?: string };
  searchParams: Record<string, string>;
}) {
  const { url, body } = decodeBase64({ params });
  const response = await fetch(url, {
    method: params.method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...searchParams,
    },
  });
  const data = await response.json();
  const status = response.status;
  if (!response.ok) {
    return { props: { data: null, status, error: data || response.statusText } };
  }
  return { props: { data, status, error: null } };
}
