import { useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';
import { useAuth } from '../../hoc/useAuth';
import { logout } from '../../store/user/actionCreators';
import { getUser } from '../../store/selectors';
import { fetchLogout } from '../../servisces';

import styles from './Header.module.css';

const Header = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();

  const { signout, token } = useAuth();
  const { name, isAuth } = useSelector(getUser);

  const callbackFunc = useCallback(async (e, url) => {
    e.preventDefault();

    signout(async () => {
      const resp = await fetchLogout();
      if (resp.ok) {
        dispatch(logout());
      }
      redirect(url, { replace: true });
    });

    // const resp = await fetchLogout();

    // if (resp.ok) {
    //   dispatch(logout());
    // }
    // redirect(url, { replace: true });

    localStorage.clear();
  }, []);

  const addCallbackHandler = useCallback(
    (url) => {
      return function (e) {
        callbackFunc(e, url);
      };
    },
    [callbackFunc]
  );

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div className={styles.flex}>
          <div className={styles.marginRight}>
            {!!isAuth ? name || 'you are admin' : ''}
          </div>
          {!!isAuth && (
            <Button text='Logout' callbackFunc={addCallbackHandler('/login')} />
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
