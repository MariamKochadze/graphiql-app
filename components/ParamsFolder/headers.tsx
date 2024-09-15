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
import { useAppSelector, useAppDispatch } from '../../hooks/useStoreHooks';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { base64Route } from '@components/Base64Route/Base64Route';
import { usePathname } from 'next/navigation';
import { setNewResponse } from '@store/features/response/responseSlice';

export default function Headers() {
  const dispatch = useAppDispatch();
  const [editInput, setEditInput] = useState({ key: '', edit: false });
  const [error, setError] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('RestClient');
  const { headers } = useAppSelector(state => state.response);
  const response = useAppSelector(state => state.response);
  const [inputKey, setInputKey] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  function setHeaders(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputKey && inputValue) {
      const key = inputKey;
      const value = inputValue;
      const headerNew = { ...headers };
      if (editInput.edit) {
        delete headerNew[editInput.key];
        setEditInput({ key: '', edit: false });
      }
      if (!headerNew[key]) {
        headerNew[key] = value;
        setInputKey('');
        setInputValue('');
        const responseNew = { ...response };
        responseNew.headers = headerNew;
        const route = base64Route(responseNew);
        const lang = pathname.split('/')[1];
        dispatch(
          setNewResponse({
            headers: headerNew,
          })
        );
        router.push(`/${lang}${route}`);
        setError('');
      } else {
        setError(`${key} ${t('keyExist')}`);
      }
    }
  }
  function handleEditHeaders(key: string) {
    setInputKey(key);
    setInputValue(headers[key]);
    setEditInput({ key, edit: true });
  }

  function handleDeleteHeader(key: string) {
    const headerNew = { ...headers };
    delete headerNew[key];
    const responseNew = { ...response };
    responseNew.headers = headerNew;
    dispatch(
      setNewResponse({
        headers: headerNew,
      })
    );
    const route = base64Route(responseNew);
    const lang = pathname.split('/')[1];
    router.push(`/${lang}${route}`);
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
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsHeaders')}</Typography>
      <form onSubmit={setHeaders} className="flex flex-row w-full relative pb-10">
        <input
          type="text"
          list="headers"
          placeholder={t('key')}
          value={inputKey}
          onChange={e => setInputKey(e.target.value)}
          required
          className="outline-none w-full h-10 border border-gray-400 px-5 transition duration-300 bg-gray-400 focus:border-purple-500 focus:bg-white hover:border-purple-500"
        />
        <datalist id="headers">
          {HEADERS.map(header => (
            <option key={header} value={header} />
          ))}
        </datalist>
        <input
          type="text"
          placeholder={t('value')}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          required
          className="outline-none w-full h-10 border border-gray-400 px-5 transition duration-300 bg-gray-400 focus:border-purple-500 focus:bg-white hover:border-purple-500"
        />
        <Button
          variant="text"
          type="submit"
          sx={{ color: 'var(--color-purple)', border: '1px solid var(--color-purple)', width: '250px' }}
        >
          {editInput.edit ? t('edit') : t('addHeader')}
        </Button>
        <p className="w-full text-color-red size-4 text-center absolute bottom-5">{error ? error : ''}</p>
      </form>
      {Object.keys(headers).length !== 0 && (
        <div>
          <TableContainer
            sx={{ borderRadius: '10px', border: '1px solid var(--color-purple)', width: 'calc(100% - 2px)' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('key')}</TableCell>
                  <TableCell>{t('value')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(headers)
                  .map(key => (
                    <TableRow key={key} sx={{ color: 'var(--color-purple)' }}>
                      <TableCell sx={{ color: 'var(--color-purple)' }}>
                        <input
                          className="focus:outline-none hover:outline-none w-full h-full hover:border-t-light-blue hover:rounded-md"
                          type="text"
                          value={key}
                          readOnly
                        />
                      </TableCell>
                      <TableCell sx={{ color: 'var(--color-purple)' }}>
                        <input
                          className="focus:outline-none hover:outline-none w-full h-full hover:border-t-light-blue hover:rounded-md"
                          type="text"
                          value={headers[key]}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Button sx={{ color: 'var(--color-purple)' }} onClick={() => handleDeleteHeader(key)}>
                          {t('clear')}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ color: 'var(--color-purple)' }}
                          onClick={() => handleEditHeaders(key)}
                        >
                          {t('edit')}
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
