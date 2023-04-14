import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';

import styles from './Header.module.css';

const Header = ({ name }) => {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.flex}>
        <div className={styles.marginRight}>{name}</div>
        <Button text='Logout' />
      </div>
    </header>
  );
};

export default Header;
