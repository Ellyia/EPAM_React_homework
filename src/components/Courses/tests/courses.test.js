import { render, screen } from '@testing-library/react';

import * as reduxHooks from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Courses from '../Courses';

jest.mock('react-redux');

const data = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text ...`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
  },
  {
    id: 'pe5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'Java',
    description: `Lorem Ipsum is simply dummy text ...`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
  },
];

describe('Courses component', () => {
  test('should display Empty container if courses array length is 0', () => {
  //
  //   jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);
  //   jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());
  //   const component = render(<Router><Courses /></Router>);
  //   expect(component).toMatchSnapshot();
  });
  // test('should display display amount of CourseCard equal length of courses array', () => {
  //   jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(data);
  //   jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());
  //   const component = render(
  //     <Router>
  //       <Courses />
  //     </Router>
  //   );
  //   expect(component).toMatchSnapshot();
  // });
});
