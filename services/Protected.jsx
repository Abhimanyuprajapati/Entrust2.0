// src/services/Protected.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Protected = ({ Component }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log('check auth: '+isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      // alert('login page');
    }
  }, [isAuthenticated, navigate]);

  return(
    <>
      <Component />
    </>
  )
};

export default Protected;