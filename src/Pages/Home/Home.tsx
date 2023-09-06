import React, { useEffect, useState } from 'react';
import './Home.css';
import threadsService from '../../Forum/threads/threadService';
import Card from '../../components/Card/Card';
import SortingButton from '../../components/Sorting/SortingButton';
import { UserAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortingOption, setSortingOption] = useState<string>('newest');
  const [sortedThreadList, setSortedThreadList] = useState<Thread[]>([]);
  const { user } = UserAuth();

  /* Mapping Threads */
  useEffect(() => {
    async function fetchThreads() {
      try {
        const threadsData = await threadsService.getThreads();
        setThreadList(threadsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchThreads();
  }, [sortingOption]);

  /* Sorting Threads */
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
        sortedThreadList.map(thread => (
          <Card
            key={`${thread.id}-${thread.title}`}
            thread={thread}
          />
        ))
      ) : (
        <div className="loading-message">Failed to load resources. Please try again later.</div>
      )}
    </div>
  );
};

export default Home;
