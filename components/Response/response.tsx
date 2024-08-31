'use client';

import { ResponseState } from '@app/common/interface/interface';
import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewResponse } from '../../store/features/response/responseSlice';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { selectUser } from '@store/selectors';
import { Controlled as JsonTextarea } from 'react-codemirror2';
import { httpStatusDescriptions, httpColors } from '@app/common/constants';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript';

export default function Response({
  status,
  data,
  error,
  headers,
  url,
  method,
  body,
}: {
  status: string | null | number;
  data: unknown | null;
  error: string | null;
  headers: Record<string, string>;
  url: string;
  method: string;
  body: string | null | undefined;
}) {
  const user = useAppSelector(selectUser);
  const t = useTranslations('RestClient');
  const dispatch = useAppDispatch();
  let variables: Record<string, string> = {};
  let bodyWithVariables: string = '';
  const objBody = body ? (JSON.parse(body) as Record<string, unknown>) : undefined;
  if (objBody && objBody['apiDogVariables']) {
    variables = objBody['apiDogVariables'] as Record<string, string>;
    delete objBody['apiDogVariables'];
    bodyWithVariables = JSON.stringify(objBody, null, 2);
    Object.entries(variables).forEach(([key, value]) => {
      bodyWithVariables = bodyWithVariables.replace(new RegExp(`${value}`, 'g'), `{{${key}}}`);
    });
  } else {
    bodyWithVariables = JSON.stringify(objBody, null, 2);
  }
  const response: ResponseState = {
    status: parseInt(status as string) || 0,
    headers,
    url,
    method,
    body: bodyWithVariables || '',
    response: '',
    size: 0,
    time: 0,
    variables,
  };

  const options = {
    mode: { name: 'javascript', json: true },
    theme: 'neat',
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: true,
    readOnly: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  };
  const colorStatus: string = httpColors[response.status.toString()[0]];

  useEffect(() => {
    dispatch(setNewResponse(response));
  }, [dispatch, response]);

  return (
    user && (
      <Box
        sx={{
          borderTop: '1px solid var(--color-gray)',
        }}
      >
        <Grid container sx={{ padding: '5px 20px' }}>
          <Grid item xs={5}>
            <Typography sx={{ color: 'var(--color-text)' }}>{t('response')}</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              <span className="text-color-blue">
                {t('status')}
                {': '}
              </span>
              <span
                style={{
                  color: colorStatus,
                  border: `1px solid ${colorStatus || 'black'}`,
                  padding: '5px 15px',
                  borderRadius: '5px',
                  backgroundColor: `${colorStatus || '#000000'}20`,
                }}
              >
                {response.status} {httpStatusDescriptions[response.status.toString()] || 'Unknown'}
              </span>
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            height: 300,
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            border: '1px solid var(--color-gray)',
          }}
        >
          {error !== null ? (
            <JsonTextarea
              value={JSON.stringify(error, null, 2)}
              options={options}
              onBeforeChange={(editor, data, value) => {
                editor.setValue(JSON.stringify(value, null, 2));
              }}
            />
          ) : (
            <JsonTextarea
              value={JSON.stringify(data, null, 2)}
              options={options}
              onBeforeChange={(editor, data, value) => {
                editor.setValue(JSON.stringify(value, null, 2));
              }}
            />
          )}
        </Box>
      </Box>
    )
  );
}
