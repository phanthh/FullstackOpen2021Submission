import React from "react";

const Part = ({ name, exericses }) => (
  <p>
    {name} {exericses}
  </p>
);

const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ course }) => {
  const parts = course.parts;
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exericses={part.exercises} key={part.id} />
      ))}
    </>
  );
};

const Total = ({ course }) => {
  const parts = course.parts;
  return (
    <p>
      <strong>
        total of {parts.reduce((a, c) => a + c.exercises, 0)} exercises
      </strong>
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

export default Course;
