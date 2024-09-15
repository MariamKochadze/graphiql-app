'use client';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { METHODS } from '../../app/common/constants';
import { useAppSelector, useAppDispatch } from '../../hooks/useStoreHooks';
import { base64Route } from '../Base64Route/Base64Route';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { selectUser } from '@store/selectors';
import { useEffect } from 'react';
import { setNewHistory } from '@store/features/history/historySlice';
import { setNewResponse, setNewUrl } from '@store/features/response/responseSlice';
import { methodColors } from '../../app/common/constants';
import SDLInput from '@components/ParamsFolder/inputSDL';
import { getServerSideProps } from '@components/Base64Route/GetServerSideProps';
export default function InputEditor() {
  const dispatch = useAppDispatch();
  const t = useTranslations('RestClient');
  const { method, url, clientType, urlSdl } = useAppSelector(state => state.response);
  const { response } = useAppSelector(state => state);
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      const lang = pathname.split('/')[1];
      router.push(`/${lang}/authentication`);
    }
  }, [user, router]);

  function handleChangeMethod(e: React.ChangeEvent<HTMLInputElement>) {
    const responseNew = { ...response };
    responseNew.method = e.target.value;
    const route = base64Route(responseNew);
    const lang = pathname.split('/')[1];
    router.push(`/${lang}${route}`);
  }

  function handleBlurUrl(e: React.ChangeEvent<HTMLInputElement>) {
    const responseNew = { ...response };
    responseNew.url = e.target.value;
    const route = base64Route(responseNew);
    const lang = pathname.split('/')[1];
    router.push(`/${lang}${route}`);
  }

  function handleChangeSdl() {
    // write function onChange Sdl
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const route = base64Route(response);
    const lang = pathname.split('/')[1];
    const responseForHistory = { ...response };
    responseForHistory.response = '';
    responseForHistory.status = 0;
    dispatch(setNewHistory({ email: user?.email || '', response: responseForHistory }));
    const {
      props: { data, status, error },
    }: { props: { data: unknown; status: number; error: string | null } } = await getServerSideProps(response);
    dispatch(
      setNewResponse({
        response: data ? data : error,
        status,
      })
    );
    router.push(`/${lang}${route}`);
  }
  return user ? (
    <Box className="flex flex-col gap-2.5 w-full border-t border-neutral-200 pt-2.5 pb-5">
      <form className="flex flex-row gap-1 lg:10 md:gap-5 px-1 lg:px-5" onSubmit={submitForm}>
        <div className="w-full flex flex-row">
          {clientType === 'rest' && (
            <Select
              value={method}
              name="method"
              onChange={handleChangeMethod}
              id="select"
              sx={{
                width: '120px',
                borderRadius: '15px 0 0 15px',
                height: '40px',
                backgroundColor: 'var(--color-gray)',
                color: `${methodColors[method]}`,
              }}
            >
              {Object.keys(METHODS).map(key => (
                <MenuItem key={key} value={key} sx={{ color: `${methodColors[key]}` }}>
                  {METHODS[key]}
                </MenuItem>
              ))}
            </Select>
          )}
          <input
            type="text"
            name="url"
            value={url}
            placeholder="https://example.com"
            required
            autoComplete="on"
            onBlur={handleBlurUrl}
            onChange={e => dispatch(setNewUrl(e.target.value))}
            className="bg-color-gray border-color-gray outline-none px-1 w-full h-full rounded-r-2xl transition duration-300 hover:border-light-blue border-2 focus:bg-white focus:border-light-blue focus:shadow-md focus:shadow-blue-500 focus:bg-body-bg"
          />
        </div>
        <Button type="submit" variant="contained" className="px-1.5 lg:px-10 rounded-lg">
          {t('send')}
        </Button>
      </form>
      {clientType === 'graphql' && <SDLInput onChange={handleChangeSdl} value={urlSdl} />}
    </Box>
  ) : (
    <Box>Redirecting...</Box>
  );
}
