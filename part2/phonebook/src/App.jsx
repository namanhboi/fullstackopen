import { useState, useEffect } from "react";
import contactService from "./services/contacts.js";

const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      {contacts.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number} <button onClick={onDelete(id)}>delete</button>
        </p>
      ))}
    </>
  );
};

const PersonForm = ({
  name,
  onChangeName,
  number,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChangeName}
        ></input>
      </div>
      <div>
        <label htmlFor="number">Number:</label>
        <input
          type="tel"
          id="number"
          value={number}
          onChange={onChangeNumber}
        ></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input id="filter" value={filter} onChange={onChangeFilter}></input>
    </div>
  );
};

const Message = ({ message, isOpen, autoClose, styleText, style }) => {
  setTimeout(() => autoClose(), 5000);
  return isOpen ? (
    <div style={style}>
      <h1 style={styleText}>{message}</h1>
    </div>
  ) : null;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    contactService.getAll().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const onChangeName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const [newNumber, setNewNumber] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [successMes, setSuccessMes] = useState("");
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [failMes, setFailMes] = useState("");

  const autoClose = (setIsOpen) => {
    setIsOpen(false);
  };

  const styleSucMes = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const styleSucText = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  const styleFailMes = {
    ...styleSucMes,
    color: "red",
  };

  const styleFailText = {
    ...styleSucText,
    color: "red",
  };
  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.map(({ name, ..._ }) => name).includes(newName)) {
      const repeatPerson = persons.find((person) => person.name === newName);
      contactService
        .updateContact(repeatPerson.id, {
          ...repeatPerson,
          number: newNumber,
        })
        .then((responsePerson) => {
          window.alert(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          );
          setPersons(
            persons.map((person) =>
              person.id !== responsePerson.id ? person : responsePerson
            )
          );
          setIsOpenSuccess(true);
          setSuccessMes("Number Change Successful.");
        })
        .catch((error) => {
          console.log(error);
          setIsOpenFail(true);
          setFailMes(`${repeatPerson.name} already deleted from server`);
          setPersons(
            persons.filter((person) => person.name !== repeatPerson.name)
          );
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      console.log(newPerson);
      contactService.addContact(newPerson).then((responsePerson) => {
        console.log(responsePerson);
        setPersons(persons.concat(responsePerson));
        setIsOpenSuccess(true);
        setSuccessMes("Add Contanct Successful.");
      });
    }
  };

  const onDelete = (id) => () => {
    window.confirm(`Delete ${persons.find((n) => n.id === id).name} ?`);
    contactService
      .deleteContact(id)
      .then((deletedPerson) => {
        console.log(deletedPerson);
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Message
        style={styleSucMes}
        message={successMes}
        isOpen={isOpenSuccess}
        autoClose={() => autoClose(setIsOpenSuccess)}
        styleText={styleSucText}
      />
      <Message
        style={styleFailMes}
        message={failMes}
        isOpen={isOpenFail}
        autoClose={() => autoClose(setIsOpenFail)}
        styleText={styleFailText}
      />
      <h2>Phonebook</h2>
      <Filter filter={filter} onChangeFilter={onChangeFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        onSubmit={onSubmit}
      ></PersonForm>
      <h2>Numbers</h2>
      <Contacts
        contacts={persons.filter(({ name, ..._ }) => name.includes(filter))}
        onDelete={onDelete}
      ></Contacts>
    </div>
  );
};

export default App;
