'use client';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface LocaleSwitcherProps {
  isSticky: boolean;
}

export default function LocaleSwitcher({ isSticky }: LocaleSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const [active, setActive] = useState(localActive);
  const t = useTranslations('HomePage');

  const onSelectChange = (e: SelectChangeEvent<HTMLSelectElement>) => {
    setActive(e.target.value as string);
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id="locale-select-label"
          sx={{
            color: isSticky ? '#0385e1' : 'gray',
          }}
        >
          {t('switcher-label')}
        </InputLabel>
        <Select
          labelId="locale-select-label"
          id="locale-select"
          value={active}
          onChange={onSelectChange}
          disabled={isPending}
          label="Language"
          sx={{
            backgroundColor: isSticky ? 'white' : 'white', // Change dropdown color when scrolled
            transition: 'background-color 0.3s',
            color: isSticky ? '#1976d2' : 'gray',
          }}
        >
          <MenuItem value="en">{t('english-value')}</MenuItem>
          <MenuItem value="ru">{t('russian-value')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
