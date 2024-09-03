import { ResponseState } from '@app/common/interface/interface';
import { addBodyVariables } from './BodyVariables';

export function base64Route(data: ResponseState, submit: boolean = false): string {
  const { url, body, method, headers, variables } = data;

  let routeUrl = `/${method}`;

  if (url) {
    const urlObj = {
      url: url,
      submit: submit,
    };
    const encodedUrl = encodeURIComponent(btoa(JSON.stringify(urlObj)));
    routeUrl += `/${encodedUrl}`;
  } else if (!url && (body || Object.keys(variables).length > 0)) {
    const urlObj = {
      url: '',
      submit: submit,
    };
    const encodedUrl = encodeURIComponent(btoa(JSON.stringify(urlObj)));
    routeUrl += `/${encodedUrl}`;
  }

  if (body) {
    const bodyWithoutVariables = addBodyVariables(body, variables);
    const encodedBody = body ? encodeURIComponent(btoa(JSON.stringify(bodyWithoutVariables))) : '';
    routeUrl += `/${encodedBody}`;
  }
  if (Object.keys(variables).length > 0 && !body) {
    const bodyWithoutVariables = addBodyVariables('{}', variables);
    const encodedBody = encodeURIComponent(btoa(JSON.stringify(bodyWithoutVariables)));
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
  const { url, submit }: { url: string; submit: boolean } = base64 ? JSON.parse(atob(decodeURIComponent(base64))) : {};
  const decodedBody = body ? JSON.parse(atob(decodeURIComponent(body))) : undefined;
  return { url: url || '', body: decodedBody, submit: submit || false };
}
