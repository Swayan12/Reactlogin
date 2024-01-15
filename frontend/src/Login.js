import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import backgroundImage from './Image/backgroundImage.jpg';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trigger validation
    const validationErrors =Validation(values);
    setErrors(validationErrors);

    // Check for validation errors
    if (!validationErrors.email && !validationErrors.password) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // Make an asynchronous request
        const response = await axios.post('http://localhost:8081/login', { values }, config);

        // Check the response data
        if (response.data === 'Success') {
          // Use navigate here instead of setTimeout
          navigate('/home');
        } else {
          alert('No Record Exist');
        }
      } catch (error) {
        // Handle error
        console.error('Login failed:', error);
      }
    }
  };

  // useEffect(() => {
  //   // Asynchronous validation
  //   const asyncValidation = async () => {
  //     const validationErrors = await Validation(values);
  //     setErrors(validationErrors);
  //   };

    // Trigger validation on input change
  //   asyncValidation();
  // }, [values]);

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='d-flex justify-content-center'>Sign In</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input type='email' placeholder='Enter your Email' name='email' onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'>{errors.email}
            {errors.email === "Email should not be empty"}
            {errors.email === "Please enter a valid Email address."}
            </span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input type='password' placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0' />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
            {/* "Forgot Password" Link */}
            <Link
            to='/forgot-password'
            className='btn btn-link mt-2'
            style={{
              textDecoration: 'none',
              color: '#007BFF', 
              fontSize: '14px', 
              fontWeight: 'bold',
              margin: '-10px',
  }}
>
  Forgot Password?
</Link>
          </div>

          <button type='submit' className='btn btn-success w-100'>
            Log In
          </button>
          <p></p>
          <Link to='/signup' className='btn btn-default border bg-light w-100 rounded-0 text-decoration-none'>
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
