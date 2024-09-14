'use client';
import Logo from '@components/icons/Logo';
import LocaleSwitcher from '@components/LocaleSwitcher/LocaleSwitcher';
import { setUser, SimpleUser } from '@store/userSlice';
import { getCurrentUser, signOutUser } from '@utils/firebase/firebase.utils';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { Link } from '../../navigation';
import { selectUser } from '../../store/selectors/index';
import AdaptiveMenu from './AdaptiveMenu/AdaptiveMenu';
import NavMenu from './NavMenu/NavMenu';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(setUser(null));
    toast.success('Successfully signed out');
  };

  useEffect(() => {
    getCurrentUser().then(user => {
      let simpleUser: SimpleUser | null = null;

      if (user) {
        simpleUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
      }

      dispatch(setUser(simpleUser));
    });
  }, [dispatch]);
  return (
    <header
      data-testid="header"
      className={`sticky top-0 w-full z-40 transition-all duration-500  py-5  ${
        isSticky ? 'bg-regal-blue h-20 shadow-md mb-20 z-40' : ' h-24 '
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Logo isSticky={isSticky} />
        </Link>
        <LocaleSwitcher isSticky={isSticky} />
        <NavMenu isSticky={isSticky} user={user} onSignOut={handleSignOut} />
        <AdaptiveMenu isSticky={isSticky} user={user} onSignOut={handleSignOut} />
      </div>
    </header>
  );
};
