import { useTranslations } from 'next-intl';

const AboutCourse = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="lg:py-20 py-6">
      <div className="container">
        <h2 className=" text-center text-light-blue lg:text-4xl text-3xl font-semibold mb-5">
          {t('aboutCourseTitle')}
        </h2>
        <p className="text-center text-xl text-regal-gray">{t('aboutCourse')}</p>
      </div>
    </section>
  );
};

export default AboutCourse;
