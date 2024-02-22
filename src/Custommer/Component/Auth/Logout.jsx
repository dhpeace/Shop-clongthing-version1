import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the onLogout prop
    navigate('/login'); // Redirect to login page
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
}

export default Logout;