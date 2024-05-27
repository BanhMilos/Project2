import React, { useState } from "react";

// Component 2
const Component2 = ({ onValueChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue); // Pass the value to parent
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

// Component 3
const Component3 = ({ value }) => {
  return <p>Value from Component 2: {value}</p>;
};

// Component 1
const Component1 = () => {
  const [component3Value, setComponent3Value] = useState("");

  const handleValueChange = (value) => {
    setComponent3Value(value); // Receive the value from Component 2
  };

  return (
    <div>
      <Component2 onValueChange={handleValueChange} />
      <Component3 value={component3Value} />
    </div>
  );
};

export default Component1;
