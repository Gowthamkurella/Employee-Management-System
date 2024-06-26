import React, { useEffect, useState } from 'react';
import CustomAppBar from './appbar';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from './loading';

function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://employee-management-system-three-kappa.vercel.app/dashboard', {
          method: 'GET',
          credentials: 'include', // Important for sending cookies
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setUserDetails(data.userDetails);
        } else {
          navigate('/'); // Redirect if not authenticated
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        navigate('/'); // Redirect in case of failure
      }
      setIsLoading(false); 
    };

    fetchUserDetails();
  }, [navigate]);

  if (isLoading) {
    return <LoadingIndicator />;
  }


  return (
    <>
    <CustomAppBar username={userDetails.username.f_userName} />
    <Box sx={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '100vh' // This will make it center vertically as well
}}>
  <Typography variant="h2" component="h1" sx={{ 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'black' // Adjust the color according to your theme
  }}>
    Welcome to the Admin Panel
  </Typography>
</Box>
  </>
  );
}

export default Dashboard;
