'use client';
import english from '../english.json';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
import { setNewQuery, deleteQuery } from '../../../store/features/response/responseSlice';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
} from '@mui/material';
import { useRef } from 'react';
import styles from '../Restfull.module.scss';

export default function Query() {
  const { query } = useAppSelector(state => state.response);
  const inputKey = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

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
      <Typography sx={{ color: 'var(--color-purple)' }}>
        {english.params.query} {english.params.params}
      </Typography>
      <form onSubmit={setHeaders} className={styles['form-container']}>
        <input type="text" placeholder={english.key} ref={inputKey} required className={styles['input-text']} />
        <input type="text" placeholder={english.value} ref={inputValue} required className={styles['input-text']} />
        <Button
          variant="text"
          type="submit"
          sx={{ color: 'var(--color-purple)', border: '1px solid var(--color-purple)' }}
        >
          {english.buttonAdd}
        </Button>
      </form>
      {Object.keys(query).length !== 0 && (
        <div>
          <TableContainer sx={{ borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{english.key}</TableCell>
                  <TableCell>{english.value}</TableCell>
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
                        {english.buttonClear}
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
