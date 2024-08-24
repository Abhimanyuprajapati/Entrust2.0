// src/services/Redirect.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Redirect = ({ Component }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log("this is redireact",isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return(
    <>
      <Component />
    </>
  )
};

export default Redirect;