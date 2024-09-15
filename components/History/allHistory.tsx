import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@hooks/useStoreHooks';
import { base64Route } from '@components/Base64Route/Base64Route';
import { usePathname } from 'next/navigation';
import { methodColors } from '@app/common/constants';
import { useRouter } from 'next/navigation';
import { ResponseState } from '@app/common/interface/interface';
import { setNewResponse } from '@store/features/response/responseSlice';
import { selectUser } from '@store/selectors';

export default function AllHistory() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  const history = useAppSelector(state => state.history);
  const t = useTranslations('History');
  const dispatch = useAppDispatch();

  function handleClick(item: ResponseState) {
    const lang = pathname.split('/')[1];
    const route = base64Route(item);
    dispatch(setNewResponse(item));
    router.push(`/${lang}${route}`);
  }
  return (
    <Box className="flex flex-col gap-2.5 items-center w-full border-t border-neutral-200 pt-2.5 pb-5">
      <h3 className="text-center my-10 leading-[60px] lg:text-4xl text-2xl lg:whitespace-pre whitespace-break-spaces text-secondary-blue font-semibold">
        {t('historyRequest')}
      </h3>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="font-bold text-color-blue">
              {t('method')}
            </TableCell>
            <TableCell align="center" className="font-bold text-color-blue">
              {t('url')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user &&
            history[user.email as string]
              .map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ color: methodColors[item.method] }}>
                      {item.method}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="text-color-blue no-underline cursor-pointer hover:text-secondary-blue hover:shadow-secondary-blue hover:shadow-md hover:underline"
                        key={index}
                        onClick={() => handleClick(item)}
                      >
                        {item.url}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
              .reverse()}
        </TableBody>
      </Table>
    </Box>
  );
}
