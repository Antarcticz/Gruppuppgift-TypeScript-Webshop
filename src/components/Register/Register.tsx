import React, { useState, ChangeEvent } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  displayName: string;
  password: string;
  email: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: 0, // You can set the default values for these fields as needed
    name: '',
    displayName: '',
    password: '',
    email: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleRegistration = async (): Promise<void> => {
    try {
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the user's display name
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, {
          displayName: formData.displayName,
        });
      }
      navigate('/');
      // Now, the user's display name is set
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="displayName">
          <Form.Label>Display Name:</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleRegistration}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
