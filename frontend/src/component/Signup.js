import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { validateSignupForm } from '../validation/Validation';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
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
    const validationErrors = validateSignupForm(formData.name, formData.email, formData.password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const responseData =await postData(formData);
        console.log('User registered successfully',responseData);
        localStorage.setItem('token',JSON.stringify(responseData.token));
        navigate("/");
      } catch (error) {
        console.error('Error signing up:', error);
        alert('An error occurred while signing up. Please try again.');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const postData = async (data) => {
    try {
      const response = await axios.post('http://localhost:8081/signup', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className='mb-3'>
            <label>Name</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='form-control rounded-0'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className='mb-3'>
            <label>Email</label>
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

          <button type="submit" className='btn btn-success w-100'>Register</button>
          <Link to="/" className='btn btn-default border w-100 bg-light'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
