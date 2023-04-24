import styles from './Input.module.css';

const Input = ({
  placeholdetText,
  onChange,
  htmlFor,
  labelText,
  type,
  name,
}) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {labelText}
      <input
        className={styles.inputBasis}
        type={type ? type : 'text'}
        name={name}
        id={htmlFor}
        onChange={onChange}
        placeholder={placeholdetText}
      />
    </label>
  );
};

export default Input;
