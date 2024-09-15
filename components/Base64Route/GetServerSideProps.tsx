'use server';

import { ResponseState } from '@app/common/interface/interface';
import { addBodyVariables } from '@components/Base64Route/BodyVariables';

async function fetchSchema(sdlUrl: string) {
  const response = await fetch(sdlUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/graphql',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch schema');
  }

  const schema = await response.text();
  return schema;
}

async function handleGraphQLRequest(
  url: string,
  body: string,
  variables: Record<string, string>,
  headers: HeadersInit,
  urlSdl?: string
) {
  if (urlSdl) {
    await fetchSchema(urlSdl);
  }
  const graphqlBody = {
    query: body,
    variables,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(graphqlBody),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return { data, status: response.status };
}

async function handleRestfulRequest(
  url: string,
  body: string,
  method: string,
  variables: Record<string, string>,
  headers: HeadersInit
) {
  const restFullBody = addBodyVariables(body, variables);

  const response = await fetch(url, {
    method,
    body: body ? restFullBody : undefined,
    headers: {
      ...headers,
    },
  });
  const data = await response.json();
  return { data, status: response.status };
}

export async function getServerSideProps(response: ResponseState) {
  const { url, body, method, headers, clientType, variables, urlSdl } = response;

  try {
    const result =
      clientType === 'graphql'
        ? await handleGraphQLRequest(url, body, variables, headers, urlSdl)
        : await handleRestfulRequest(url, body, method, variables, headers);

    const { data, status } = result;

    if (status >= 400) {
      return { props: { data: null, status, error: data } };
    }

    return { props: { data, status, error: null } };
  } catch (error) {
    return { props: { data: null, status: 0, error: error.message || 'Error' } };
  }
}
