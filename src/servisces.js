// /courses // /authors
export const loadResourse = async (url) => {
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`Error fetch ${url}, status ${resp.status}`);
  }
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

  return await resp.json();
};

export const fetchRegistration = async (newUser) => {
  const resp = await fetch('http://localhost:4000/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await resp.json();
};

// logout
export const fetchLogout = async () => {
  const resp = await fetch('http://localhost:4000/logout', {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('result')}`,
    },
  });

  return resp;
};

// users/me
export const fetchUsersMe = async () => {
  const resp = await fetch('http://localhost:4000/users/me', {
    method: 'GET',
    headers: {
      Authorization: `${localStorage.getItem('result')}`,
    },
  });

  return await resp.json();
};

// /courses/{id}
export const fetchCourseDelete = async (id) => {
  const resp = await fetch(`http://localhost:4000/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${localStorage.getItem('result')}`,
    },
  });

  return await resp.json();
};

// /courses/add // /authors/add
export const fetchItemAdd = async (newItem, url) => {
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('result')}`,
    },
  });

  if (!resp.ok) {
    throw new Error(`Error fetch ${url}, status ${resp.status}`);
  }

  return await resp.json();
};

// /courses/{id}
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

  return await resp.json();
};
