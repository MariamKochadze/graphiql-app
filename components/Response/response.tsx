'use client';

import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewResponse } from '../../store/features/response/responseSlice';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { selectUser } from '@store/selectors';
import { httpStatusDescriptions, httpColors } from '@app/common/constants';
import { removeBodyVariables } from '@components/Base64Route/BodyVariables';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { jsonTheme } from '@app/common/constants';

export default function Response({
  status,
  data,
  error,
  headers,
  url,
  method,
  body,
  submit,
  clientType,
  urlSdl = '',
}: {
  status: string | null | number;
  data: unknown | null;
  error: string | null;
  headers: Record<string, string>;
  url: string;
  method: string;
  body: string | null | undefined;
  submit: boolean;
  clientType: 'rest' | 'graphql';
  urlSdl: string;
}) {
  const user = useAppSelector(selectUser);
  const t = useTranslations('RestClient');
  const dispatch = useAppDispatch();
  const { bodyWithVariables, variables } = removeBodyVariables(body);
  const response = {
    status: parseInt(status as string) || 0,
    headers,
    url: url || '',
    method,
    body: bodyWithVariables !== '{}' && bodyWithVariables ? bodyWithVariables : '',
    response: '',
    size: 0,
    time: 0,
    variables,
    urlSdl: urlSdl || '',
    clientType,
  };

  const colorStatus: string = httpColors[response.status.toString()[0]];

  useEffect(() => {
    dispatch(setNewResponse(response));
  }, [dispatch, response]);

  return (
    user &&
    submit && (
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
            maxHeight: 500,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            border: '1px solid var(--color-gray)',
          }}
        >
          {error !== null ? (
            <CodeMirror readOnly theme={jsonTheme} value={JSON.stringify(error, null, 2)} extensions={[json()]} />
          ) : (
            <CodeMirror readOnly theme={jsonTheme} value={JSON.stringify(data, null, 2)} extensions={[json()]} />
          )}
        </Box>
      </Box>
    )
  );
}
