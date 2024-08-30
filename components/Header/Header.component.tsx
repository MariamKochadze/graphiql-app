'use client';
import LocaleSwitcher from '@components/LocaleSwitcher/LocaleSwitcher';
import { setUser } from '@store/userSlice';
import { onAuthStateChangedListener, signOutUser } from '@utils/firebase/firebase.utils';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
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
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <header
      data-testid="header"
      className={isSticky ? 'scrolled py-5 bg-regal-blue sticky top-0 left-0 mb-20 z-40' : ' py-5'}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="109" height="32" fill="none">
            <path
              fill="url(#logo-text_svg__a)"
              d="m23.7 21.727-.48-.479-.09-.082a10.247 10.247 0 0 0-7.144-2.899c-2.67 0-5.233 1.04-7.144 2.9l-.062.06-.474.48-1.015 1.013a3.09 3.09 0 0 1-2.196.917 3.1 3.1 0 0 1-2.189-.904 3.083 3.083 0 0 1 0-4.366l2.189-2.184-2.162-2.149a3.086 3.086 0 0 1-.027-4.393 3.1 3.1 0 0 1 4.378 0l1.585 1.58a10.254 10.254 0 0 0 7.145 2.897c2.669 0 5.232-1.04 7.144-2.897a.321.321 0 0 1 .069-.068l.898-.904.598-.588a3.06 3.06 0 0 1 2.182-.904 3.1 3.1 0 0 1 2.188.904 3.083 3.083 0 0 1 .669 3.376 3.04 3.04 0 0 1-.688 1.004l-2.169 2.163 2.169 2.163A3.064 3.064 0 0 1 30 20.57c0 .818-.326 1.603-.907 2.182a3.093 3.093 0 0 1-4.371 0l-1.029-1.026z"
            ></path>
            <path
              fill="url(#logo-text_svg__b)"
              d="M21.548 2.233c.376.155.717.383 1.004.67a3.083 3.083 0 0 1-.007 4.36l-2.189 2.183-.055.048a6.185 6.185 0 0 1-8.633 0l-.055-.048-2.19-2.183a3.083 3.083 0 0 1 .014-4.353 3.093 3.093 0 0 1 4.365-.007l2.19 2.183 2.182-2.183A3.096 3.096 0 0 1 20.363 2c.407-.001.81.078 1.185.233"
            ></path>
            <path
              fill="url(#logo-text_svg__c)"
              d="M10.434 29.767a3.082 3.082 0 0 1-1.004-.67 3.083 3.083 0 0 1 .007-4.36l2.19-2.184.054-.047a6.185 6.185 0 0 1 8.634 0l.055.047 2.189 2.184a3.083 3.083 0 0 1-.014 4.353 3.093 3.093 0 0 1-4.365.007l-2.189-2.184-2.182 2.184a3.095 3.095 0 0 1-2.19.903 3.086 3.086 0 0 1-1.185-.233"
            ></path>
            <mask id="logo-text_svg__d" width="72" height="23" x="37" y="6" fill="#000" maskUnits="userSpaceOnUse">
              <path fill="#fff" d="M37 6h72v23H37z"></path>
              <path d="M47.14 19.656h-5.782l-.994 2.862H38l4.947-14.027h2.623l4.947 14.027h-2.384zm-.636-1.874-2.245-6.51-2.265 6.51zM54.934 13.046c.384-.51.907-.94 1.57-1.29.662-.35 1.41-.524 2.244-.524.954 0 1.822.242 2.603.726.795.47 1.418 1.135 1.868 1.995.45.86.675 1.847.675 2.963 0 1.115-.225 2.116-.675 3.002a5.158 5.158 0 0 1-1.868 2.056 4.847 4.847 0 0 1-2.603.726c-.834 0-1.576-.168-2.225-.504-.649-.35-1.179-.78-1.59-1.29v6.893H52.67V11.414h2.265zm6.656 3.87c0-.766-.16-1.425-.477-1.976-.305-.564-.715-.987-1.232-1.27a3.162 3.162 0 0 0-1.63-.443c-.569 0-1.112.148-1.629.444-.503.295-.914.725-1.231 1.29-.305.564-.457 1.229-.457 1.995s.152 1.438.457 2.015c.317.564.728.994 1.231 1.29.517.296 1.06.443 1.63.443.582 0 1.125-.147 1.629-.443.517-.309.927-.752 1.232-1.33.318-.578.477-1.25.477-2.015M67.287 9.942c-.41 0-.755-.14-1.034-.423a1.434 1.434 0 0 1-.417-1.048c0-.416.14-.766.418-1.048A1.393 1.393 0 0 1 67.287 7c.397 0 .735.141 1.013.423.278.282.417.632.417 1.048 0 .417-.139.766-.417 1.048a1.37 1.37 0 0 1-1.013.423m1.112 1.472v11.104h-2.265V11.414zM70.618 16.916c0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.984 4.984 0 0 1 2.643-.726 4.92 4.92 0 0 1 2.106.484c.702.309 1.258.726 1.669 1.25V7.605h2.285v14.913h-2.285v-1.672c-.37.537-.887.98-1.55 1.33-.649.349-1.397.524-2.245.524a4.948 4.948 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002m8.961.04c0-.766-.159-1.431-.477-1.995-.305-.565-.709-.995-1.212-1.29a3.162 3.162 0 0 0-1.63-.444c-.582 0-1.125.148-1.628.444-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33.516.296 1.06.443 1.629.443.583 0 1.126-.147 1.63-.443.502-.296.906-.726 1.211-1.29.318-.578.477-1.25.477-2.015M89.588 22.7c-1.034 0-1.967-.235-2.802-.706a5.193 5.193 0 0 1-1.967-2.015c-.477-.873-.715-1.881-.715-3.023 0-1.129.245-2.13.735-3.003a5.114 5.114 0 0 1 2.007-2.015c.847-.47 1.794-.706 2.841-.706 1.046 0 1.993.235 2.841.706a5.114 5.114 0 0 1 2.007 2.015c.49.873.735 1.874.735 3.003 0 1.128-.252 2.13-.755 3.003a5.313 5.313 0 0 1-2.066 2.035c-.861.47-1.815.706-2.861.706m0-1.996c.582 0 1.126-.14 1.629-.423.517-.282.934-.705 1.252-1.27.318-.564.477-1.249.477-2.055s-.153-1.485-.457-2.036c-.305-.564-.71-.987-1.213-1.27a3.277 3.277 0 0 0-1.629-.423c-.583 0-1.126.141-1.629.424-.49.282-.88.705-1.172 1.27-.292.55-.437 1.229-.437 2.035 0 1.196.298 2.123.894 2.781.609.645 1.37.967 2.285.967M101.92 11.232c.848 0 1.596.175 2.245.524.663.336 1.179.76 1.55 1.27v-1.612H108V22.7c0 1.02-.212 1.928-.636 2.72a4.597 4.597 0 0 1-1.848 1.895c-.794.457-1.748.685-2.861.685-1.483 0-2.715-.356-3.695-1.068-.98-.699-1.537-1.653-1.67-2.862h2.246c.172.578.536 1.041 1.093 1.39.569.363 1.245.545 2.026.545.914 0 1.649-.282 2.206-.847.569-.564.854-1.384.854-2.458v-1.854c-.384.523-.907.967-1.57 1.33-.649.349-1.39.524-2.225.524a4.947 4.947 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002 0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.947 4.947 0 0 1 2.623-.726m3.795 5.724c0-.766-.159-1.431-.477-1.995-.304-.565-.708-.995-1.212-1.29a3.16 3.16 0 0 0-1.629-.444 3.16 3.16 0 0 0-1.629.444c-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33a3.229 3.229 0 0 0 1.629.443 3.16 3.16 0 0 0 1.629-.443c.504-.296.908-.726 1.212-1.29.318-.578.477-1.25.477-2.015"></path>
            </mask>
            <path
              fill={isSticky ? 'white' : '#2F3659'}
              d="M47.14 19.656h-5.782l-.994 2.862H38l4.947-14.027h2.623l4.947 14.027h-2.384zm-.636-1.874-2.245-6.51-2.265 6.51zM54.934 13.046c.384-.51.907-.94 1.57-1.29.662-.35 1.41-.524 2.244-.524.954 0 1.822.242 2.603.726.795.47 1.418 1.135 1.868 1.995.45.86.675 1.847.675 2.963 0 1.115-.225 2.116-.675 3.002a5.158 5.158 0 0 1-1.868 2.056 4.847 4.847 0 0 1-2.603.726c-.834 0-1.576-.168-2.225-.504-.649-.35-1.179-.78-1.59-1.29v6.893H52.67V11.414h2.265zm6.656 3.87c0-.766-.16-1.425-.477-1.976-.305-.564-.715-.987-1.232-1.27a3.162 3.162 0 0 0-1.63-.443c-.569 0-1.112.148-1.629.444-.503.295-.914.725-1.231 1.29-.305.564-.457 1.229-.457 1.995s.152 1.438.457 2.015c.317.564.728.994 1.231 1.29.517.296 1.06.443 1.63.443.582 0 1.125-.147 1.629-.443.517-.309.927-.752 1.232-1.33.318-.578.477-1.25.477-2.015M67.287 9.942c-.41 0-.755-.14-1.034-.423a1.434 1.434 0 0 1-.417-1.048c0-.416.14-.766.418-1.048A1.393 1.393 0 0 1 67.287 7c.397 0 .735.141 1.013.423.278.282.417.632.417 1.048 0 .417-.139.766-.417 1.048a1.37 1.37 0 0 1-1.013.423m1.112 1.472v11.104h-2.265V11.414zM70.618 16.916c0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.984 4.984 0 0 1 2.643-.726 4.92 4.92 0 0 1 2.106.484c.702.309 1.258.726 1.669 1.25V7.605h2.285v14.913h-2.285v-1.672c-.37.537-.887.98-1.55 1.33-.649.349-1.397.524-2.245.524a4.948 4.948 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002m8.961.04c0-.766-.159-1.431-.477-1.995-.305-.565-.709-.995-1.212-1.29a3.162 3.162 0 0 0-1.63-.444c-.582 0-1.125.148-1.628.444-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33.516.296 1.06.443 1.629.443.583 0 1.126-.147 1.63-.443.502-.296.906-.726 1.211-1.29.318-.578.477-1.25.477-2.015M89.588 22.7c-1.034 0-1.967-.235-2.802-.706a5.193 5.193 0 0 1-1.967-2.015c-.477-.873-.715-1.881-.715-3.023 0-1.129.245-2.13.735-3.003a5.114 5.114 0 0 1 2.007-2.015c.847-.47 1.794-.706 2.841-.706 1.046 0 1.993.235 2.841.706a5.114 5.114 0 0 1 2.007 2.015c.49.873.735 1.874.735 3.003 0 1.128-.252 2.13-.755 3.003a5.313 5.313 0 0 1-2.066 2.035c-.861.47-1.815.706-2.861.706m0-1.996c.582 0 1.126-.14 1.629-.423.517-.282.934-.705 1.252-1.27.318-.564.477-1.249.477-2.055s-.153-1.485-.457-2.036c-.305-.564-.71-.987-1.213-1.27a3.277 3.277 0 0 0-1.629-.423c-.583 0-1.126.141-1.629.424-.49.282-.88.705-1.172 1.27-.292.55-.437 1.229-.437 2.035 0 1.196.298 2.123.894 2.781.609.645 1.37.967 2.285.967M101.92 11.232c.848 0 1.596.175 2.245.524.663.336 1.179.76 1.55 1.27v-1.612H108V22.7c0 1.02-.212 1.928-.636 2.72a4.597 4.597 0 0 1-1.848 1.895c-.794.457-1.748.685-2.861.685-1.483 0-2.715-.356-3.695-1.068-.98-.699-1.537-1.653-1.67-2.862h2.246c.172.578.536 1.041 1.093 1.39.569.363 1.245.545 2.026.545.914 0 1.649-.282 2.206-.847.569-.564.854-1.384.854-2.458v-1.854c-.384.523-.907.967-1.57 1.33-.649.349-1.39.524-2.225.524a4.947 4.947 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002 0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.947 4.947 0 0 1 2.623-.726m3.795 5.724c0-.766-.159-1.431-.477-1.995-.304-.565-.708-.995-1.212-1.29a3.16 3.16 0 0 0-1.629-.444 3.16 3.16 0 0 0-1.629.444c-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33a3.229 3.229 0 0 0 1.629.443 3.16 3.16 0 0 0 1.629-.443c.504-.296.908-.726 1.212-1.29.318-.578.477-1.25.477-2.015"
            ></path>
            <path
              stroke="#2F3659"
              strokeWidth="0.4"
              d="M47.14 19.656h-5.782l-.994 2.862H38l4.947-14.027h2.623l4.947 14.027h-2.384zm-.636-1.874-2.245-6.51-2.265 6.51zM54.934 13.046c.384-.51.907-.94 1.57-1.29.662-.35 1.41-.524 2.244-.524.954 0 1.822.242 2.603.726.795.47 1.418 1.135 1.868 1.995.45.86.675 1.847.675 2.963 0 1.115-.225 2.116-.675 3.002a5.158 5.158 0 0 1-1.868 2.056 4.847 4.847 0 0 1-2.603.726c-.834 0-1.576-.168-2.225-.504-.649-.35-1.179-.78-1.59-1.29v6.893H52.67V11.414h2.265zm6.656 3.87c0-.766-.16-1.425-.477-1.976-.305-.564-.715-.987-1.232-1.27a3.162 3.162 0 0 0-1.63-.443c-.569 0-1.112.148-1.629.444-.503.295-.914.725-1.231 1.29-.305.564-.457 1.229-.457 1.995s.152 1.438.457 2.015c.317.564.728.994 1.231 1.29.517.296 1.06.443 1.63.443.582 0 1.125-.147 1.629-.443.517-.309.927-.752 1.232-1.33.318-.578.477-1.25.477-2.015ZM67.287 9.942c-.41 0-.755-.14-1.034-.423a1.434 1.434 0 0 1-.417-1.048c0-.416.14-.766.418-1.048A1.393 1.393 0 0 1 67.287 7c.397 0 .735.141 1.013.423.278.282.417.632.417 1.048 0 .417-.139.766-.417 1.048a1.37 1.37 0 0 1-1.013.423Zm1.112 1.472v11.104h-2.265V11.414zM70.618 16.916c0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.984 4.984 0 0 1 2.643-.726 4.92 4.92 0 0 1 2.106.484c.702.309 1.258.726 1.669 1.25V7.605h2.285v14.913h-2.285v-1.672c-.37.537-.887.98-1.55 1.33-.649.349-1.397.524-2.245.524a4.948 4.948 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002Zm8.961.04c0-.766-.159-1.431-.477-1.995-.305-.565-.709-.995-1.212-1.29a3.162 3.162 0 0 0-1.63-.444c-.582 0-1.125.148-1.628.444-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33.516.296 1.06.443 1.629.443.583 0 1.126-.147 1.63-.443.502-.296.906-.726 1.211-1.29.318-.578.477-1.25.477-2.015ZM89.588 22.7c-1.034 0-1.967-.235-2.802-.706a5.193 5.193 0 0 1-1.967-2.015c-.477-.873-.715-1.881-.715-3.023 0-1.129.245-2.13.735-3.003a5.114 5.114 0 0 1 2.007-2.015c.847-.47 1.794-.706 2.841-.706 1.046 0 1.993.235 2.841.706a5.114 5.114 0 0 1 2.007 2.015c.49.873.735 1.874.735 3.003 0 1.128-.252 2.13-.755 3.003a5.313 5.313 0 0 1-2.066 2.035c-.861.47-1.815.706-2.861.706Zm0-1.996c.582 0 1.126-.14 1.629-.423.517-.282.934-.705 1.252-1.27.318-.564.477-1.249.477-2.055s-.153-1.485-.457-2.036c-.305-.564-.71-.987-1.213-1.27a3.277 3.277 0 0 0-1.629-.423c-.583 0-1.126.141-1.629.424-.49.282-.88.705-1.172 1.27-.292.55-.437 1.229-.437 2.035 0 1.196.298 2.123.894 2.781.609.645 1.37.967 2.285.967ZM101.92 11.232c.848 0 1.596.175 2.245.524.663.336 1.179.76 1.55 1.27v-1.612H108V22.7c0 1.02-.212 1.928-.636 2.72a4.597 4.597 0 0 1-1.848 1.895c-.794.457-1.748.685-2.861.685-1.483 0-2.715-.356-3.695-1.068-.98-.699-1.537-1.653-1.67-2.862h2.246c.172.578.536 1.041 1.093 1.39.569.363 1.245.545 2.026.545.914 0 1.649-.282 2.206-.847.569-.564.854-1.384.854-2.458v-1.854c-.384.523-.907.967-1.57 1.33-.649.349-1.39.524-2.225.524a4.947 4.947 0 0 1-2.623-.726c-.781-.497-1.404-1.182-1.867-2.056-.45-.886-.676-1.887-.676-3.002 0-1.116.225-2.103.676-2.963.463-.86 1.086-1.525 1.867-1.995a4.947 4.947 0 0 1 2.623-.726Zm3.795 5.724c0-.766-.159-1.431-.477-1.995-.304-.565-.708-.995-1.212-1.29a3.16 3.16 0 0 0-1.629-.444 3.16 3.16 0 0 0-1.629.444c-.504.282-.914.705-1.232 1.27-.305.55-.457 1.209-.457 1.975 0 .765.152 1.437.457 2.015.318.578.728 1.021 1.232 1.33a3.229 3.229 0 0 0 1.629.443 3.16 3.16 0 0 0 1.629-.443c.504-.296.908-.726 1.212-1.29.318-.578.477-1.25.477-2.015Z"
              mask="url(#logo-text_svg__d)"
            ></path>
            <defs>
              <linearGradient
                id="logo-text_svg__a"
                x1="2"
                x2="30"
                y1="8.999"
                y2="23.875"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3BF"></stop>
                <stop offset="1" stopColor="#33F"></stop>
              </linearGradient>
              <linearGradient
                id="logo-text_svg__b"
                x1="23.875"
                x2="7.687"
                y1="11.625"
                y2="1.562"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#99C2FF"></stop>
                <stop offset="1" stopColor="#EBF3FF"></stop>
              </linearGradient>
              <linearGradient
                id="logo-text_svg__c"
                x1="15.983"
                x2="12.062"
                y1="30"
                y2="21.25"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#99C2FF"></stop>
                <stop offset="1" stopColor="#EBF3FF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </Link>
        <LocaleSwitcher isSticky={isSticky} />
        <NavMenu user={user} onSignOut={handleSignOut} />
        <AdaptiveMenu user={user} onSignOut={handleSignOut} />
      </div>
    </header>
  );
};
