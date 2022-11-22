import React, { useState } from 'react'
import authService from '../../../services/auth.service';
import userService from '../../../services/user.service';
import FormInput from '../../Form/FormInput';

const CreateHotel = () => {
    const [res, setRes] = useState({
        message: "",
        successful: false
    });
    const [image, setImage] = useState({ selectedFile: null });

    const [values, setValues] = useState({
        hotel_name: "",
        hotel_rate: "",
        hotel_address: "",
        hotel_image: "",
        hotel_description: ""
    });

    const inputs = [
        {
            id: 1,
            name: "hotel_name",
            type: "text",
            placeholder: "Hotel_name",
            errorMessage:
                "hotel_name should be 3-16 characters and shouldn't include any special character!",
            label: "Hotel_name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "hotel_rate",
            type: "text",
            placeholder: "Hotel_rate",
            errorMessage: "It should be a number 1-5!",
            label: "Hotel_rate",
            pattern: "[1-5]",
            required: true,
        },
        {
            id: 3,
            name: "hotel_address",
            type: "text",
            placeholder: "Hotel_address",
            errorMessage: "Enter hotel address!",
            label: "Hotel_address",
            required: true,
        },
        {
            id: 4,
            name: "hotel_image",
            type: "file",
            placeholder: "Hotel_image",
            errorMessage: "choose image!",
            label: "Hotel_image",
            required: true,
        },
        {
            id: 5,
            name: "hotel_description",
            type: "text",
            placeholder: "Hotel_description",
            errorMessage:
                "Enter descripton",
            label: "Hotel_description",
            required: true,
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        userService.createHotel(values.hotel_name, values.hotel_rate, values.hotel_address, image.selectedFile, values.hotel_description).then(
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
        if (e.target.name === 'hotel_image') {
            setValues({ ...values, [e.target.name]: e.target.value });
            setImage({ selectedFile: e.target.files[0] });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }

    };

    return (
        <div class="container-fluid px-4 mt-4">
            <div className="app">
                <form onSubmit={handleSubmit}>
                    <h1>Create hotel</h1>
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
                    <button class="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateHotel