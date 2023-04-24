import { useCallback } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';
import { useAuth } from '../../hoc/useAuth';

import styles from './Header.module.css';

const Header = () => {
  let navigate = useNavigate();
  const { signout, token } = useAuth();

  const callbackFunc = useCallback((e, url) => {
    e.preventDefault();

    signout(() => navigate(url, { replace: true }));

    localStorage.clear();
  }, []);

  const addCallbackHandler = useCallback((url) => {
    return function (e) {
      callbackFunc(e, url);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div className={styles.flex}>
          <div className={styles.marginRight}>{!!token ? 'Ella' : ''}</div>
          {!!token && (
            <Button text='Logout' callbackFunc={addCallbackHandler('/login')} />
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
