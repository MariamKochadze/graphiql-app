import { githubLightInit } from '@uiw/codemirror-theme-github';
import { tags as t } from '@lezer/highlight';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT',
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

export const methodColors = {
  GET: '#28a745',
  PUT: '#007bff',
  POST: '#fd7e14',
  DELETE: '#dc3545',
  PATCH: '#6f42c1',
  HEAD: '#20c997',
  OPTIONS: '#ffc107',
  TRACE: '#6c757d',
  CONNECT: '#343a40',
};

export const jsonTheme = githubLightInit({
  settings: {
    caret: '#c0c0c0',
    fontFamily: 'monospace',
    lineHighlight: '#fafafa',
    background: '#ffffff',
    gutterBackground: '#fdfdfd',
    gutterBorder: '1px solid #e0e0e0',
  },
  styles: [
    { tag: t.keyword, color: '#e53935' },
    { tag: t.string, color: '#43a047' },
    { tag: t.number, color: '#1e88e5' },
    { tag: t.punctuation, color: '#757575' },
    { tag: t.comment, color: '#bdbdbd' },
    { tag: t.logicOperator, color: '#8e24aa' },
    { tag: t.link, color: '#1e88e5' },
    { tag: t.bool, color: '#757575' },
  ],
});
