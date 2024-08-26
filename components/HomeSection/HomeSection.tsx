'use client';
import { Button } from '@mui/material';
import { useAppSelector } from 'hooks/useStoreHooks';
import { useTranslations } from 'next-intl';
import { selectUser } from 'store/selectors';
import { Link } from '../../navigation';

const HomeSection = () => {
  const t = useTranslations('HomePage');
  const user = useAppSelector(selectUser);

  return (
    <section className="lg:py-20 py-6">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-center my-10 leading-[60px] lg:text-6xl text-4xl lg:whitespace-pre whitespace-break-spaces text-secondary-blue font-semibold">
            {!user?.displayName ? `${t('welcome')}!` : `${t('welcome-back')}, ${user?.displayName}!`}
          </h2>
          <div className="flex justify-center lg:flex-nowrap flex-wrap gap-5">
            {!user ? (
              <>
                <Link href="/authentication">
                  <Button variant="contained">{t('sign-in')}</Button>
                </Link>
                <Link href="/authentication">
                  <Button variant="outlined">{t('sign-up')}</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/restClient">
                  <Button variant="contained">{t('rest-client')}</Button>
                </Link>
                <Link href="/graphiqlClient">
                  <Button variant="outlined">{t('graphiql-client')}</Button>
                </Link>
                <Link href="/history">
                  <Button variant="outlined">{t('history')}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <h1 className="text-center lg:leading-[60px] leading-10 lg:text-6xl text-4xl lg:whitespace-pre whitespace-break-spaces text-regal-blue font-semibold">
          {t('title')}
        </h1>
      </div>
    </section>
  );
};

export default HomeSection;
