import React, { useState, useEffect } from "react";
import "./Card.css";
import CommentForm from '../CommentForm/CommentForm';
import threadsService from '../../Forum/threads/threadService';

interface User {
  id: number;
  name: string;
  userName: string;
}

interface Thread {
  id: number;
  threadName: string;
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

  return (
    <div className="card-container">
      <div className="card-header">
        <h3 className="card-thread-name">{thread.threadName}</h3>
        <button className="thread-detail-button" onClick={toggleExpand}>
          {isExpanded ? "Hide Details" : "Details"}
        </button>
      </div>
      <div className="card-container-right-section">
        <p>{thread.description}</p>
      </div>
      {isExpanded && (
        <div className="expanded-section">
          <h4>Title: {thread.title}</h4>
          <p>Category: {thread.category}</p>
          <p>Description: {thread.description}</p>
          <p>
            Creator: {thread.creator.name} ({thread.creator.userName})
          </p>
          <p>Creation Date: {formatDate(thread.creationDate)}</p>
          {localComments.length > 0 ? (
            <div className="comments-section">
              <h5>Comments:</h5>
              <ul>
                {localComments.map((comment, index) => (
                  <li key={index}>{comment}</li>
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
