import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { addUser, actionUsersMe } from '../../store/user/actionCreators';
import { fetchLogin, fetchUsersMe } from '../../servisces';

import styles from './Login.module.css';
// import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fromPage = location.state?.from?.pathname || '/courses';

  // де я маю це прописати, щоб коректно працювало?
  // useEffect(() => {
  if (localStorage.getItem('result')) {
    dispatch(actionUsersMe(fetchUsersMe));
    navigate(fromPage, { replace: true });
  }
  // }, []);

  const isValid = useCallback(({ password, email }) => {
    return password.length > 5 && email.length > 2; // додати валiдацiю email
  }, []);

  const loginUser = useCallback((e) => {
    const target = e.target;
    const newUser = {
      password: target.password.value,
      email: target.email.value,
    };

    return newUser;
  }, []);

  const callbackFuncLogin = useCallback(
    (newUser) => {
      if (isValid(newUser)) {
        (async () => {
          const data = await fetchLogin(newUser);

          if (data?.successful) {
            localStorage.setItem('result', data.result);
            dispatch(addUser(data));
            navigate(fromPage, { replace: true });
          }
        })();
      } else {
        alert('Please, fill in all fields');
      }
    },
    [isValid, fromPage]
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const newUser = loginUser(e);

      callbackFuncLogin(newUser);
    },
    [callbackFuncLogin, loginUser]
  );

  const callbackFuncToReg = useCallback((e, url) => {
    e.preventDefault();
    navigate(url);
  }, []);

  const addCallbackHandler = useCallback((func, url) => {
    return function (e) {
      func(e, url);
    };
  }, []);

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form className={styles.loginForm} action='' onSubmit={onSubmitForm}>
        <Input placeholdetText='Enter email' labelText='Email' name='email' />
        <Input
          placeholdetText='Enter password'
          labelText='Password'
          name='password'
        />
        <Button text={'Login'} />
      </form>
      <p>
        If you have an account you can{' '}
        <Button
          text={'Registration'}
          callbackFunc={addCallbackHandler(callbackFuncToReg, '/registration')}
        />
      </p>
    </div>
  );
};

export default Login;
