import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; //

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import styles from './Login.module.css';

const Login = () => {
  let navigate = useNavigate(); // useCallback?

  // const [newUser, setNewUser] = useState({
  //   password: '',
  //   email: '',
  // });

  const isValid = useCallback(({ password, email }) => {
    return password.length > 5 && email.length > 2; // добавить валидацию email
  }, []);

  // const onChangePassword = useCallback(
  //   (e) => setNewUser({ ...newUser, password: e.target.value }),
  //   [newUser]
  // );

  // const onChangeEmail = useCallback(
  //   (e) => setNewUser({ ...newUser, email: e.target.value }),
  //   [newUser]
  // );

  const createNewUser = (e) => {
    const target = e.target;
    const newUser = {
      password: target.password.value,
      email: target.email.value,
    };

    return newUser;
  };

  const fetchData = async (newUser) => {
    // how to use useCallback
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    localStorage.setItem('result', result.result); // это в контекст? isLoggedIn и сохранять name ?

    console.log(result.result);

    return result;
  };

  const callbackFuncLogin = useCallback(
    (url, newUser) => {
      if (isValid(newUser)) {
        fetchData(newUser);
        navigate(url); //
      } else {
        alert('Please, fill in all fields'); //
      }
    },
    [fetchData, isValid]
  );

  const onSubmitForm = useCallback(
    (e, url) => {
      e.preventDefault();
      const newUser = createNewUser(e);
      console.log('newUser', newUser);

      callbackFuncLogin(url, newUser);
    },
    [callbackFuncLogin]
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
      <form
        className={styles.loginForm}
        action=''
        onSubmit={addCallbackHandler(onSubmitForm, '/courses')}
      >
        <Input placeholdetText='Enter email' labelText='Email' name='email' />
        <Input
          placeholdetText='Enter password'
          labelText='Password'
          name='password'
        />
        <Button text={'Login'} />
      </form>
      <p>
        If you have an accountyou can{' '}
        <Button
          text={'Registration'}
          callbackFunc={addCallbackHandler(callbackFuncToReg, '/registration')}
        />
      </p>
    </div>
  );
};

export default Login;
