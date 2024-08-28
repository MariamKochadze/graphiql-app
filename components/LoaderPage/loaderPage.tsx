'use client';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoaderPage() {
  const router = useRouter();
  const t = useTranslations('LoaderPage');
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-3">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-color-gray"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-light-blue animate-spin"></div>
      </div>
      <Button variant="outlined" onClick={() => router.back()}>
        {t('cancel')}
      </Button>
    </div>
  );
}
