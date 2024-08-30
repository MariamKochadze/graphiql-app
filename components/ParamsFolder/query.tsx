'use client';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
import { useRef } from 'react';
import { deleteQuery, setNewQuery } from '../../store/features/response/responseSlice';
import { useTranslations } from 'next-intl';
export default function Query() {
  const { query } = useAppSelector(state => state.response);
  const inputKey = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const t = useTranslations('RestClient');

  function setHeaders(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputKey.current && inputValue.current) {
      const key = inputKey.current.value;
      const value = inputValue.current.value;
      dispatch(setNewQuery({ key, value }));
      inputKey.current.value = '';
      inputValue.current.value = '';
    }
  }

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
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsQuery')}</Typography>
      <form onSubmit={setHeaders} className="flex flex-row gap-10">
        <input type="text" placeholder={t('key')} ref={inputKey} required />
        <input type="text" placeholder={t('value')} ref={inputValue} required />
        <Button
          variant="text"
          type="submit"
          sx={{ color: 'var(--color-purple)', border: '1px solid var(--color-purple)' }}
        >
          {t('addQuery')}
        </Button>
      </form>
      {Object.keys(query).length !== 0 && (
        <div>
          <TableContainer sx={{ borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('key')}</TableCell>
                  <TableCell>{t('value')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(query).map(key => (
                  <TableRow key={key} sx={{ color: 'var(--color-purple)' }}>
                    <TableCell sx={{ color: 'var(--color-purple)' }}>{key}</TableCell>
                    <TableCell sx={{ color: 'var(--color-purple)' }}>{query[key]}</TableCell>
                    <TableCell>
                      <Button sx={{ color: 'var(--color-purple)' }} onClick={() => dispatch(deleteQuery(key))}>
                        {t('clear')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Box>
  );
}
