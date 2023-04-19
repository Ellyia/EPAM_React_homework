import styles from './Button.module.css';

const Button = ({ text, callbackFunc, type = 'submit' }) => {
  return (
    <button className={styles.btnBasis} onClick={callbackFunc} type={type}>
      {text}
    </button>
  );
};

export default Button;
