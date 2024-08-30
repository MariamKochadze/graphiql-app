'use client';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Body from '../ParamsFolder/body';
import Headers from '../ParamsFolder/headers';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@hooks/useStoreHooks';
import { selectUser } from '@store/selectors';
export default function Params() {
  const user = useAppSelector(selectUser);
  const t = useTranslations('RestClient');
  const [selectParam, setSelectParam] = useState<'Headers' | 'Body'>('Headers');
  return (
    user && (
      <Box className="w-full px-5 border-t border-r border-l border-color-gray">
        <Tabs value={selectParam} onChange={(_, value) => setSelectParam(value)}>
          <Tab value="Body" label={t('body')} />
          <Tab value="Headers" label={t('headers')} />
        </Tabs>
        <div>
          {selectParam === 'Body' && <Body />}
          {selectParam === 'Headers' && <Headers />}
        </div>
      </Box>
    )
  );
}
