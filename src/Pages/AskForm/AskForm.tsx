import './AskForm.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import threadsService from '../../store/threads/threadService';


interface Thread {
  threadName: string | number | string[] | undefined;
  id: number;
  title: string;
  category: string;
  creationDate: string;
  description: string;
  creator: User;
}

const AskForm: React.FC = () => {

  const initialFormData: Thread = {
    id: 0, //Generate this dynamically?
    threadName: '',
    title: '',
    category: '', // Replace with the default category?
    creationDate: '', //Generate this dynamically?
    description: '',
    creator: {
      id: 0,
      name: '',
      userName: '',
      password: '',
      email:''
    },
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

    try {
      await threadsService.createThread(formData);
      console.log('Thread created successfully');
      // Reset the form fields
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

    return (
      <div className="ask-form-container">
        <h2 className='create-thread-header'>Create a New Thread</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group className='form-group' controlId="threadName">
            <Form.Control
              type="text"
              name="threadName"
              value={formData.threadName}
              onChange={handleInputChange}
              required
              placeholder='Thread name'
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="title">
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder='Title'
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="category">
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              placeholder='Category'
            />
          </Form.Group>
          <Form.Group className='form-group' controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button id='form-button' type="submit">Submit</Button>
        </Form>
      </div>
    );
  };

export default AskForm;
