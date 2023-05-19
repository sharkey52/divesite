import React from 'react';

const Dashboard = ({ user, onLogout }) => {
  const userType = user?.userType;

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>User Type: {userType}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

