const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={props.newName}
        onChange={props.onChangeOfName}
      />
      <label htmlFor="telephone">Telephone</label>
      <input
        type="text"
        value={props.newNumber}
        onChange={props.onChangeOfNumber}
      />
      <button>Add</button>
    </form>
  );
};

export default PersonForm;
