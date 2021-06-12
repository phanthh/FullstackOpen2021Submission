import React from "react";

const Part = ({ name, exericses }) => (
  <p>
    {name} {exericses}
  </p>
);
const Header = ({ course }) => <h1>{course.name}</h1>;
const Content = ({ course }) => {
  const { _, parts } = course;
  return (
    <>
      <Part name={parts[0].name} exericses={parts[0].exercises} />
      <Part name={parts[1].name} exericses={parts[1].exercises} />
      <Part name={parts[2].name} exericses={parts[2].exercises} />
    </>
  );
};

const Total = ({ course }) => {
  const { _, parts } = course;
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
