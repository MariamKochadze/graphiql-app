'use client';

import { ResponseState } from '@app/common/interface/interface';
import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { setNewResponse } from '../../store/features/response/responseSlice';
import { useEffect } from 'react';

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
  const dispatch = useAppDispatch();
  const response: ResponseState = {
    status: parseInt(status as string) || 0,
    headers,
    url,
    method,
    body: body || '',
    response: '',
    size: 0,
    time: 0,
    query: {},
  };

  useEffect(() => {
    dispatch(setNewResponse(response));
  }, [dispatch, response]);

  return (
    <Box
      sx={{
        borderTop: '1px solid var(--color-gray)',
      }}
    >
      <Grid container sx={{ padding: '0 20px' }}>
        <Grid item xs={6}>
          <Typography sx={{ color: 'var(--color-text)' }}>Response</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ color: 'var(--color-purple)' }}>Status: {status}</Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          height: 250,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '0 20px',
          border: '1px solid var(--color-gray)',
        }}
      >
        {error !== null ? <pre>{JSON.stringify(error, null, 2)}</pre> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Box>
    </Box>
  );
}
