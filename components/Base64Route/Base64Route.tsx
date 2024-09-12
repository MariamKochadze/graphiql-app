import { ResponseState } from '@app/common/interface/interface';

export function base64Route(data: ResponseState): string {
  const { url, body, method, headers, clientType } = data;

  let routeUrl = `/${clientType === 'graphql' ? 'GRAPHQL' : method}`;

  if (url) {
    const encodedUrl = encodeURIComponent(btoa(url));
    routeUrl += `/${encodedUrl}`;
  } else if (!url && body) {
    const encodedUrl = encodeURIComponent(btoa('default'));
    routeUrl += `/${encodedUrl}`;
  }

  if (body) {
    const encodedBody = body ? encodeURIComponent(btoa(JSON.stringify(body))) : '';
    routeUrl += `/${encodedBody}`;
  }

  const queryParams = new URLSearchParams(headers).toString();
  if (queryParams) {
    routeUrl += `?${queryParams}`;
  }
  return routeUrl;
}
export function decodeBase64({ params }: { params: { method: string; base64?: string; body?: string } }) {
  const { base64, body } = params;
  const url = base64 ? atob(decodeURIComponent(base64)) : '';
  const decodedBody = body ? JSON.parse(atob(decodeURIComponent(body))) : undefined;
  return { url: url === 'default' ? '' : url, body: decodedBody };
}
