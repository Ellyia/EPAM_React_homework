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
