import styles from './Button.module.css';

const Button = ({
  text,
  callbackFunc,
  type = 'submit',
  style = styles.btnBasis,
}) => {
  return (
    <button className={style} onClick={callbackFunc} type={type}>
      {text}
    </button>
  );
};

export default Button;
