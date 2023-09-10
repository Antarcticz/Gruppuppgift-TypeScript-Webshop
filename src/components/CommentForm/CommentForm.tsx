import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './CommentForm.css';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(comment);
    setComment('');
  };

  return (
    <Form id='comment-form-wrapper' onSubmit={handleCommentSubmit}>
      <Form.Group controlId="comment">
        <Form.Control
          className='comment-form-input'
          as="textarea"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
        />
      </Form.Group>
      <Button className='comment-form-btn mx-3' type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;