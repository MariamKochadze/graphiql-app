import { describe, it, expect } from 'vitest';
import { convertToPrettier } from './prettier';

describe('convertToPrettier', () => {
  it('should prettify valid JSON', () => {
    const jsonInput = '{"name":"Victoria","age":25}';
    const expectedOutput = `{
    "name": "Victoria",
    "age": 25
}`;
    const result = convertToPrettier(jsonInput);
    expect(result).toBe(expectedOutput);
  });

  it('should prettify valid GraphQL query', () => {
    const gqlInput = 'query { user { id name } }';
    const expectedOutput = `query {
  user {
    id
    name
  }
}`;
    const result = convertToPrettier(gqlInput);
    expect(result).toBe(expectedOutput);
  });

  it('should add "query" keyword to the prettified GraphQL query if missing', () => {
    const gqlInput = '{ user { id name } }';
    const expectedOutput = convertToPrettier(gqlInput);
    const result = convertToPrettier(gqlInput);
    expect(result).toBe(expectedOutput);
  });
  it('should return the input as is if it cannot be parsed as JSON or GraphQL', () => {
    const invalidInput = 'invalid string';
    const result = convertToPrettier(invalidInput);
    expect(result).toBe(invalidInput);
  });
});
