import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
// import { useAuth } from '../../hoc/useAuth';

import styles from './Registration.module.css';

const Registration = () => {
  const navigate = useNavigate();
  // const { setNewUser } = useAuth();

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

  const fetchData = useCallback(async (newUser) => {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result?.successful) {
      navigate('/login');
    }

    console.log('end', result);

    return result;
  }, []);

  const callbackFuncReg = useCallback(
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
      const newUser = createNewUser(e);
      console.log('newUser from form', newUser);

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
