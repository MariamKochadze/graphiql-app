'use client';
import { useState } from 'react';
import english from './english.json';
import { Box } from '@mui/material';
import Body from './Params/body';
import Headers from './Params/headers';
import Query from './Params/query';
import styles from './Restfull.module.scss';
export default function Params() {
  const [selectParam, setSelectParam] = useState<'Headers' | 'Body' | 'Query'>('Query');
  return (
    <Box className={styles.params}>
      <ul className={styles['no-bullets']}>
        <li className={selectParam === 'Query' ? styles['li-active'] : styles.li}>
          <span onClick={() => setSelectParam('Query')}>{english.params.query}</span>
        </li>
        <li className={selectParam === 'Body' ? styles['li-active'] : styles.li}>
          <span onClick={() => setSelectParam('Body')}>{english.params.body}</span>
        </li>
        <li className={selectParam === 'Headers' ? styles['li-active'] : styles.li}>
          <span onClick={() => setSelectParam('Headers')}>{english.params.headers}</span>
        </li>
      </ul>
      <div>
        {selectParam === 'Query' && <Query />}
        {selectParam === 'Body' && <Body />}
        {selectParam === 'Headers' && <Headers />}
      </div>
    </Box>
  );
}
