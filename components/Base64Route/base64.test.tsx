import { ResponseState } from '@app/common/interface/interface';
import { base64Route, decodeBase64 } from './Base64Route';

describe('base64Route', () => {
  it('creates route with method, url, body, and headers', () => {
    const data: ResponseState = {
      url: 'https://example.com',
      body: { key: 'value' },
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      clientType: 'rest',
      status: 200,
      size: 0,
      time: 0,
      response: '',
      urlSdl: '',
      variables: {},
    };

    const route = base64Route(data);
    expect(route).toContain('/GET/');
    expect(route).toContain(encodeURIComponent(btoa('https://example.com')));
    expect(route).toContain(encodeURIComponent(btoa(JSON.stringify(data.body))));
    expect(route).toContain('Content-Type=application%2Fjson');
  });

  it('uses "default" when no URL is provided', () => {
    const data: ResponseState = {
      url: '',
      body: { key: 'value' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      clientType: 'rest',
      status: 200,
      size: 0,
      time: 0,
      response: '',
      urlSdl: '',
      variables: {},
    };

    const route = base64Route(data);
    expect(route).toContain(encodeURIComponent(btoa('default')));
    expect(route).toContain(encodeURIComponent(btoa(JSON.stringify(data.body))));
  });

  it('handles no body', () => {
    const data: ResponseState = {
      url: 'https://example.com',
      body: null,
      method: 'DELETE',
      headers: { Authorization: 'Bearer token' },
      clientType: 'rest',
      status: 200,
      size: 0,
      time: 0,
      response: '',
      urlSdl: '',
      variables: {},
    };

    const route = base64Route(data);

    expect(route).toContain('/DELETE/');
    expect(route).not.toContain(btoa('null'));
    expect(route).toContain('/DELETE/aHR0cHM6Ly9leGFtcGxlLmNvbQ%3D%3D?Authorization=Bearer+token');
  });

  it('handles GraphQL clientType', () => {
    const data: ResponseState = {
      url: 'https://example.com/graphql',
      body: { query: '{ users { id name } }' },
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      clientType: 'graphql',
      status: 200,
      size: 0,
      time: 0,
      response: '',
      urlSdl: '',
      variables: {},
    };

    const route = base64Route(data);
    expect(route).toContain('/GRAPHQL/');
  });
});

describe('decodeBase64', () => {
  it('decodes base64 URL and body', () => {
    const params = {
      method: 'GET',
      base64: encodeURIComponent(btoa('https://example.com')),
      body: encodeURIComponent(btoa(JSON.stringify({ key: 'value' }))),
    };

    const { url, body } = decodeBase64({ params });

    expect(url).toBe('https://example.com');
    expect(body).toEqual({ key: 'value' });
  });

  it('handles default URL', () => {
    const params = {
      method: 'POST',
      base64: encodeURIComponent(btoa('default')),
      body: encodeURIComponent(btoa(JSON.stringify({ key: 'value' }))),
    };

    const { url, body } = decodeBase64({ params });

    expect(url).toBe('');
    expect(body).toEqual({ key: 'value' });
  });

  it('handles missing body', () => {
    const params = {
      method: 'DELETE',
      base64: encodeURIComponent(btoa('https://example.com')),
    };

    const { url, body } = decodeBase64({ params });

    expect(url).toBe('https://example.com');
    expect(body).toBeUndefined();
  });
});
