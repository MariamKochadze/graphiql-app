import Button from '@mui/material/Button';
import { SimpleUser } from '@store/userSlice';
import { useRouter } from 'navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface UserProps {
  user: SimpleUser | null;
  onSignOut: () => void;
  isSticky: boolean;
}

const AdaptiveMenu = ({ user, onSignOut, isSticky }: UserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('HomePage');
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/authentication');
  };

  return (
    <>
      <button className="md:hidden inline-flex" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            className="cursor-pointer group-data-[state=open]:hidden group-data-[state=closed]:block text-[#4D6AFF] lg:hidden visible"
          >
            <path
              fill="#4D6AFF"
              fillRule="evenodd"
              d="M25.667 25.25H15a1.25 1.25 0 1 1 0-2.5h10.667a1.25 1.25 0 0 1 0 2.5M5.75 16c0-.69.56-1.25 1.25-1.25h18.667a1.25 1.25 0 0 1 0 2.5H7c-.69 0-1.25-.56-1.25-1.25M13.75 8c0-.69.56-1.25 1.25-1.25h10.667a1.25 1.25 0 0 1 0 2.5H15c-.69 0-1.25-.56-1.25-1.25"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 12 12"
            className="text-lg cursor-pointer group-data-[state=open]:block group-data-[state=closed]:hidden text-[#4D6AFF]"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M9.534 10.948a1 1 0 1 0 1.414-1.414L7.413 5.999l3.535-3.535A1 1 0 1 0 9.534 1.05L5.999 4.585 2.463 1.049A1 1 0 1 0 1.05 2.463l3.536 3.536-3.536 3.536a1 1 0 1 0 1.414 1.414l3.536-3.536z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed top-[78px] right-0 left-0 shadow-shadow-overlay h-[40vh] bg-regal-white pt-10 z-30"
        >
          <ul className="flex justify-center flex-col items-center gap-4">
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
                    fullWidth
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
                    fullWidth
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
        </div>
      )}
    </>
  );
};

export default AdaptiveMenu;
