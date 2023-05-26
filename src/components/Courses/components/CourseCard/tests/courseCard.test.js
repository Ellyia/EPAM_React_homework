import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseCard from '../CourseCard';
import * as services from '../../../../../servisces'; // Update the import statement
import * as reduxHooks from 'react-redux';

jest.mock('react-redux');

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
    const mockedUser = { role: 'admin' };

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(mockedUser);
    render(
      <CourseCard
        cardProps={mockCardProps}
        authorsStr={mockAuthorsStr}
        id={mockId}
      />
    );
    expect(screen.getByText(mockCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockCardProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockAuthorsStr)).toBeInTheDocument();
    expect(screen.getByText(mockCardProps.duration)).toBeInTheDocument();
    expect(screen.getByText(mockCardProps.creationDate)).toBeInTheDocument();
  });
});
