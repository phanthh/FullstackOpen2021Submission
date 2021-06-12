import React from "react";

const Person = ({ person, deleteHandler }) => (
  <p key={person.id}>
    {person.name} {person.number}{" "}
    <button onClick={() => deleteHandler(person.id)}>delete</button>
  </p>
);

const Persons = ({ persons, deleteHandler }) => (
  <>
    {persons.map((person) => (
      <Person key={person.name} person={person} deleteHandler={deleteHandler} />
    ))}
  </>
);
export default Persons;
