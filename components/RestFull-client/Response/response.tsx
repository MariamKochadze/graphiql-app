'use client';

import { Box, Grid, Typography } from '@mui/material';

export default function Response({
  status,
  data,
  error,
}: {
  status: string | null | number;
  data: unknown | null;
  error: string | null;
}) {
  return (
    <Box
      sx={{
        borderTop: '1px solid var(--color-gray)',
        padding: '0 20px',
      }}
    >
      <Grid container>
        <Grid item xs={3}>
          <Typography sx={{ color: 'var(--color-text)' }}>Response</Typography>
        </Grid>
        <Grid item xs={3}>
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
          border: '1px solid var(--color-gray)',
        }}
      >
        {error !== null ? <pre>{JSON.stringify(error, null, 2)}</pre> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </Box>
    </Box>
  );
}
