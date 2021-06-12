import React, { useEffect, useState } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import personService from "./services/person.js";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  // Custom Alert
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message, second) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, second * 1000);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const showError = (message, second) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, second * 1000);
  };

  // Form fields

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value.trim());
  };

  const [newPhone, setNewPhone] = useState("");
  const handlePhoneChange = (e) => {
    e.preventDefault();
    setNewPhone(e.target.value.trim());
  };

  // Alter server functions

  const addPerson = (e) => {
    e.preventDefault();
    // Check if user exists, is so, update with new number
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        personService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.name !== returnedPerson.name ? p : returnedPerson
              )
            );
            setNewName("");
            setNewPhone("");

            // Alert
            showAlert(`Updated ${newName}'s phone number`, 5);
          })
          .catch((error) => {
            console.error(error);
            showError(
              `Information of ${newName} has already been removed from server`,
              5
            );
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewPhone("");
          showAlert(`Added ${newName}'s phone number`, 5);
        })
        .catch((error) => {
          console.error(error);
          showError(`Server error: Failed to add ${newName} information`, 5);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleting(id)
        .then((res) => {
          if (res.status === 200) {
            console.log(`Sucessful delete ${person.name}`);
            setPersons(persons.filter((p) => p.id !== id));
          } else console.log("Not sure");
        })
        .catch((error) => console.error(error));
    }
  };
  // Filtering Search

  const [filterString, setFilterString] = useState("");
  const handleFilterStringChange = (e) => {
    e.preventDefault();
    setFilterString(e.target.value.toLowerCase());
  };

  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterString)
  );

  // Fetching
  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="alert" message={alertMessage} />
      <Notification type="error" message={errorMessage} />
      <Filter value={filterString} handler={handleFilterStringChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        phone={newPhone}
        nameHandler={handleNameChange}
        phoneHandler={handlePhoneChange}
        submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
