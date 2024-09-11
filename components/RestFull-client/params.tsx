'use client';
import { Box, Tab, Tabs } from '@mui/material';
import Body from '../ParamsFolder/body';
import Headers from '../ParamsFolder/headers';
import { useTranslations } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@hooks/useStoreHooks';
import { setOpenParams } from '@store/features/response/paramSlice';
import { selectUser } from '@store/selectors';
import VariablesSection from '../ParamsFolder/variables';
export default function Params() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const response = useAppSelector(state => state.response);
  const t = useTranslations('RestClient');
  const { openPage } = useAppSelector(state => state.params);
  return (
    user && (
      <Box className="w-full px-2 md:pb-6 lg:pb-0 pb-8 lg:px-5 border border-color-gray">
        <Tabs data-testid="params-tabs" value={openPage} onChange={(_, value) => dispatch(setOpenParams(value))}>
          <Tab
            value="Body"
            label={t('body')}
            className={
              response.body
                ? "after:content-[''] after:block after:w-2 after:h-2 after:bg-color-green after:absolute after:top-1 after:right-1 after:rounded-full"
                : ''
            }
          />
          <Tab
            value="Headers"
            label={`${t('headers')}${Object.keys(response.headers).length ? ` (${Object.keys(response.headers).length})` : ''}`}
            className={
              Object.keys(response.headers).length
                ? "after:content-[''] after:block after:w-2 after:h-2 after:bg-color-green after:absolute after:top-1 after:right-1 after:rounded-full"
                : ''
            }
          />
          <Tab
            value="Variables"
            label={`${t('variables')}${Object.keys(response.variables).length ? ` (${Object.keys(response.variables).length})` : ''}`}
            className={
              Object.keys(response.variables).length
                ? "after:content-[''] after:block after:w-2 after:h-2 after:bg-color-green after:absolute after:top-1 after:right-1 after:rounded-full"
                : ''
            }
          />
        </Tabs>
        <div>
          {openPage === 'Body' && <Body />}
          {openPage === 'Headers' && <Headers />}
          {openPage === 'Variables' && <VariablesSection />}
        </div>
      </Box>
    )
  );
}
