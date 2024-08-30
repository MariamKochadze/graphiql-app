import { ResponseState } from '@app/common/interface/interface';

export function base64Route(data: ResponseState): string {
  const { url, body, method, headers, variables } = data;
  const encodedUrl = encodeURIComponent(btoa(url));

  let routeUrl = `/${method}/${encodedUrl}`;
  if (body) {
    let bodyWithoutVariables: string = body as string;
    if (variables) {
      Object.keys(variables).forEach(key => {
        bodyWithoutVariables = bodyWithoutVariables.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
      });
      const objectBody = JSON.parse(bodyWithoutVariables);
      objectBody.apiDogVariables = variables;
      bodyWithoutVariables = JSON.stringify(objectBody, null, 2);
    }
    const encodedBody = body ? encodeURIComponent(btoa(JSON.stringify(bodyWithoutVariables))) : '';
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
