import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { fetchRegistration } from '../../servisces';

import styles from './Registration.module.css';

const Registration = () => {
  const navigate = useNavigate();

  const isValid = useCallback(({ name, password, email }) => {
    return name.length > 5 && password.length > 5 && email.length > 2; // добавить валидацию email
  }, []);

  const createNewUser = (e) => {
    const target = e.target;
    const newUser = {
      name: target.name.value,
      password: target.password.value,
      email: target.email.value,
    };

    return newUser;
  };

  const callbackFuncReg = useCallback(
    (newUser) => {
      if (isValid(newUser)) {
        (async () => {
          const data = await fetchRegistration(newUser);
          if (data?.successful) {
            navigate('/login');
          }
        })();
      } else {
        alert('Please, fill in all fields');
      }
    },
    [isValid]
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const newUser = createNewUser(e);

      callbackFuncReg(newUser);
    },
    [callbackFuncReg]
  );

  const callbackFuncToLog = useCallback((e, url) => {
    e.preventDefault();
    navigate(url);
  }, []);

  const addCallbackHandler = useCallback((func, url) => {
    return function (e) {
      func(e, url);
    };
  }, []);

  return (
    <div className={styles.registration}>
      <h2>Registration</h2>
      <form
        className={styles.registrationForm}
        action=''
        onSubmit={onSubmitForm}
      >
        <Input placeholdetText='Enter name' labelText='Name' name='name' />
        <Input placeholdetText='Enter email' labelText='Email' name='email' />
        <Input
          placeholdetText='Enter password'
          labelText='Password'
          name='password'
        />
        <Button text={'Registration'} />
      </form>
      <p>
        If you have an account you can{' '}
        <Button
          text={'Login'}
          callbackFunc={addCallbackHandler(callbackFuncToLog, '/login')}
          type={'button'}
        />
      </p>
    </div>
  );
};

export default Registration;
