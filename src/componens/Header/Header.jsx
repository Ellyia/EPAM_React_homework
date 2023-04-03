import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button.jsx';

const Header = ({ name }) => {
	return (
		<header
			style={{ margin: 10, padding: 20 }}
			className={'d-flex justify-content-between border border-info rounded'}
		>
			<Logo />
			<div className={'d-flex align-items-center'}>
				<div style={{ marginRight: 10 }}>{name}</div>
				<Button text='Logout' />
			</div>
		</header>
	);
};

export default Header;
