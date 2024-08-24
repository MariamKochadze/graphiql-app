'use client';
import { METHODS } from '../../app/common/constants';
import styles from './Restfull.module.scss';
import { Button, Box, Select, MenuItem, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/useStoreHooks';
import english from './english.json';
import Image from 'next/image';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { setNewUrl, setNewMethod } from 'store/features/response/responseSlice';
import { useState } from 'react';
import { base64Route } from './RestfullRoute/Base64Route';
import { useRouter } from 'next/navigation';
export default function RestPage() {
  const { method, url } = useAppSelector(state => state.response);
  const { response } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const [inputMethod, setInputMethod] = useState<string>(method);
  const [inputUrl, setInputUrl] = useState<string>(url);
  const router = useRouter();

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setNewUrl(inputUrl || ''));
    dispatch(setNewMethod(inputMethod || ''));
    const data = {
      ...response,
      method: inputMethod,
      url: inputUrl,
    };
    const route = base64Route(data);
    router.push(route);
  }
  return (
    <Box className={styles.restful}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Image src="/svg/link.svg" alt="URL" width={30} height={30} />
        <Typography variant="body1">{url}</Typography>
      </Box>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles.container}>
          <Select
            defaultValue={method}
            name="method"
            value={inputMethod}
            onChange={e => setInputMethod(e.target.value)}
            id="select"
            sx={{
              width: '120px',
              borderRadius: '15px 0 0 15px',
              height: '40px',
              backgroundColor: 'var(--color-gray)',
            }}
          >
            {Object.keys(METHODS).map(key => (
              <MenuItem key={key} value={key} sx={{ color: 'var(--color-purple)' }}>
                {METHODS[key]}
              </MenuItem>
            ))}
          </Select>
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            required
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: '15px',
            paddingLeft: '30px',
            paddingRight: '30px',
            backgroundColor: `var(--color-purple)`,
            '&:hover': {
              backgroundColor: `var(--color-purple)`,
              opacity: 1,
            },
          }}
        >
          {english.buttonSend}
        </Button>
      </form>
    </Box>
  );
}
