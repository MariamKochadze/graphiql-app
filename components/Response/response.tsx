'use client';

import { httpColors, httpStatusDescriptions, jsonTheme } from '@app/common/constants';
import { json } from '@codemirror/lang-json';
import { Box, Grid, Typography } from '@mui/material';
import { selectUser } from '@store/selectors';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewResponse } from '../../store/features/response/responseSlice';

export default function Response({
  headers,
  url,
  method,
  body,
  clientType,
}: {
  headers: Record<string, string>;
  url: string;
  method: string;
  body: string | null | undefined;
  clientType: 'rest' | 'graphql';
}) {
  const user = useAppSelector(selectUser);
  const response = useAppSelector(state => state.response);
  const t = useTranslations('RestClient');
  const dispatch = useAppDispatch();
  const responseUpdate = {
    headers,
    url,
    method,
    body: body || '',
    clientType,
  };

  const colorStatus: string = httpColors[response.status.toString()[0]];

  useEffect(() => {
    dispatch(setNewResponse(responseUpdate));
  }, [response.response]);

  return (
    user &&
    response.response && (
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
          <CodeMirror
            className="min-h-full"
            readOnly
            theme={jsonTheme}
            value={JSON.stringify(response.response, null, 2)}
            extensions={[json()]}
          />
        </Box>
      </Box>
    )
  );
}
