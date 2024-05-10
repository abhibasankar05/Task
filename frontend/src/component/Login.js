import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateLoginForm } from '../validation/Validation'; 
import axios from 'axios'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateLoginForm(formData.email, formData.password); // Validate form inputs
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const responseData = await postData(formData); // Send login request
        console.log('Login successful:', responseData);
        localStorage.setItem('token',JSON.stringify(responseData.token));
        navigate("/home");
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
      }
    }
  };

  const postData = async (data) => {
    try {
      const response = await axios.post('http://localhost:8081/login', data); 
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          <h1>Log In</h1>

          <div className='mb-3'>
            <label>Username</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control rounded-0'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>} 
          </div>

          <div className='mb-3'>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control rounded-0'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>} 
          </div>

          <button type="submit" className='btn btn-success w-100'>Log In</button>
          <Link to="/signup" className='btn btn-default border w-100 bg-light'>Register</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

