import { render, screen } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

import Logo from '../components/Logo/Logo';
import Header from '../Header';

jest.mock('react-redux');

describe('Header component', () => {
  test('should have logo', () => {
    render(<Logo />);
    const logo = screen.getByAltText('logotypeOfCourses');
    expect(logo).toBeInTheDocument();
  });

  test('should have name', () => {
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
    }));

    const mockUserName = 'Ella';
    const mockIsAuth = true;

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue({
      name: mockUserName,
      isAuth: mockIsAuth,
    });

    const { getByText } = render(<Header />);

    const userName = getByText('Ella');
    expect(userName).toBeInTheDocument();
  });
});
