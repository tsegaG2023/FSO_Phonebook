import { useEffect, useState } from "react";

import "./App.css";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import services from "./services/services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPersons, setShowPersons] = useState();

  useEffect(() => {
    console.log("effect");
    services.getAll().then((response) => {
      setPersons(response.data);
      setShowPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    const newObj = {
      name: newName,
      number: newNumber,
    };

    event.preventDefault();
    const found = persons.find((person) => {
      return person.name === newName;
    });
    const foundNumber = persons.find((person) => {
      return person.number === newNumber;
    });

    if (found && !foundNumber) {
      const confirm1 = confirm(
        `${found.name} Already exists Do you want to replace ?`
      );
      confirm1
        ? services
            .update(found.id, { ...found, number: newObj.number })
            .then((response) => {
              // console.log("Date response", response.data.number);
              // console.log("id to update", String(found.id));
              setPersons(
                persons.map((person) => {
                  return person.id === String(found.id)
                    ? { ...person, number: response.data.number }
                    : person;
                })
              );
              console.log({ ...persons });
            })
        : "";
    } else if (found && foundNumber) {
      alert(`${found.name} Already exists!!`);
    } else {
      services.create(newObj).then((response) => {
        setPersons(persons.concat({ ...response.data }));
        setNewName("");
        setNewNumber("");
        console.log(response.data);
      });
    }
  };
  const findNumber = (event) => {
    const toSearch = event.target.value;

    toSearch == null || toSearch == ""
      ? setPersons(showPersons)
      : setPersons(
          persons.filter((person) => {
            return person.name.includes(toSearch);
          })
        );
  };
  const handleDelete = (id) => {
    const confirm1 = confirm("continue delete");
    confirm1
      ? services.deleteRecord(id).then((response) => {
          setPersons(
            persons.filter((note) => {
              return note.id != id;
            })
          );
        })
      : "";
  };
  const handleInputChangeOfName = (event) => {
    setNewName(event.target.value);
  };
  const handleInputChangeOfNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <>
      <div>
        <h2>ph</h2>
        Search:
        <Filter type="text" onChange={findNumber} />
        <PersonForm
          addName={addName}
          newName={newName}
          onChangeOfName={handleInputChangeOfName}
          onChangeOfNumber={handleInputChangeOfNumber}
          newNumber={newNumber}
        />
        <h3>Numbers</h3>
        <Person showPersons={persons} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default App;
