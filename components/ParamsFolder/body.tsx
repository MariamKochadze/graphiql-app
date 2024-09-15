'use client';
import { base64Route } from '@components/Base64Route/Base64Route';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { setBodyType } from '@store/features/response/paramSlice';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setNewBody } from '../../store/features/response/responseSlice';
import JsonTextarea from './json';
export default function Body() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const t = useTranslations('RestClient');
  const { body, clientType } = useAppSelector(state => state.response);
  const { bodyType } = useAppSelector(state => state.params);
  const response = useAppSelector(state => state.response);
  const router = useRouter();

  function handleBlurBody() {
    const route = base64Route(response);
    const lang = pathname.split('/')[1];
    router.push(`/${lang}${route}`);
  }

  return (
    <Box
      sx={{
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderTop: '1px solid var(--color-gray)',
      }}
    >
      <Typography
        sx={{ color: 'var(--color-purple)' }}
      >{`${t('params')} ${clientType === 'graphql' ? t('query') : t('body')}`}</Typography>
      {clientType === 'rest' ? (
        <>
          <FormControl>
            <RadioGroup row value={bodyType} onChange={e => dispatch(setBodyType(e.target.value as 'json' | 'text'))}>
              <FormControlLabel value="json" control={<Radio />} label={t('json')} />
              <FormControlLabel value="text" control={<Radio />} label={t('text')} />
            </RadioGroup>
          </FormControl>
          {bodyType === 'text' && (
            <textarea
              value={(body as string) || ''}
              style={{
                width: 'calc(100% - 30px)',
                padding: '10px',
                height: '250px',
                border: '1px solid var(--color-purple)',
                outline: 'none',
              }}
              onChange={e => dispatch(setNewBody(e.target.value))}
              onBlur={handleBlurBody}
            ></textarea>
          )}
          {bodyType === 'json' && (
            <Box sx={{ height: '100%' }}>
              <JsonTextarea changeBlur={handleBlurBody} />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ height: '100%' }}>
          <JsonTextarea changeBlur={handleBlurBody} />
        </Box>
      )}
    </Box>
  );
}
