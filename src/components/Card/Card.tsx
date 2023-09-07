import React, { useState, useEffect } from "react";
import "./Card.css";
import CommentForm from '../CommentForm/CommentForm';
import threadsService from '../../Forum/threads/threadService';
import { UserAuth } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';



interface Thread {
  id: number;
  title: string;
  category: string;
  creationDate: string;
  description: string;
  creator: User;
  comments?: string[];
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

const Card: React.FC<{ thread: Thread }> = ({ thread }) => {
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

  const { user } = UserAuth();

  return (
    <div className="card-container">
      <div className="card-header">
        <h3 className="card-thread-name">{thread.title}</h3>
        <Button className="btn btn-warning" onClick={toggleExpand}>
          {isExpanded ? "Hide Details" : "Details"}
        </Button>
      </div>
      <div className="card-container-right-section">
        <p>{thread.description}</p>
      </div>
      {isExpanded && (
        <div className="expanded-section">
          <p className="details-section">Creator: {user.displayName}</p>
          <p className="details-section">Category: {thread.category}</p>
          <div className="expanded-section-top">
            <p className="details-section">Creation Date: {formatDate(thread.creationDate)}</p>
          </div>
          <p className="details-section-description">{thread.description}</p>
          {localComments.length > 0 ? (
            <div className="comments-section">
              <h5>Comments:</h5>
              <ul>
                {localComments.map((comment, index) => (
                  <li className="details-comment-section" key={index}>{user && user.displayName ? (
                    <div>
                      <div className="d-flex justify-content-flex-start align-items-center pb-3">
                        {user.photoURL && (
                          <div>
                            <img className='userImg' src={user.photoURL} alt="User Profile" />
                          </div>
                        )}
                        {(user.displayName)}
                      </div>
                    </div>
                  ) : null}{comment}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No comments yet.</p>

          )}
          <CommentForm onSubmit={handleCommentSubmit} />
        </div>
      )}
    </div>
  );
};

export default Card;