const Person = (props) => {
  return props.showPersons.map((person) => {
    return (
      <>
        <li key={person.id}>
          {person.name} : {person.number}
        </li>
        <button onClick={() => props.handleDelete(person.id)}>Dele</button>
      </>
    );
  });
};

export default Person;
