'use server';

import { ResponseState } from '@app/common/interface/interface';
import { addBodyVariables } from '@components/Base64Route/BodyVariables';

export async function getServerSideProps(response: ResponseState) {
  const { url, body, method, headers, clientType, variables } = response;
  const qraphiqlBody = {
    query: body,
    variables,
  };
  // you can make two function for restfull and qraphql
  // TODO: change code For SDL response
  const restFullBody = addBodyVariables(body, variables);
  try {
    const response = await fetch(url, {
      method: clientType === 'graphql' ? 'POST' : method,
      body: body ? (clientType === 'graphql' ? JSON.stringify(qraphiqlBody) : restFullBody) : undefined,
      headers: {
        ...headers,
      },
    });
    try {
      const data = (await response.json()) || null;
      const status = response.status;
      if (!response.ok) {
        return { props: { data: null, status, error: data } };
      }
      // here can be Added response for documentation
      return { props: { data, status, error: null } };
    } catch (error) {
      return { props: { data: null, status: response.status, error: response.statusText || 'Error' } };
    }
  } catch (error) {
    return { props: { data: null, status: 0, error: error.message || 'Error' } };
  }
}
