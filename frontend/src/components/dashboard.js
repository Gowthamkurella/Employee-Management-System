import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in
    const navigate = useNavigate();
  
    useEffect(() => {
      // Here, you'd check if the session exists. For now, we'll mock it.
      // If no session, redirect to the error page
      if (!isLoggedIn) {
        navigate('/error');
      }
    }, [isLoggedIn, navigate]);
    const user = localStorage.getItem('user');
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user}</p>
      {/* Additional dashboard content */}
    </div>
  );
}

export default Dashboard;
