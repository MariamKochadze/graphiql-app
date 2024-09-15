import Button from '@mui/material/Button';
import { SimpleUser } from '@store/userSlice';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface UserProps {
  user: SimpleUser | null;
  onSignOut: () => void;
  isSticky: boolean;
}

const NavMenu = ({ onSignOut, user, isSticky }: UserProps) => {
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/authentication');
  };
  return (
    <nav className="md:flex hidden">
      <ul className="flex justify-between items-center gap-4">
        <li>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isSticky ? 'white' : '',
              color: isSticky ? '#1a66ff' : '',
              ':hover': {
                backgroundColor: isSticky ? '' : '#0a59a7',
                color: isSticky ? 'white' : '',
              },
            }}
            onClick={() => router.push('/')}
          >
            {t('main-page')}
          </Button>
        </li>
        {!user ? (
          <>
            <li>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: isSticky ? 'white' : '',
                  color: isSticky ? '#1a66ff' : '',
                  ':hover': {
                    backgroundColor: isSticky ? '' : '#0a59a7',
                    color: isSticky ? 'white' : '',
                  },
                }}
                onClick={handleButtonClick}
              >
                {t('sign-in')}
              </Button>
            </li>
            <li>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: isSticky ? 'white' : '',
                  color: isSticky ? '#1a66ff' : '',
                  ':hover': {
                    backgroundColor: isSticky ? '' : '#0a59a7',
                    color: isSticky ? 'white' : '',
                  },
                }}
                onClick={handleButtonClick}
              >
                {t('sign-up')}
              </Button>
            </li>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: isSticky ? 'white' : '',
              color: isSticky ? '#1a66ff' : '',
              ':hover': {
                backgroundColor: isSticky ? '' : '#0a59a7',
                color: isSticky ? 'white' : '',
              },
            }}
            onClick={onSignOut}
          >
            {t('sign-out')}
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
