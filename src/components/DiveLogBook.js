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
      'https://i14lwecdl6.execute-api.eu-west-2.amazonaws.com/test',
	    {
		    method: 'PUT',
		    body: JSON.stringify({"httpMethod":"GET"})}
    );
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      setDives(JSON.parse(data.body)); // Parse the response body
    }
  } catch (error) {
    console.error('Error fetching dives:', error);
  } finally {
    setLoading(false);
  }
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
hasMore={true}
loader={<h4>Loading...</h4>}
>
{dives.map((dive, index) => (
<div className="diveitem" key={index}>
{dive.date}, {dive.time}, {dive.location}, {dive.depth}, {dive.depth}, {dive.length}, {dive.temperature}, {dive.company}, {dive.weather}, {dive.water_temperature}
</div>
))}
</InfiniteScroll>
)}
</div>
);
};

export default DiveLogBook;
