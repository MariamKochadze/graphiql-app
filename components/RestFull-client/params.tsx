'use client';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Body from '../ParamsFolder/body';
import Headers from '../ParamsFolder/headers';
import english from './english.json';
import styles from './Restfull.module.scss';
export default function Params() {
  const [selectParam, setSelectParam] = useState<'Headers' | 'Body'>('Headers');
  return (
    <Box className={styles.params}>
      <Tabs
        value={selectParam}
        onChange={(_, value) => setSelectParam(value)}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="Body" label={english.params.body} />
        <Tab value="Headers" label={english.params.headers} />
      </Tabs>
      <div>
        {selectParam === 'Body' && <Body />}
        {selectParam === 'Headers' && <Headers />}
      </div>
    </Box>
  );
}
