import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as reduxHooks from 'react-redux';

import Logo from '../components/Logo/Logo';
import Header from '../Header';

jest.mock('react-redux');

const mockedState = {
  userReducer: {
    isAuth: true,
    name: 'Test Name',
  },
  courses: [],
  authors: [],
};

const mockedStore = {
  getState: () => mockedState,
  signout: jest.fn(),
  dispatch: jest.fn(),
};

describe('Header component', () => {
  jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);

  test('should have logo', () => {
    render(<Logo />);
    const logo = screen.getByAltText('logotypeOfCourses');
    expect(logo).toBeInTheDocument();
  });

  // test('should have name', () => {
  //   render(
  //     <Provider store={mockedStore}>
  //       <Header />
  //     </Provider>
  //   );
  //   console.log(mockedStore);
  //   // const loginButton = screen.getByText(/Test/i, { selector: 'heading' });
  //   expect(screen.getByText('Test Name')).toBeInTheDocument();
  // });
});
