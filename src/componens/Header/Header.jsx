import { useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';
import { useAuth } from '../../hoc/useAuth';
import { logout } from '../../store/user/actionCreators';
import { getUser } from '../../store/selectors';
import { fetchLogout } from '../../servisces';

import styles from './Header.module.css';

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { signout, token } = useAuth();

  const { name } = useSelector(getUser);

  const callbackFunc = useCallback((e, url) => {
    e.preventDefault();

    dispatch(logout());

    signout(async () => {
      const resp = await fetchLogout();
      console.log(resp); // 403 Forbitten
      navigate(url, { replace: true });
    });

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
          <div className={styles.marginRight}>{!!token ? name : ''}</div>
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
