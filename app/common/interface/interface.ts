export interface ResponseState {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  response: string;
  status: number;
  size: number;
  time: number;
}
