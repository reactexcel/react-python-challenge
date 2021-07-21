import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Form,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  Button,
} from "carbon-components-react";
import axios from "axios";
import "./index.scss";

const BASEURL = "http://5.9.18.28:8030";
const AddNewuser = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    phone_number: "",
  });
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, username, phone_number } = userDetails;

    try {
      const response = await axios.post(`${BASEURL}/auth/register/`, {
        email,
        password,
        name,
        username,
        phone_number,
      });
      if (response.status === 201) {
        history.push("/");
        setUserDetails({
          email: "",
          password: "",
          name: "",
          username: "",
          phone_number: "",
        });
      }
    } catch (e) {
      alert("Something went wrong,Please try again");
    }
  };
  return (
    <div className='form-wrapper'>
      <Form className='form-shadow' onSubmit={handleSubmit}>
        <div style={{ marginBottom: "2rem" }}>
          <TextInput
            id='test2'
            invalidText='Invalid error message.'
            labelText='Email'
            name='email'
            value={userDetails.email}
            placeholder='Enter Emailid'
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <TextInput
            id='test2'
            invalidText='Invalid error message.'
            name='password'
            value={userDetails.password}
            labelText='Password'
            type='password'
            placeholder='Enter your password'
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <TextInput
            id='test2'
            invalidText='Invalid error message.'
            value={userDetails.name}
            name='name'
            labelText='Name'
            type='text'
            placeholder='Enter the Name'
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <TextInput
            id='test2'
            invalidText='Invalid error message.'
            value={userDetails.username}
            name='username'
            labelText='UserName'
            type='text'
            placeholder='Enter the UserName'
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <TextInput
            id='test2'
            invalidText='Invalid error message.'
            labelText='Mobile Number'
            value={userDetails.phone_number}
            name='phone_number'
            type='number'
            placeholder='Enter the Mobile Number'
            onChange={handleChange}
          />
        </div>

        <Button kind='primary' tabIndex={0} type='submit'>
          Add User
        </Button>
      </Form>
    </div>
  );
};
export default AddNewuser;
