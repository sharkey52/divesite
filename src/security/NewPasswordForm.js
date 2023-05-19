import React, { useState } from 'react';
import handleNewPassword from './NewPasswordHandler';

const NewPasswordForm = ({ username, oldPassword }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewPassword(username, oldPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="password" 
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        placeholder="New password"
      />
      <button type="submit">Submit new password</button>
    </form>
  );
};

export default NewPasswordForm;

