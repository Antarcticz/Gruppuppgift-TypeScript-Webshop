import React, { useState } from 'react'
import'./Login.css'
import { Button, Form } from 'react-bootstrap';
import threadsService from '../../Forum/threads/threadService'
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();


    const toRegisterPage = () => {
        navigate('/register')
    }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await threadsService.loginUser(formData.email, formData.password);
      navigate('/');
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="link" onClick={toRegisterPage}>Register</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
