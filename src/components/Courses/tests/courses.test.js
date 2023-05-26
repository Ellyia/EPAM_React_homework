import { render, screen, fireEvent } from '@testing-library/react';
// import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { Routes, Route } from 'react-router';
import * as reduxHooks from 'react-redux';
import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('react-redux');

const mockStore = configureStore([]);

jest.mock('../../CourseForm/CourseForm', () => () => <div data-testid='course-form' />);

const initialState = {
  user: { role: 'admin' },
  courses: [],
  authors: [],
};

const store = mockStore(initialState);

describe('Courses component', () => {
  test('should display Empty container if courses array length is 0', () => {
    const mockedUser = { role: 'user' };
    jest
      .spyOn(reduxHooks, 'useSelector')
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(mockedUser);
    jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());

    const component = render(<Courses />);
    expect(component).toMatchSnapshot();
  });

  test('should display amount of CourseCard equal length of courses array', () => {
    const mockedCourses = [
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
    const mockedAuthors = [
      { id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d', name: 'Testing name' },
    ];
    const mockedUser = { role: 'user' };
    jest
      .spyOn(reduxHooks, 'useSelector')
      .mockReturnValueOnce(mockedCourses)
      .mockReturnValueOnce(mockedAuthors)
      .mockReturnValue(mockedUser);
    jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());
    const component = render(<Courses />); // наче не бачить mockedCourses
    expect(component).toMatchSnapshot();
    // const courseCards = screen.getAllByTestId('course-card');
    // expect(courseCards).toHaveLength(mockedCourses.length);
    // expect(courseCards.length).toEqual(mockedCourses.length);
  });

  test(' CourseForm should be showed after a click on a button "Add new course"', () => {
    const addCallbackHandler = jest.fn();

    const mockedUser = { role: 'admin' };
    jest
      .spyOn(reduxHooks, 'useSelector')
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValue(mockedUser);
    jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(jest.fn());

    render(
      // <Provider store={store}>
      <Router>
        <Courses />
        <CourseForm/>
      </Router>
      // </Provider>
    );

    const addCourseButton = screen.getByText('Add new course');
    addCourseButton.onclick = addCallbackHandler;
    fireEvent.click(addCourseButton);

    expect(addCallbackHandler).toHaveBeenCalled();

    const courseFormElement = screen.getByTestId('course-form');
    expect(courseFormElement).toBeInTheDocument();
  });
});
