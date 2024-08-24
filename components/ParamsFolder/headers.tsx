'use client';
import { HEADERS } from '@app/common/constants';
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
import { deleteNewHeaders, setNewHeaders } from '../../store/features/response/responseSlice';
import english from '../RestFull-client/english.json';
import styles from '../RestFull-client/Restfull.module.scss';

export default function Headers() {
  const { headers } = useAppSelector(state => state.response);
  const inputKey = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function setHeaders(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputKey.current && inputValue.current) {
      const key = inputKey.current.value;
      const value = inputValue.current.value;
      dispatch(setNewHeaders({ key, value }));
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
        {english.params.headers} {english.params.params}
      </Typography>
      <form onSubmit={setHeaders} className={styles['form-container']}>
        <input
          type="text"
          list="headers"
          placeholder={english.key}
          ref={inputKey}
          required
          className={styles['input-text']}
        />
        <datalist id="headers">
          {HEADERS.map(header => (
            <option key={header} value={header} />
          ))}
        </datalist>
        <input type="text" placeholder={english.value} ref={inputValue} required className={styles['input-text']} />
        <Button
          variant="text"
          type="submit"
          sx={{ color: 'var(--color-purple)', border: '1px solid var(--color-purple)' }}
        >
          {english.buttonAdd}
        </Button>
      </form>
      {Object.keys(headers).length !== 0 && (
        <div>
          <TableContainer
            sx={{ borderRadius: '10px', border: '1px solid var(--color-purple)', width: 'calc(100% - 2px)' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{english.key}</TableCell>
                  <TableCell>{english.value}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(headers).map(key => (
                  <TableRow key={key} sx={{ color: 'var(--color-purple)' }}>
                    <TableCell sx={{ color: 'var(--color-purple)' }}>{key}</TableCell>
                    <TableCell sx={{ color: 'var(--color-purple)' }}>{headers[key]}</TableCell>
                    <TableCell>
                      <Button sx={{ color: 'var(--color-purple)' }} onClick={() => dispatch(deleteNewHeaders(key))}>
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
