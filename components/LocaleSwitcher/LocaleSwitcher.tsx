'use client';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { Link, usePathname } from '../../navigation';
interface LocaleSwitcherProps {
  isSticky: boolean;
}

export default function LocaleSwitcher({ isSticky }: LocaleSwitcherProps) {
  const localActive = useLocale();
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  // const isActive = path => path === pathname;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={isSticky ? 'border !border-light-blue rounded-full ' : 'border border-regal-blue rounded-full'}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: isSticky ? 'white' : '' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" className="mr-3">
          <path
            fill={isSticky ? '#00aaff' : '#7F85A3'}
            d="M7 1.313a5.687 5.687 0 1 0 0 11.374A5.687 5.687 0 0 0 7 1.313M5.558 9.188h2.884C8.148 10.19 7.656 11.094 7 11.806c-.656-.711-1.148-1.615-1.442-2.618m-.199-.876a7.969 7.969 0 0 1 0-2.624h3.282a7.97 7.97 0 0 1 0 2.625zM2.188 7c0-.444.06-.886.182-1.312h2.103c-.13.87-.13 1.754 0 2.625H2.37A4.791 4.791 0 0 1 2.187 7m6.254-2.187H5.558C5.852 3.81 6.344 2.906 7 2.193c.656.713 1.148 1.617 1.442 2.62m1.085.875h2.103a4.821 4.821 0 0 1 0 2.625H9.527c.13-.87.13-1.755 0-2.626m1.759-.875H9.348A7.787 7.787 0 0 0 8.24 2.352a4.833 4.833 0 0 1 3.046 2.46M5.76 2.352a7.787 7.787 0 0 0-1.108 2.46H2.714a4.833 4.833 0 0 1 3.046-2.46M2.714 9.188h1.938a7.786 7.786 0 0 0 1.108 2.46 4.831 4.831 0 0 1-3.046-2.46m5.526 2.46c.51-.75.885-1.582 1.108-2.46h1.938a4.833 4.833 0 0 1-3.046 2.46"
          ></path>
        </svg>
        {localActive === 'en' ? t('english-value') : t('russian-value')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={pathname} locale="en">
            {t('english-value')}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={pathname} locale="ru">
            {t('russian-value')}
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
