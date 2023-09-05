import './AskForm.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';

interface Thread {
  id: number;
  title: string;
  category: string;
  creationDate: string;
  description: string;
}

const AskForm: React.FC = () => {

  // const [formData, setFormData] = useState<Thread[]>([
  //   { id: 0, title: 'Hej', category: 'Hej', creationDate: 'Idag', description: 'Hej' }
  // ])

  const initialFormData: Thread = {
    title: '',
    category: '',
    creationDate: '',
    description: '',
    id: 0
  };

  const [formData, setFormData] = useState<Thread>(initialFormData);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission, e.g., send the form data to a server or store it in your state.
    console.log('Submitted form data:', formData);
    // Reset the form fields
    setFormData(initialFormData);
  };

  return (
    <div className="ask-form-container">
      <h1>Ask a Question</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Be specific and imagine you’re asking a question to another person."
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="category">
          <Form.Label>What is the category of your problem?</Form.Label>
          <Form.Control
            as="select" // Use "select" to create a dropdown
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a category</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>
        <Form.Group className="form-group" controlId="description">
          <Form.Label>What did you try and what were you expecting?</Form.Label>
          <Form.Control
            placeholder="Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AskForm;
