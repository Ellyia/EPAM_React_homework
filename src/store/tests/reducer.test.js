import coursesReducer from '../../store/courses/reducer';
import { ACTION_ADD_COURSE, ACTION_GET_COURSES } from '../courses/actionTypes';

const data = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text ...`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
  },
];

const state1 = {
  courses: [
    {
      id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
      title: 'JavaScript',
      description: `Lorem Ipsum is simply dummy text ...`,
      creationDate: '8/3/2021',
      duration: 160,
      authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
    },
  ],
};

const state2 = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text ...`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
  },
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'Java',
    description: `Lorem Ipsum is simply dummy text ...`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
  },
];

const course = {
  id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
  title: 'Java',
  description: `Lorem Ipsum is simply dummy text ...`,
  creationDate: '8/3/2021',
  duration: 160,
  authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
};

describe('coursesReducer', () => {
  test('should return the initial state', () => {
    const result = coursesReducer(undefined, { type: '' });

    expect(result).toEqual([]);
  });

  test('should handle ACTION_GET_COURSES and returns new state', () => {
    const action = { type: ACTION_GET_COURSES, payload: data };

    const result = coursesReducer([], action);

    expect(result.courses[0]).toBe(data[0]);
  });

  test('should handle SAVE_COURSE and returns new state', () => {
    const action = { type: ACTION_ADD_COURSE, payload: course };

    const result = coursesReducer(state1, action);

    expect(result).toStrictEqual(state2);
  });
});
