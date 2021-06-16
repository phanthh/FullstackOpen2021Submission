import React from "react";

const PersonForm = ({
  submitHandler,
  name,
  nameHandler,
  phone,
  phoneHandler,
}) => (
  <form onSubmit={submitHandler}>
    <div>
      name: <input value={name} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={phone} onChange={phoneHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;
