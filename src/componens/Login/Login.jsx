import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useAuth } from '../../hoc/useAuth';

import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const isValid = useCallback(({ password, email }) => {
    return password.length > 5 && email.length > 2; // добавить валидацию email
  }, []);

  const loginUser = useCallback((e) => {
    const target = e.target;
    const newUser = {
      password: target.password.value,
      email: target.email.value,
    };

    return newUser;
  }, []);

  const fetchData = useCallback(async (newUser) => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    localStorage.setItem('result', result.result);

    signin(result.result, () => navigate('/courses'));

    return result;
  }, []);

  const callbackFuncLogin = useCallback(
    (newUser) => {
      if (isValid(newUser)) {
        fetchData(newUser);
      } else {
        alert('Please, fill in all fields');
      }
    },
    [fetchData, isValid]
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
