import { useState } from "react";

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

const Content = ({ list }) => {
  return (
    <>
      {list.map(({ name, exercises }) => (
        <p>
          {name} {exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ list }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {list.reduce((acc, { name, exercises }) => acc + exercises, 0)}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header name={course.name}></Header>
      <Content list={course.parts}></Content>
      <Total list={course.parts}></Total>
    </div>
  );
};

export default App;
