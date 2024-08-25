'use client';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { setNewMethod, setNewUrl } from 'store/features/response/responseSlice';
import { METHODS } from '../../app/common/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { base64Route } from '../Base64Route/Base64Route';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { selectUser } from '@store/selectors';
import { useEffect } from 'react';
export default function RestPage() {
  const t = useTranslations('RestClient');
  const { method, url } = useAppSelector(state => state.response);
  const { response } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      const lang = pathname.split('/')[1];
      router.push(`/${lang}/authentication`);
    }
  }, [user, router]);

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const route = base64Route(response);
    const lang = pathname.split('/')[1];
    router.push(`/${lang}${route}`);
  }
  return user ? (
    <Box className="flex flex-col gap-2.5 w-full border-t border-neutral-200 pt-2.5 pb-5">
      <form className="flex flex-row gap-10 pl-5 pr-5" onSubmit={submitForm}>
        <div className="w-full flex flex-row">
          <Select
            value={method}
            name="method"
            onChange={e => dispatch(setNewMethod(e.target.value))}
            id="select"
            sx={{
              width: '120px',
              borderRadius: '15px 0 0 15px',
              height: '40px',
              backgroundColor: 'var(--color-gray)',
            }}
          >
            {Object.keys(METHODS).map(key => (
              <MenuItem key={key} value={key}>
                {METHODS[key]}
              </MenuItem>
            ))}
          </Select>
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            required
            value={url}
            onChange={e => dispatch(setNewUrl(e.target.value))}
            className="outline-none border border-secondary-blue w-full px-5 transition duration-300 rounded-r-[15px] bg-neutral-200 focus:border-secondary-blue focus:bg-white hover:border-secondary-blue"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: '15px',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        >
          {t('send')}
        </Button>
      </form>
    </Box>
  ) : (
    <Box>Redirecting...</Box>
  );
}
