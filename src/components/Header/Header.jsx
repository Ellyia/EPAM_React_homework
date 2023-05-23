import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';

import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';
import { logout } from '../../store/user/actionCreators';
import { getUser } from '../../store/selectors';
import { fetchLogout } from '../../servisces';

import styles from './Header.module.css';

const Header = () => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, isAuth } = useSelector(getUser);

  const callbackLogout = useCallback(async (e) => {
    e.preventDefault();

    const resp = await fetchLogout();
    if (resp.ok) {
      dispatch(logout());
    }
    redirect('/login', { replace: true });

    localStorage.clear();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div className={styles.flex}>
          <div className={styles.marginRight}>
            {!!isAuth ? name || 'you are admin' : ''}
          </div>
          {!!isAuth && <Button text='Logout' callbackFunc={callbackLogout} />}
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
