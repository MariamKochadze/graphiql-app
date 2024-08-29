export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const HEADERS = [
  'Accept',
  'Accept-Encoding',
  'Authorization',
  'Content-Type',
  'User-Agent',
  'X-Requested-With',
  'X-Request-Id',
];

export const falsyValues = ['false', 'null', 'undefined', 'NaN', 'true', 'infinity'];

export const httpStatusDescriptions: { [key: string]: string } = {
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '204': 'No Content',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '304': 'Not Modified',
  '307': 'Temporary Redirect',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '429': 'Too Many Requests',
  '500': 'Internal Server Error',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '0': 'Unknown',
};

export const httpColors = {
  '1': '#1890ff',
  '2': '#52c41a',
  '3': '#faad14',
  '4': '#ff4d4f',
  '5': '#1976d2',
  '0': '#eaecf0',
};
