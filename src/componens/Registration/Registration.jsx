// import { useState, useContext, useCallback } from 'react';
// import { Link } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import styles from './Registration.module.css';

const Registration = () => {
  return (
    <div className={styles.registrationForm}>
      <h2>Registration</h2>
      <form action='#'>
        <Input
          placeholdetText='Enter name'
          labelText='Name'
          // onChange={(e) => dispatch({ type: 'title', value: e.target.value })}
        />
        <Input
          placeholdetText='Enter email'
          labelText='Email'
          // onChange={(e) => dispatch({ type: 'title', value: e.target.value })}
        />
        <Input
          placeholdetText='Enter password'
          labelText='Password'
          // onChange={(e) => dispatch({ type: 'title', value: e.target.value })}
        />
        <Button
          text='Registration'
          // callbackFunc={(e) => onCreateAuthor(e)}
        />
      </form>
      <p>
        If you have an accountyou can <a href='#'>Login</a>
      </p>
    </div>
  );
};

export default Registration;
