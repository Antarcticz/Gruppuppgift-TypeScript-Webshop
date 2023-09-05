import './Card.css';

interface Thread {
  id: number;
  threadName: string;
  description: string;
}

const Card: React.FC<{ thread: Thread }> = ({ thread }) => {

  return (
    <div className='card-container'>
      <div className='card-container-left-section'>
        <h3 className="card-thread-name">{thread.threadName}</h3>
      </div>
      <div className='card-container-right-section'>
        <p>{thread.description}</p>
        <button className='thread-detail-button'>Details</button>
      </div>
    </div>
  );
};

export default Card;
