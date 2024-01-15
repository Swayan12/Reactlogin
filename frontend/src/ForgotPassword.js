// ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailSent(true);
  };

  return (
    <section className="forgot-password-container">
    <div >
      <h2>Forgot Password</h2>
      {emailSent ? (
        <p>Email sent! Check your inbox for instructions.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>
            Enter your email address to reset your password:
          </label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmailChange}
          /><p></p>
          <button type='submit'>Reset Password</button>
        </form>
      )}
    </div>
    </section>
  );
}


export default ForgotPassword;
