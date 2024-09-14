import { addBodyVariables } from './BodyVariables';
import { expect, it, describe } from 'vitest';

describe('BodyVariables Component', () => {
  it('renders BodyVariables component correctly', async () => {
    const body = {
      title: '{{hello}}',
      body: '{{world}}',
    };
    const variables = { hello: 'world', world: 'hello' };
    const result = addBodyVariables(JSON.stringify(body), variables);
    const bodyWithVariables = addBodyVariables(JSON.stringify(body), variables);
    expect(bodyWithVariables).toEqual(result);
  });

  it('renders BodyVariables component correctly', async () => {
    const body = {
      '{{world}}': '{{hello}}',
      '{{hello}}': '{{world}}',
    };
    const variables = { hello: 'world', world: 'hello' };
    const result = addBodyVariables(JSON.stringify(body), variables);
    const bodyWithVariables = addBodyVariables(JSON.stringify(body), variables);
    expect(bodyWithVariables).toEqual(result);
  });
});
