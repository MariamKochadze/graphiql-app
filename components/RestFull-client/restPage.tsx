'use client';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setNewMethod, setNewUrl } from 'store/features/response/responseSlice';
import { METHODS } from '../../app/common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { base64Route } from '../Base64Route/Base64Route';
import english from './english.json';
import styles from './Restfull.module.scss';
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
