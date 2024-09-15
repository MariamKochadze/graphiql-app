import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LocaleSwitcher from './LocaleSwitcher';
import english from '../../messages/en.json';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next-intl')),
    useTranslations: (key: string) => (value: string) => english[key][value],
    useLocale: () => ({ locale: 'en' }),
  };
});

vi.mock('../../navigation', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next/navigation')),
    usePathname: () => '/en/history',
  };
});

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next-intl')),
    useTranslations: (key: string) => (value: string) => english[key][value],
  };
});

const messages = {
  en: english,
  ru: english,
};

describe('LocaleSwitcher Component', async () => {
  it('renders LocaleSwitcher component correctly', async () => {
    render(
      <NextIntlClientProvider messages={messages} locale={'en'}>
        <LocaleSwitcher isSticky={false} />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByTestId('locale-switcher'));
    expect(screen.getByTestId('locale-switcher-en')).toHaveTextContent('English');
    expect(screen.getByTestId('locale-switcher-ru')).toHaveTextContent('Russian');
  });
});
