export interface ResponseState {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  response: unknown;
  status: number;
  size: number;
  time: number;
  variables: Record<string, string>;
  urlSdl: string;
  clientType: 'rest' | 'graphql';
}
export interface ParamsState {
  openPage: 'Headers' | 'Body' | 'Variables';
  showVariables: boolean;
  bodyType: 'json' | 'text';
}
