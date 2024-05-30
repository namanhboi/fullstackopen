import { useState } from "react";

const Contacts = ({ contacts }) => {
  return (
    <>
      {contacts.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFiltereredPersons] = useState(persons);
  const onChangeFilter = (event) => {
    setFilter(event.target.value);
    setFiltereredPersons(
      persons.filter(({ name, number, id }) =>
        name.includes(event.target.value)
      )
    );
  };
  const onChangeName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };

  const [newNumber, setNewNumber] = useState("");

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.map(({ name, ..._ }) => name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook.`);
    } else {
      const newPersons = persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      });
      console.log(newPersons);
      setPersons(newPersons);
      setFiltereredPersons(
        newPersons.filter(({ name, number, id }) => name.includes(filter))
      );
    }
  };
  return (
    <div>
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
      <Contacts contacts={filteredPersons}></Contacts>
    </div>
  );
};

export default App;
