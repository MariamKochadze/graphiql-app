export interface ResponseState {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | unknown;
  response: string;
  status: number;
  size: number;
  time: number;
  variables: Record<string, string>;
  urlSdl: string;
  clientType: 'rest' | 'graphql';
}

export interface RequestHistory extends ResponseState {
  date: Date;
}
export interface ParamsState {
  openPage: 'Headers' | 'Body' | 'Variables';
  showVariables: boolean;
  bodyType: 'json' | 'text';
}
