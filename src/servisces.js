export const loadCourses = async () => {
  const resp = await fetch('http://localhost:4000/courses/all');
  const data = await resp.json();
  console.log('data.c.result', data.result); //
  return data.result;
};

export const loadAuthors = async () => {
  const resp = await fetch('http://localhost:4000/authors/all');
  const data = await resp.json();
  console.log('data.a.result', data.result); //
  return data.result;
};

// export const createCards = (courses, authory) => {
//   const cards = courses.map((cardData) => {
//     const { id, ...cardProps } = cardData;
//     const authors = cardProps.authors;

//     let authorsStr = authory
//       .filter((author) => authors.includes(author.id))
//       .map((x) => x.name)
//       .join(', ');

//     return {
//       id,
//       cardProps,
//       authorsStr,
//     };
//   });
// };
