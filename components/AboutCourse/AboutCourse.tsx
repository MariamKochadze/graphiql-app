import { useTranslations } from 'next-intl';

const AboutCourse = () => {
  const t = useTranslations('HomePage');
  return (
    <section className="py-20">
      <div className="container">
        <h2 className=" text-center text-light-blue text-4xl font-semibold mb-5">{t('aboutCourseTitle')}</h2>
        <p className="text-center text-xl text-regal-gray">{t('aboutCourse')}</p>
      </div>
    </section>
  );
};

export default AboutCourse;
