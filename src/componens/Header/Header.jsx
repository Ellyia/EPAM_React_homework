import { useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';

import styles from './Header.module.css';

const Header = ({ userName, isLoggedIn }) => {
  let navigate = useNavigate();

  const callbackFunc = useCallback((e, url) => {
    e.preventDefault();

    localStorage.clear(); //
    navigate(url);
  }, []);

  const addCallbackHandler = useCallback((url) => {
    return function (e) {
      callbackFunc(e, url);
    };
  }, []);

  // let isLoggedIn = !!localStorage.getItem('result');

  // let userName = localStorage.getItem('userName');

  // const func = () => {
  //   if (!isLoggedIn) {
  //     return {
  //       display: 'none',
  //     };
  //   } else {
  //     return {
  //       display: 'block',
  //     };
  //   }
  // };

  // let res = func();
  // console.log(res);
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div className={styles.flex}>
          {isLoggedIn && (
            <>
              <div className={styles.marginRight}>{userName}</div>
              <Button
                text='Logout'
                callbackFunc={addCallbackHandler('/login')}
              />
            </>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
