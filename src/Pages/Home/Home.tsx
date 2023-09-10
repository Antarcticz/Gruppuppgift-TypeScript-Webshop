import React, { Key, useEffect, useState } from 'react';
import './Home.css';
import threadsService from '../../Forum/threads/threadService';
import SortingButton from '../../components/Sorting/SortingButton';
import { useUserAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import  ThreadCard  from '../../components/Card/Card';
import { Thread } from '../../types';



export interface Comment {
  content: string;
  // Add other properties of Comment as needed
}


const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortingOption, setSortingOption] = useState<string>('newest');

  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortedThreadList, setSortedThreadList] = useState<Thread[]>([]);

  const { user } = useUserAuth();

  useEffect(() => {
    async function fetchThreads() {
      try {
        const threadsData = await threadsService.getThreads();
        setThreadList(threadsData as Thread[]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchThreads();
  }, []);
  
  

  useEffect(() => {
  const sortedThreadsCopy = [...threadList];

  if (sortingOption === 'newest') {
    sortedThreadsCopy.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
  } else if (sortingOption === 'noAnswers') {
  } else if (sortingOption === 'latest') {
    sortedThreadsCopy.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
  }

  setSortedThreadList(sortedThreadsCopy);
}, [sortingOption, threadList]);

  
  /*Capital letters*/
  function capitalizeFirstLetter(name: string) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  /*User display expansion*/
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };  

  return (
    <div className='home-container'>
        {user && user.displayName ? (
      <div className={`userDisplay ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
        <h5>Welcome</h5>
        <div className='displayName'>
        {user.photoURL && (
          <div>
            <img className='userImg' src={user.photoURL} alt="User Profile" />
          </div>
        )}
        {capitalizeFirstLetter(user.displayName)}
        <FontAwesomeIcon icon={faArrowDown} className='arrowDown'/>
        </div>
        <h6>Open Threads</h6>
        <div>You have no current threads</div>
      </div>  
      ) : null}
      <div className='sorting-container'>
        <div>
          <h2 className='home-title' style={{color: '#fff'}}>All Questions</h2>
        </div>
        <div>
          <SortingButton onSort={setSortingOption} />
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-message">Loading...</div>
        </div>
      ) : sortedThreadList.length > 0 ? (
        sortedThreadList.map((thread) => (

          <ThreadCard key={thread.id} thread={thread} />

          
        ))
      ) : (
        <div className="loading-message">Failed to load resources. Please try again later.</div>
      )}


      
    </div>
    
  );
};

export default Home;
