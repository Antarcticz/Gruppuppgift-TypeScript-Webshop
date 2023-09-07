import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './CommentForm.css';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(comment);
    setComment('');
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group>
        <Form.Control
          id='comment-form-input'
          as="textarea"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
        />
      </Form.Group>
      <Button className='comment-form-btn' type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
