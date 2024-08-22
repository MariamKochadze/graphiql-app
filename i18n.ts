import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'ru'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound(); // Ensure that notFound() is defined and imported
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
