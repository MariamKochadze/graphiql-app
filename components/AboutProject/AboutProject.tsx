import { useTranslations } from 'next-intl';

const AboutProject = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-center text-light-blue text-4xl font-semibold mb-5">{t('aboutProjectTitle')}</h2>
        <p className="text-center text-xl text-regal-gray">{t('aboutProject')}</p>
      </div>
    </section>
  );
};

export default AboutProject;
