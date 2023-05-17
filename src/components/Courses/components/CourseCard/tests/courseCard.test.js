import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CourseCard from '../CourseCard';

import * as reduxHooks from 'react-redux';

jest.mock('react-redux');

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

const id = 1;
const authorsStr = 'authors';
const cardProps = {
  title: 'JavaScript',
  description: `Lorem Ipsum is simply dummy text ...`,
  creationDate: '8/3/2021',
  duration: 160,
};

describe('CourseCard component', () => {
  test('should display title', () => {
    mockedDispatch.mockReturnValue(jest.fn());
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);

    const component = render(
      <reduxHooks.Provider store={[]}>
        <Router>
          <CourseCard
            key={id}
            id={id}
            authorsStr={authorsStr}
            cardProps={cardProps}
          />
        </Router>
      </reduxHooks.Provider>
    );
    expect(component).toMatchSnapshot();
    // expect(screen.getByText('JavaScript').toBeInTheDocument());
  });
});
