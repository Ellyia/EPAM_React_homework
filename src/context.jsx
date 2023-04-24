import { createContext } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './constants';

export const mockedListsContext = createContext({
  mockedCoursesList: [...mockedCoursesList],
  mockedAuthorsList: [...mockedAuthorsList],
});
