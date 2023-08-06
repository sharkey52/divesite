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

  const fetchDives = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://tzwxxjtn58.execute-api.eu-west-2.amazonaws.com/prod',
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setDives(data);
    } catch (error) {
      console.error('Error fetching dives:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDives();
  }, []);

  const fetchMoreData = () => {
    // Implement this function to fetch more data and append it to the current dives state.
    // You might need a pagination mechanism on the server-side to fetch additional data.
    // For the sake of simplicity, I'll assume this function will not be called in this example.
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    fetchDives();
  };

  return (
    <div className="diveLogBook">
      <button className="addDiveButton" onClick={handleOpenForm}>
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
          hasMore={false} // Set this to true if there's more data to fetch
          loader={<h4>Loading...</h4>}
        >
          {dives.map((dive, index) => (
            <div className="diveitem" key={index}>
              {dive.date}, {dive.time}, {dive.location}, {dive.depth}, {dive.length}, {dive.temperature}, {dive.company}, {dive.weather}, {dive.water_temperature}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default DiveLogBook;

