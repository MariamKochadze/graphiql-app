export function addBodyVariables(body: unknown, variables: Record<string, string>) {
  let bodyWithoutVariables: string = body as string;
  const initialBody = body as string;
  if (variables) {
    Object.keys(variables).forEach(key => {
      bodyWithoutVariables = bodyWithoutVariables.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
    });
    const objectBody = JSON.parse(bodyWithoutVariables);
    objectBody.apiDogVariables = variables;
    objectBody.apiDogBody = initialBody;
    bodyWithoutVariables = JSON.stringify(objectBody, null, 2);
  }
  return bodyWithoutVariables;
}

export function removeBodyVariables(body: unknown) {
  let variables: Record<string, string> = {};
  let bodyWithVariables: string = '';
  const objBody = body ? (JSON.parse(body as string) as Record<string, unknown>) : undefined;
  if (objBody && objBody['apiDogVariables'] && objBody['apiDogBody']) {
    variables = objBody['apiDogVariables'] as Record<string, string>;
    const initialBody = objBody['apiDogBody'] as string;
    bodyWithVariables = initialBody;
  } else {
    bodyWithVariables = JSON.stringify(objBody, null, 2);
  }

  return { bodyWithVariables, variables };
}
