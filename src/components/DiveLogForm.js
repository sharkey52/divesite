import React, { useState, useEffect } from "react";
import axios from "axios";
import Dexie from "dexie";
import "../styles/componentstyles/DiveLogForm.css"; // Import the CSS file

const DiveLogForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    depth: "",
    length: "",
    temperature: "",
    company: "",
    weather: "",
    water_temperature: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "https://v2vb8f6w9a.execute-api.eu-west-2.amazonaws.com/prod/divelogs",
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("Data submitted successfully");
    } catch (error) {
      if (!navigator.onLine) {
        try {
          await saveDataOffline(formData);
          console.log("Data saved offline");
        } catch (offlineError) {
          console.error("Error saving data offline:", offlineError);
        }
      } else {
        console.error("Error submitting data:", error);
      }
    }
  };

  const saveDataOffline = async (data) => {
    const db = new Dexie("DiveLogDB");
    db.version(1).stores({ diveLogs: "++id" });

    await db.diveLogs.add(data);
  };

  const syncData = async () => {
    const db = new Dexie("DiveLogDB");
    db.version(1).stores({ diveLogs: "++id" });

    const unsyncedLogs = await db.diveLogs.toArray();

    for (const log of unsyncedLogs) {
      try {
        await axios.put(
          "https://v2vb8f6w9a.execute-api.eu-west-2.amazonaws.com/prod/divelogs",
          log,
          { headers: { 'Content-Type': 'application/json' } }
        );
        await db.diveLogs.delete(log.id);
        console.log("Offline data synced:", log);
      } catch (error) {
        console.error("Error syncing offline data:", error);
      }
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      syncData();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Depth:</label>
        <input
          type="text"
          name="depth"
          value={formData.depth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Length:</label>
        <input
          type="text"
          name="length"
          value={
formData.length}
onChange={handleChange}
/>
</div>
<div>
<label>Temperature:</label>
<input
       type="text"
       name="temperature"
       value={formData.temperature}
       onChange={handleChange}
     />
</div>
<div>
<label>Company:</label>
<input
       type="text"
       name="company"
       value={formData.company}
       onChange={handleChange}
     />
</div>
<div>
<label>Weather:</label>
<input
       type="text"
       name="weather"
       value={formData.weather}
       onChange={handleChange}
     />
</div>
<div>
<label>Water Temperature:</label>
<input
       type="text"
       name="water_temperature"
       value={formData.water_temperature}
       onChange={handleChange}
     />
</div>
<button type="submit">Submit</button>
</form>
);
};

export default DiveLogForm;
