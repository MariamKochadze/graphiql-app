import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
const HomeSection = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-center my-10 leading-[60px] text-6xl whitespace-pre text-secondary-blue font-semibold">
            {t('welcome')}
          </h2>
          <div className="flex justify-center gap-5">
            <Link href="/authentication">
              <Button variant="contained">{t('sign-in')}</Button>
            </Link>
            <Link href="/authentication">
              <Button variant="outlined">{t('sign-up')}</Button>
            </Link>
          </div>
        </div>
        <h1 className="text-center leading-[60px] text-6xl whitespace-pre text-regal-blue font-semibold">
          {t('title')}
        </h1>
      </div>
    </section>
  );
};

export default HomeSection;
