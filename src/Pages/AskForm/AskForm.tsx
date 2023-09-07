import './AskForm.css';
import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import threadsService from '../../Forum/threads/threadService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 

interface Thread {
  title: string;
  category: string;
  creationDate: string;
  description: string;
  creator: {
    uid: string;
    displayName: string;
  };
  comments: string[];
}

const AskForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access user data from your AuthContext

  const initialFormData: Thread = {
    title: '',
    category: '',
    creationDate: '',
    description: '',
    creator: {
      uid: '',
      displayName: user?.displayName || '', // Set the display name from the user if available
    },
    comments: [],
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

    const currentDateTime = new Date().toISOString();
  
    try {
      if (user) {
        // User is authenticated, use their UID and display name
        const userUid = user.uid;
        const userDisplayName = user.displayName || 'Anonymous';

        console.log('User UID:', userUid);
        console.log('User Display Name:', userDisplayName);
  
        await threadsService.createThread({
          ...formData,
          creationDate: currentDateTime,
          creator: {
            uid: userUid,
            displayName: userDisplayName,
          },
        });
  
        console.log('Thread created successfully');
     
        setFormData(initialFormData);
        navigate('/');
      } else {
        console.error('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };
  

  return (
    <div className='page-container'>
      <div className="ask-form-container">
        <h2 className='create-thread-header'>Create a New Thread</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
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
              />
            </Form.Group>
            <Button id='form-button' type="submit">
              Submit
            </Button>
        </Form>
      </div>
    </div>
  );
};

export default AskForm;
