import { useTranslations } from 'next-intl';

const AboutProject = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="lg:py-20 py-10">
      <div className="container">
        <h2 className="text-center text-light-blue lg:text-4xl text-3xl font-semibold mb-5">
          {t('aboutProjectTitle')}
        </h2>
        <p className="text-center text-xl text-regal-gray">{t('aboutProject')}</p>
      </div>
    </section>
  );
};

export default AboutProject;
