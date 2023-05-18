
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import redux, { combineReducers, createStore } from "redux";
import CourseCard from '../CourseCard';
import { toLoadCourses } from '../../../../../store/courses/actionCreators';
import * as services from '../../../../../servisces'; // Update the import statement
import authorsReducer from '../../../../../store/authors/reducer';
import coursesReducer from '../../../../../store/courses/reducer';
import userReducer from '../../../../../store/user/reducer';
import * as reduxHooks from 'react-redux';

jest.mock('react-redux');

// Mock the necessary functions and data
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('redux', () => ({
  ...jest.requireActual('redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock(services, () => ({
  fetchCourseDelete: jest.fn(),
}));

describe('CourseCard', () => {
  const mockCardProps = {
    title: 'Test Title',
    description: 'Test Description',
    duration: 'Test Duration',
    creationDate: 'Test Creation Date',
  };

  const mockAuthorsStr = 'Author 1, Author 2';
  const mockId = 1;

  test('renders course card with correct data', () => {
    // Mock useSelector
    // const mockGetCourses = jest.fn().mockReturnValue([]);
    // const mockGetUser = jest.fn().mockReturnValue({ role: 'admin' });
    // jest.spyOn(redux, 'useSelector').mockReturnValueOnce(mockGetCourses).mockReturnValueOnce(mockGetUser);

    // // Create a mock store
    // const rootReducer = combineReducers({authorsReducer, coursesReducer, userReducer});

    // const store = createStore(rootReducer);

    // const mockedState = {
    //   user: {
    //     isAuth: true,
    //     name: 'Test Name',
    //   },
    //   courses: [],
    //   authors: [],
    // };
    // const mockedStore = {
    //   getState: () => mockedState,
    //   subscribe: jest.fn(),
    //   dispatch: jest.fn(),
    // };

    // const mockedCourses = [];
    // const mockedUser = { role: 'admin' };
    // const mockedAuthors = [];
    // jest.spyOn(reduxHooks, 'useSelector').mockReturnValueOnce(mockedCourses).mockRejectedValueOnce(mockedUser).mockRejectedValueOnce(mockedAuthors);
    // jest.spyOn(reduxHooks, 'useDispatch').mockReturnValueOnce(jest.fn());

    // render(
    //   <Provider store={mockedStore}>
    //     <BrowserRouter>
    //       <CourseCard cardProps={mockCardProps} authorsStr={mockAuthorsStr} id={mockId} />
    //     </BrowserRouter>
    //   </Provider>
    // );

    // expect(screen.getByText(mockCardProps.title)).toBeInTheDocument();
    // expect(screen.getByText(mockCardProps.description)).toBeInTheDocument();
    // expect(screen.getByText(mockAuthorsStr)).toBeInTheDocument();
    // expect(screen.getByText(mockCardProps.duration)).toBeInTheDocument();
    // expect(screen.getByText(mockCardProps.creationDate)).toBeInTheDocument();
  });
/*
  test('calls delete course function on button click', async () => {
    // Mock useSelector and useDispatch
    const mockGetCourses = jest.fn().mockReturnValue([]);
    const mockGetUser = jest.fn().mockReturnValue({ role: 'admin' });
    const mockDispatch = jest.fn();
    jest.spyOn(redux, 'useSelector').mockReturnValueOnce(mockGetCourses).mockReturnValueOnce(mockGetUser);
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);

    // Mock fetchCourseDelete
    const mockDeleteResponse = { successful: true };
    const mockDeleteCourse = jest.fn().mockResolvedValue(mockDeleteResponse);
    jest.mock(services, () => ({
      fetchCourseDelete: mockDeleteCourse,
    }));

    render(
      <Provider store={createStore(() => ({ courses: [] }))}>
        <BrowserRouter>
          <CourseCard cardProps={mockCardProps} authorsStr={mockAuthorsStr} id={mockId} />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByText('.', { selector: '.btnDelete' });
    fireEvent.click(deleteButton);

    expect(mockDeleteCourse).toHaveBeenCalledWith(mockId);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(toLoadCourses([])));
  });
*/
  // Write more tests for other functionalities if needed
});

// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';

// import CourseCard from '../CourseCard';

// import * as reduxHooks from 'react-redux';

// jest.mock('react-redux');

// const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

// const id = 1;
// const authorsStr = 'authors';
// const cardProps = {
//   title: 'JavaScript',
//   description: `Lorem Ipsum is simply dummy text ...`,
//   creationDate: '8/3/2021',
//   duration: 160,
// };

// describe('CourseCard component', () => {
//   test('should display title', () => {
//     // mockedDispatch.mockReturnValue(jest.fn());
//     // jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([]);
//     // const component = render(
//     //   <reduxHooks.Provider store={[]}>
//     //     <Router>
//     //       <CourseCard
//     //         key={id}
//     //         id={id}
//     //         authorsStr={authorsStr}
//     //         cardProps={cardProps}
//     //       />
//     //     </Router>
//     //   </reduxHooks.Provider>
//     // );
//     // expect(component).toMatchSnapshot();
//     // expect(screen.getByText('JavaScript').toBeInTheDocument());
//   });
// });
