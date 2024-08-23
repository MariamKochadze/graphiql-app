'use client';
import { METHODS } from '../../app/common/constants';
import styles from './Restfull.module.scss';
import { Button, Box, Select, MenuItem } from '@mui/material';
import { useAppSelector } from '../../hooks/useStoreHooks';
import english from './english.json';
import Image from 'next/image';
// import { useAppDispatch } from '../../hooks/useStoreHooks';
// import { setNewUrl } from 'store/features/response/responseSlice';
import { useState } from 'react';
export default function RestPage() {
  const { method, url } = useAppSelector(state => state.response);
  const [value, setValue] = useState(url);
  // const dispatch = useAppDispatch();
  return (
    <Box className={styles.restful}>
      <div>
        <Image src="/svg/link.svg" alt="URL" className={styles.img} width={20} height={20} /> {value}
      </div>
      <form className={styles.form}>
        <div className={styles.container}>
          <Select
            defaultValue={method}
            name="method"
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
            value={value}
            onChange={e => setValue(e.target.value)}
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
