import Button from '@mui/material/Button';
import { SimpleUser } from '@store/userSlice';
import { useRouter } from 'navigation';
import { useTranslations } from 'next-intl';

interface UserProps {
  user: SimpleUser | null;
  onSignOut: () => void;
}

const NavMenu = ({ onSignOut, user }: UserProps) => {
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/authentication');
  };
  return (
    <nav className="md:flex hidden">
      <ul className="flex justify-between items-center gap-4">
        {!user ? (
          <>
            <li>
              <Button variant="contained" onClick={handleButtonClick}>
                {t('sign-in')}
              </Button>
            </li>
            <li>
              <Button variant="contained" onClick={handleButtonClick}>
                {t('sign-up')}
              </Button>
            </li>
          </>
        ) : (
          <Button variant="contained" onClick={onSignOut}>
            {t('sign-out')}
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
