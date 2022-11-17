import React, { useState } from 'react'
import FormInput from './Form/FormInput';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const [res, setRes] = useState({
    message: "",
    loading: false
  });

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(values.username, values.password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setRes({
          loading: false,
          message: resMessage
        });
      }
    )
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {res.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {res.message}
                </div>
              </div>
            )}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;