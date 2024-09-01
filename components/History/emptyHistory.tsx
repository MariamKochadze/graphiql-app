import { useTranslations } from 'next-intl';
import { Button, Box } from '@mui/material';
import Link from 'next/link';
export default function EmptyHistory() {
  const t = useTranslations('History');
  return (
    <Box className="flex flex-col gap-2.5 w-full border-t border-neutral-200 pt-2.5 pb-5 bg-gradient-to-b from-light-bg-blue from-5% to-body-bg to-95%">
      <h3 className="text-center my-10 leading-[60px] lg:text-4xl text-2xl lg:whitespace-pre whitespace-break-spaces text-secondary-blue font-semibold">
        {t('noHistory')}
      </h3>
      <div className="flex justify-center lg:flex-nowrap flex-wrap gap-5">
        <Link href="restfull-client">
          <Button variant="contained">{t('rest-client')}</Button>
        </Link>
        <Link href="graphiqlClient">
          <Button variant="outlined">{t('graphiql-client')}</Button>
        </Link>
      </div>
    </Box>
  );
}
