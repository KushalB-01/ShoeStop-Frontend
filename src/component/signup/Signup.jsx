import React, { useContext, useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productContext } from '../contextAPI/Context';
import { API_URL } from '../../config';

const Signup = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(productContext);

  const [name, setName] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      const receivedToken = response.data.token;

      if (receivedToken) {
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
        navigate('/home');
      } else {
        setMessage('Registration succeeded, but no login token was received.');
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);

      setMessage(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'SignUp'}
        </button>

        {message && <p style={{ color: 'red', marginTop: '12px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default Signup;