import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import DiveLogForm from './DiveLogForm';
import LoadingScreen from '../LoadingScreen';
import '../styles/componentstyles/DiveLogBook.css';

const DiveLogBook = () => {
  const [dives, setDives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);

  // Generate 33 dummy dive data
  const dummyDives = Array.from({length:133}, (_, index) => ({
    date: `2022-12-${index + 1 < 10 ? '0' + (index + 1) : index + 1}`,
    location: ["Beach", "Cave", "Reef"][index % 3],
    depth: `${20 + (index % 10)}m`,
  }));

  const fetchDives = async () => {
    setLoading(true);
    setTimeout(() => {
      setDives(dummyDives);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchDives();
  }, []);

  const fetchMoreData = () => {};

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    fetchDives();
  };

  return (
    <div className="diveLogBook">
      <button 
        className="addDiveButton"
        onClick={handleOpenForm}
      >
        +
      </button>
      <Modal 
        isOpen={isFormOpen} 
        onRequestClose={handleCloseForm} 
        contentLabel="Dive Log Form"
      >
        <DiveLogForm />
      </Modal>
      {loading ? (
        <LoadingScreen /> 
      ) : (
        <InfiniteScroll
          dataLength={dives.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {dives.map((dive, index) => (
            <div className='diveitem' key={index}>
              {dive.date}, {dive.location}, {dive.depth}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default DiveLogBook;

