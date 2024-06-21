import { useState } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? (checked ? value : '') : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    if (Object.keys(errors).length === 0) {
      callback(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
