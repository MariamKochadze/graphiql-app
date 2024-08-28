'use client';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewBody } from '../../store/features/response/responseSlice';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import JsonTextarea from './json';
export default function Body() {
  const dispatch = useAppDispatch();
  const t = useTranslations('RestClient');
  const { body } = useAppSelector(state => state.response);
  const [radio, setRadio] = useState('json');

  return (
    <Box
      sx={{
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderTop: '1px solid var(--color-gray)',
      }}
    >
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsBody')}</Typography>
      <FormControl>
        <RadioGroup row value={radio} onChange={e => setRadio(e.target.value)}>
          <FormControlLabel value="json" control={<Radio />} label={t('json')} />
          <FormControlLabel value="text" control={<Radio />} label={t('text')} />
        </RadioGroup>
      </FormControl>
      {radio === 'text' && (
        <textarea
          value={(body as string) || ''}
          style={{
            width: 'calc(100% - 30px)',
            padding: '10px',
            height: '250px',
            border: '1px solid var(--color-purple)',
            outline: 'none',
          }}
          onChange={e => dispatch(setNewBody(e.target.value))}
        ></textarea>
      )}
      {radio === 'json' && (
        <Box sx={{ height: '100%' }}>
          <JsonTextarea />
        </Box>
      )}
    </Box>
  );
}
