import React from "react";

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

const Content = ({ list }) => {
  console.log(list);
  console.log(Object.keys(list));
  return (
    <>
      {Object.keys(list).map((key) => (
        <p>
          {key.toString()} {list[key.toString()].toString()}
        </p>
      ))}
    </>
  );
};

const Total = ({ exercises }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {exercises.reduce((acc, exercise) => acc + exercise, 0)}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course}></Header>
      <Content
        list={{ [part1]: exercises1, [part2]: exercises2, [part3]: exercises3 }}
      ></Content>
      <Total exercises={[exercises1, exercises2, exercises3]}></Total>
    </div>
  );
};

export default App;
