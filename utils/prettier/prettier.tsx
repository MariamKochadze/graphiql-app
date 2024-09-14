import { DocumentNode, parse, print } from 'graphql';

export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 4);
    }
  } catch (jsonError) {
    return prettifyGraphQLQuery(file);
  }

  return file;
}

const prettifyGraphQLQuery = (graphqlQuery: string): string => {
  try {
    const ast: DocumentNode = parse(graphqlQuery);
    const hasQueryKeyword = graphqlQuery.trim().startsWith('query');

    let prettifiedQuery = print(ast).trim();
    if (hasQueryKeyword && !prettifiedQuery.startsWith('query')) {
      prettifiedQuery = 'query ' + prettifiedQuery;
    }

    return prettifiedQuery;
  } catch (error) {
    return graphqlQuery;
  }
};
