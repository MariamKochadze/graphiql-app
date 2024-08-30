'use client';
import {
  Box,
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
import { useRef, useState } from 'react';
import { deleteVariable, setNewVariable } from '../../store/features/response/responseSlice';
import { useTranslations } from 'next-intl';
import { falsyValues } from '@app/common/constants';

export default function Headers() {
  const [showVariables, setShowVariables] = useState(false);
  const t = useTranslations('RestClient');
  const { variables } = useAppSelector(state => state.response);
  const inputKey = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function setHeaders(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputKey.current && inputValue.current) {
      let key: string = inputKey.current.value;
      let value: string = inputValue.current.value;
      if (!parseFloat(value) && (!value.startsWith('"') || !value.endsWith('"')) && !falsyValues.includes(value)) {
        if (!value.startsWith('"')) {
          value = `"${value}`;
        }
        if (!value.endsWith('"')) {
          value = `${value}"`;
        }
      }

      key = key.replace(new RegExp(' ', 'g'), '_');
      dispatch(setNewVariable({ key, value }));
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
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsVariables')}</Typography>
      <form onSubmit={setHeaders} className="flex flex-row w-full">
        <input
          type="text"
          list="headers"
          placeholder={t('variable')}
          ref={inputKey}
          required
          className="outline-none w-full h-10 border border-gray-400 px-5 transition duration-300 bg-gray-400 focus:border-purple-500 focus:bg-white hover:border-purple-500"
        />
        <input
          type="text"
          placeholder={t('value')}
          ref={inputValue}
          required
          className="outline-none w-full h-10 border border-gray-400 px-5 transition duration-300 bg-gray-400 focus:border-purple-500 focus:bg-white hover:border-purple-500"
        />
        <Button
          variant="text"
          type="submit"
          sx={{ color: 'var(--color-purple)', border: '1px solid var(--color-purple)', width: '250px' }}
        >
          {t('addHeader')}
        </Button>
      </form>
      <div className="flex row mx-2 items-center">
        <Switch id="showVariables" checked={showVariables} onChange={e => setShowVariables(e.target.checked)} />
        <label htmlFor="showVariables">{t('showVariables')}</label>
      </div>
      {Object.keys(variables).length !== 0 && showVariables && (
        <div>
          <TableContainer
            sx={{ borderRadius: '10px', border: '1px solid var(--color-purple)', width: 'calc(100% - 2px)' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('variable')}</TableCell>
                  <TableCell>{t('value')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(variables)
                  .map(key => (
                    <TableRow key={key} sx={{ color: 'var(--color-purple)' }}>
                      <TableCell sx={{ color: 'var(--color-purple)' }}>{key}</TableCell>
                      <TableCell sx={{ color: 'var(--color-purple)' }}>{variables[key]}</TableCell>
                      <TableCell>
                        <Button sx={{ color: 'var(--color-purple)' }} onClick={() => dispatch(deleteVariable(key))}>
                          {t('clear')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Box>
  );
}
