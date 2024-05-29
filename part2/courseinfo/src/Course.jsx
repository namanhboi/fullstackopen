const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <b>
      total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
    </b>
  </div>
);

const Course = ({ id, name, parts }) => {
  console.log(id, name, parts);
  return (
    <div>
      <Header course={name}></Header>
      <Content parts={parts}></Content>
    </div>
  );
};

export default Course;
