import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import * as reduxHooks from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

jest.mock('react-redux');

// beforeEach(() => {
//   fetchMock.resetMocks();
// });

describe('Courses component', () => {
  test('should display Empty container if courses array length is 0', () => {
    // const mockedUser = { role: 'admin' };
    // jest
    //   .spyOn(reduxHooks, 'useSelector')
    //   .mockReturnValueOnce([])
    //   .mockRejectedValueOnce([])
    //   .mockRejectedValueOnce(mockedUser);
    // jest.spyOn(reduxHooks, 'useDispatch').mockReturnValueOnce(jest.fn());
    // const { getByTestId } = render(
    //   <Router>
    //     <Courses />
    //   </Router>
    // );
    // const courseCard = getByTestId('course-card');
    // expect(courseCard).toBeNull();
  });

  test('should display display amount of CourseCard equal length of courses array', () => {
    // fetchMock.mockResponseOnce(JSON.stringify({ data: 'example' }));
    // const mockedCourses = [
    //   {
    //     id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    //     title: 'JavaScript',
    //     description: `Lorem Ipsum is simply dummy text ...`,
    //     creationDate: '8/3/2021',
    //     duration: 160,
    //     authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
    //   },
    //   {
    //     id: 'pe5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    //     title: 'Java',
    //     description: `Lorem Ipsum is simply dummy text ...`,
    //     creationDate: '8/3/2021',
    //     duration: 160,
    //     authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
    //   },
    // ];
    // const mockedUser = { role: 'admin' };
    // const mockedAuthors = [{id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d', name: 'Testing name'}];
    // jest.spyOn(reduxHooks, 'useSelector').mockReturnValueOnce(mockedCourses).mockRejectedValueOnce(mockedUser).mockRejectedValueOnce(mockedAuthors);
    // jest.spyOn(reduxHooks, 'useDispatch').mockReturnValueOnce(jest.fn());
    // const { getAllByTestId } = render(
    //   <Router>
    //     <Courses />
    //   </Router>
    // );
    //     const courseCards = getAllByTestId('course-card');
    //     expect(courseCards).toHaveLength(mockCourses.length);
  });

  test(' CourseForm should be showed after a click on a button "Add new course"', () => {
    // jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);
    // jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    // render(
    //   <Router>
    //     <Courses />
    //   </Router>
    // );
    // expect(screen.queryByTestId('course-form')).toBeNull();
    // const addButton = screen.getByText('Add new course');
    // fireEvent.click(addButton);
    // expect(screen.getByTestId('course-form')).toBeInTheDocument();
  });
});
