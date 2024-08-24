import { ResponseState } from '@app/common/interface/interface';

export function base64Route(data: ResponseState): string {
  const { url, body, method, headers } = data;
  const encodedUrl = encodeURIComponent(btoa(url));
  const encodedBody = body ? encodeURIComponent(btoa(JSON.stringify(body))) : '';

  let routeUrl = `/${method}/${encodedUrl}`;
  if (encodedBody) {
    routeUrl += `/${encodedBody}`;
  }
  const queryParams = new URLSearchParams(headers).toString();
  if (queryParams) {
    routeUrl += `?${queryParams}`;
  }
  return routeUrl;
}
export function decodeBase64({ params }: { params: { method: string; base64: string; body?: string } }) {
  const { base64, body } = params;
  const decodedUrl = atob(decodeURIComponent(base64));
  const decodedBody = body ? JSON.parse(atob(decodeURIComponent(body))) : undefined;
  return { url: decodedUrl, body: decodedBody };
}
