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
import { useAppSelector, useAppDispatch } from '../../hooks/useStoreHooks';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { falsyValues } from '@app/common/constants';
import { base64Route } from '@components/Base64Route/Base64Route';
import { useRouter, usePathname } from 'next/navigation';
import { setShowVariables } from '@store/features/response/paramSlice';

export default function Variables() {
  const [editInput, setEditInput] = useState({ key: '', edit: false });
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { showVariables } = useAppSelector(state => state.params);
  const t = useTranslations('RestClient');
  const { variables } = useAppSelector(state => state.response);
  const inputKey = useRef<HTMLInputElement>(null);
  const inputValue = useRef<HTMLInputElement>(null);
  const response = useAppSelector(state => state.response);

  function setVariables(e: React.FormEvent<HTMLFormElement>) {
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
      const variableNew = { ...variables };
      if (editInput.edit) {
        delete variableNew[editInput.key];
        setEditInput({ key: '', edit: false });
      }
      if (!variableNew[key]) {
        variableNew[key] = value;
        const responseNew = { ...response };
        responseNew.variables = variableNew;
        const route = base64Route(responseNew);
        const lang = pathname.split('/')[1];
        router.push(`/${lang}${route}`);
        setError('');
      } else {
        setError(`${key} ${t('variableExist')}`);
      }
    }
  }

  function handleEditVariable(key: string) {
    (inputKey.current as HTMLInputElement).value = key;
    (inputValue.current as HTMLInputElement).value = variables[key];
    setEditInput({ key, edit: true });
  }

  function handleDeleteVariable(key: string) {
    const variableNew = { ...variables };
    delete variableNew[key];
    const responseNew = { ...response };
    responseNew.variables = variableNew;
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
      <Typography sx={{ color: 'var(--color-purple)' }}>{t('paramsVariables')}</Typography>
      <form onSubmit={setVariables} className="flex flex-row w-full relative pb-5">
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
          {editInput.edit ? t('edit') : t('addHeader')}
        </Button>
        <p className="w-full text-color-red size-4 text-center absolute bottom-0">{error ? error : ''}</p>
      </form>
      <div className="flex row mx-2 items-center">
        <Switch
          id="showVariables"
          checked={showVariables}
          onChange={e => dispatch(setShowVariables(e.target.checked))}
        />
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
                          value={variables[key]}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Button sx={{ color: 'var(--color-purple)' }} onClick={() => handleDeleteVariable(key)}>
                          {t('clear')}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ color: 'var(--color-purple)' }}
                          onClick={() => handleEditVariable(key)}
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
