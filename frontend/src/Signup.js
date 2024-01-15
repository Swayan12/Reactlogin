import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';
import backgroundImage from './Image/backgroundImage.jpg';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        await axios.post('http://localhost:8081/signup', { values }, config);
        setShowSuccessPopup(true);

        // You can add a delay to let the user see the success message before redirecting
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        // Handle error
        console.error('Signup failed:', error);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='d-flex justify-content-center'>Sign Up</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Name</strong>
            </label>
            <input type='name' placeholder='Enter your name' name='name' onChange={handleInput} className='form-control rounded-0' />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input type='email' placeholder='Enter your Email' name='email' onChange={handleInput} className='form-control rounded-0' />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input type='password' placeholder='Enter password' name='password' onChange={handleInput} className='form-control rounded-0' autoComplete='current-password' />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-success w-100'>
            Sign Up
          </button>
          <p></p>
          <Link to='/' className='bg-light w-100 rounded-0 text-decoration-none d-flex justify-content-center align-items-center' style={{ height: '10px' }}>
           Already have an account?
          </Link>

        </form>
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className={`popup ${showSuccessPopup ? 'show-popup' : ''}`} role='alert'>
            Signup successful! Redirecting to the homepage...
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
