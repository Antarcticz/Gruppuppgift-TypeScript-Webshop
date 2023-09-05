import React, { useEffect, useState } from 'react';
import './Home.css';
import threadsService from '../../store/threads/threadService';
import Card from '../../components/Card/Card';
import SortingButton from '../../components/Sorting/SortingButton';

const Home = () => {
  const [threadList, setThreadList] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortingOption, setSortingOption] = useState<string>('newest');
  const [sortedThreadList, setSortedThreadList] = useState<Thread[]>([]);

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
      // Implement sorting logic for no answers
    } else if (sortingOption === 'latest') {
      sortedThreadsCopy.sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());
    }

    setSortedThreadList(sortedThreadsCopy);
  }, [sortingOption, threadList]);
  

  return (
    <div className='home-container'>
      <div className='sorting-container'>
        <div>
          <h2 className='home-title'>All Questions</h2>
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
