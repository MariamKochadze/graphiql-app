'use client';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewBody } from '../../store/features/response/responseSlice';
import { useTranslations } from 'next-intl';
export default function Body() {
  const dispatch = useAppDispatch();
  const t = useTranslations('RestClient');
  const { body } = useAppSelector(state => state.response);
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
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsBody')}</Typography>
      <textarea
        value={body || ''}
        style={{
          width: 'calc(100% - 30px)',
          padding: '10px',
          height: '250px',
          border: '1px solid var(--color-purple)',
          outline: 'none',
        }}
        onChange={e => dispatch(setNewBody(e.target.value))}
      ></textarea>
    </Box>
  );
}
