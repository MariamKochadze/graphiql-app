'use client';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Body from '../ParamsFolder/body';
import Headers from '../ParamsFolder/headers';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@hooks/useStoreHooks';
import { selectUser } from '@store/selectors';
import VariablesSection from '../ParamsFolder/variables';
export default function Params() {
  const user = useAppSelector(selectUser);
  const t = useTranslations('RestClient');
  const [selectParam, setSelectParam] = useState<'Headers' | 'Body' | 'Variables'>('Headers');
  return (
    user && (
      <Box className="w-full px-2 lg:px-5 border border-color-gray">
        <Tabs value={selectParam} onChange={(_, value) => setSelectParam(value)}>
          <Tab value="Body" label={t('body')} />
          <Tab value="Headers" label={t('headers')} />
          <Tab value="Variables" label={t('variables')} />
        </Tabs>
        <div>
          {selectParam === 'Body' && <Body />}
          {selectParam === 'Headers' && <Headers />}
          {selectParam === 'Variables' && <VariablesSection />}
        </div>
      </Box>
    )
  );
}
