import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className="comment-form">
      <input 
        type="text" 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Your comment" 
      />
      <button onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
};

export default CommentForm;
