import React, { useState, useEffect } from "react";
import "./Card.css";
import CommentForm from '../CommentForm/CommentForm';
import threadsService from '../../Forum/threads/threadService';
import { Button } from "react-bootstrap";

/*fix comments?*/
interface ThreadCardProps {
  thread: Thread;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [localComments, setLocalComments] = useState<string[]>(thread.comments || []);

  useEffect(() => {
    setLocalComments(thread.comments || []);
  }, [thread.comments]);

  const handleCommentSubmit = async (comment: string) => {
    try {
      await threadsService.addCommentToThread(thread.id, comment);

      console.log('Comment added successfully');
      setLocalComments([...localComments, comment]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card-container">
      <h2 className="card-thread-name">{thread.title}</h2>
      <p>{thread.description}</p>
      <Button className="btn btn-warning" onClick={toggleExpand}>
        {isExpanded ? "Hide Details" : "Details"}
      </Button>
      {isExpanded && (
        <div className="expanded-section">   
          <p className="details-section">Category: {thread.category}</p>
          <p className="details-section-description">{thread.description}</p>
          

          {localComments.length > 0 ? (
            <div className="comments-section">
              <h5>Comments:</h5>
              <ul>
                {localComments.map((comment, index) => (
                  <li className="details-comment-section" key={index}>{comment}</li>

                ))}
              </ul>
            </div>
          ) : (
            <p>No comments yet.</p>
          )}
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      )}
      <div className="thread-footer">
        <small className="thread-creator">Thread created by: {thread.creator.displayName}</small>
        <p className="thread-creation-date">Creation Date: {formatDate(thread.creationDate)}</p>
      </div>
    </div>
  );
};

export default ThreadCard;