import React, { useState } from 'react'
import authService from '../../../services/auth.service';
import FormInput from '../../Form/FormInput';

const CreateUser = () => {
    const [res, setRes] = useState({
        message: "",
        successful: false
    });

    const [values, setValues] = useState({
        username: "",
        email: "",
        tel: "",
        address: "",
        password: "",
        confirmPassword: "",
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
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 3,
            name: "tel",
            type: "text",
            placeholder: "Tel",
            errorMessage: "It should be a valid numberphone!",
            label: "Tel",
            pattern: "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$",
            required: true,
        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Address",
            errorMessage: "Enter your address",
            label: "Address",
            required: true,
        },
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 6,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: values.password,
            required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.register(values.username, values.email, values.tel, values.address, values.password).then(
            response => {
                setRes({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setRes({
                    successful: false,
                    message: resMessage
                });
            }
        );
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div class="container-fluid px-4 mt-4">
            <div className="app">
                <form onSubmit={handleSubmit}>
                    <h1>Create user</h1>
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
                            <div
                                className={
                                    res.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {res.message}
                            </div>
                        </div>
                    )}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser