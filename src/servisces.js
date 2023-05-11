export const loadCourses = async () => {
  const resp = await fetch('http://localhost:4000/courses/all');
  const data = await resp.json();

  return data.result;
};

export const loadAuthors = async () => {
  const resp = await fetch('http://localhost:4000/authors/all');
  const data = await resp.json();

  return data.result;
};

export const fetchLogin = async (newUser) => {
  const resp = await fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await resp.json();

  return data;
};

export const fetchRegistration = async (newUser) => {
  const resp = await fetch('http://localhost:4000/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await resp.json();

  return data;
};

// logout +
export const fetchLogout = async () => {
  const resp = await fetch('http://localhost:4000/logout', {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('result')}`,
    },
  });
  // const data = await resp.json();
  console.log('resp', resp);
  return resp;
};

// users/me +
export const fetchUsersMe = async () => {
  const resp = await fetch('http://localhost:4000/users/me', {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('result')}`,
    },
  });
  const data = await resp.json();
  console.log('resp', data);
  return data;
};

// /courses/{id} [DELETE]
export const fetchCourseDelete = async (id) => {
  const resp = await fetch(`http://localhost:4000/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('result')}`, // if admin
    },
  });
  const data = await resp.json();
  console.log('id.del', data);
  return data;
};

// /courses/add [POST]
export const fetchCourseAdd = async (newCourse) => {
  const resp = await fetch('http://localhost:4000/courses/add', {
    method: 'POST',
    body: JSON.stringify(newCourse),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('result')}`,
    },
  });
  const data = await resp.json();

  return data;
};

// /courses/{id} [PUT]
export const fetchChangeCourse = async (changedCourse, id) => {
  const resp = await fetch(`http://localhost:4000/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(changedCourse),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('result')}`,
      id: `${id}`,
    },
  });
  const data = await resp.json();

  return data;
};

// /authors/add [POST]
export const fetchAuthorAdd = async (newAuthor) => {
  const resp = await fetch('http://localhost:4000/authors/add', {
    method: 'POST',
    body: JSON.stringify(newAuthor),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('result')}`,
    },
  });
  const data = await resp.json();

  return data;
};
