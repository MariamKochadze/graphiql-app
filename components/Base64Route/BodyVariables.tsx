export function addBodyVariables(body: unknown, variables: Record<string, string>) {
  // only for restfull
  let bodyWithVariables: string = body as string;
  if (variables && body) {
    Object.keys(variables).forEach(key => {
      bodyWithVariables = bodyWithVariables.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
    });
    const objectBody = JSON.parse(bodyWithVariables);
    bodyWithVariables = JSON.stringify(objectBody, null, 2);
  }
  return bodyWithVariables;
}
