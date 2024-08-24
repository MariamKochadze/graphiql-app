'use client';
import english from '../english.json';
import { Box, Typography } from '@mui/material';

export default function Body() {
  return (
    <Box
      sx={{
        height: 250,
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderTop: '1px solid var(--color-gray)',
      }}
    >
      <Typography sx={{ color: 'var(--color-purple)' }}>
        {english.params.body} {english.params.params}
      </Typography>
    </Box>
  );
}
