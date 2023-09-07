import './AskForm.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import threadsService from '../../Forum/threads/threadService';
import { useNavigate } from 'react-router-dom';


interface Thread {
  threadName: string;
  id: number;
  title: string;
  category: string;
  creationDate: Number;
  description: string;
  creator: User;
  comments: string[];
}

const AskForm: React.FC = () => {
  const navigate = useNavigate()

  const initialFormData: Thread = {
    id: Date.now(), //Generate this dynamically?
    threadName: '',
    title: '',
    category: '', // Replace with the default category?
    creationDate: Date.now(), //Generate this dynamically?
    description: '',
    creator: {
      id: Date.now(), //Generate this dynamically?
      name: '',
      userName: '',
      password: '',
      email: '',
    },
    comments: [] 
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

  const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  // Set the creation date to the current date and time
  const currentDateTime = new Date().toISOString();

  try {
    await threadsService.createThread({
      ...formData,
      creationDate: currentDateTime,
      comments: [],  // Set the creationDate here
    });
    console.log('Thread created successfully');
    // Reset the form fields
    setFormData(initialFormData);
  } catch (error) {
    console.error('Error creating thread:', error);
  }

  navigate('/');
};

   

  return (
    <div className='page-container'>
      <div className="ask-form-container">
        <h2 className='create-thread-header'>Create a New Thread</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='form-group' controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              id='ask-form-input'
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              id='ask-form-input'
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              id='ask-form-input'
            />
          </Form.Group>
            <Button id='form-button' type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default AskForm;