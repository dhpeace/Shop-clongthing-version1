import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Logout = ({ onLogout }) => {
  let navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3">
      Logout
    </button>
  );
};
Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
