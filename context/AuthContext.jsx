// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const API_URL = "http://10.10.7.25.:8000";
const API_URL = "http://10.10.0.29:8000";
// console.log("API_URL:", API_URL);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginWithEmail = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response && response.data) {
        console.log("Response: ", response);
        console.log("Response Data: ", response.data);
        console.log("Token: ", response.data.token);
      
        // Store token and user ID in local storage
        const token = response.data.token;
        const decoded = jwtDecode(token);

        console.log("decoded",decoded);
        localStorage.setItem("token", response.data.token);
        console.log(decoded.sub);
        localStorage.setItem("username", decoded.sub);
        setIsAuthenticated(true);
      } else {
        console.error("Invalid response format or no data found.");
      }
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${API_URL}/forgot-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const logout = async (data) => {
    const localStorageToken = localStorage.getItem('token');
    try {
      const response = await axios.post(`${API_URL}/logout`, data, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorageToken}`,
         },
      });
      // console.log(response); 
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout error");
    }
  };

  const createProject = async (data) => {
    try {
      // const token = localStorage.getItem("access-token");
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ5ZXNoLnYiLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDQzNTM4N30.AKc4RFokTSxIR5NQaCXK9KAO55H8avvVCqyylfc3UZc"; 
      const API_URL = 'http://10.10.0.29:50005/project/create_project'; // Ensure this is correct

      console.log("Token:", token); // Debugging: log the token
      console.log("Headers:", {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      });

      // const response = await axios.post(`${API_URL}/create_project/`, data, {
      const response = await axios.post(`${API_URL}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in createProject:", error.response || error.message);
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };


  const createCase = async (data) => {
    try {
      // const token = localStorage.getItem("access-token");
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGlubWF5Lm4iLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDMyNzI1NH0.vp7iS-A1M1lyTNc7g2x_llozJt7I_3UTQs6RO4lwDyo";
      const response = await axios.post(`${API_URL}/case/create_case`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const getAllCases = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGlubWF5Lm4iLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDM0MDA0OH0.8-yxhxh1KzsL1s5pt1emnx7fnktyRT15dEE_0wf-qK4"; 
      // const API_URL = 'your_api_url_here'; 
      // const Client ID = 790;
      const response = await axios.get(`${API_URL}/case/cases/790`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  }

  const getAllProjects = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ5ZXNoLnYiLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDQzNTM4N30.AKc4RFokTSxIR5NQaCXK9KAO55H8avvVCqyylfc3UZc"; 
      const API_URL = 'http://10.10.0.29:8000';  // Use the correct API URL
      const CLIENT_ID = 790;  // If needed for your API call
    
      const response = await axios.get(`${API_URL}/projects/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      console.log("Response Trying to send = " + response.data);
      
      // Check if response.data is an array and return it, or return an empty array if not
      return Array.isArray(response.data) ? response.data : [];
      
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  }  

  const getSingleCase = async (case_id) => {
    try{
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaGlubWF5Lm4iLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDM0MDA0OH0.8-yxhxh1KzsL1s5pt1emnx7fnktyRT15dEE_0wf-qK4"; 
      // const API_URL = 'your_api_url_here'; 
      // const caseId = 790;
      const response = await axios.get(`${API_URL}/case/cases/790/${case_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    }catch(error){
      throw new Error(error.response?.data?.message || "Connection error");
    }
  }

  const getSingleProject = async (projectId) => {
    try {
      // const token = localStorage.getItem("token"); 
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaXZ5ZXNoLnYiLCJpc3MiOiJFbnRydXN0Mklzc3VlciIsImV4cCI6MTcyNDQzNTM4N30.AKc4RFokTSxIR5NQaCXK9KAO55H8avvVCqyylfc3UZc"; 
      const API_URL = 'http://10.10.0.29:8000';  // Use the correct API URL
      const response = await axios.get(`${API_URL}/projects/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      return response.data[0];
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };
  

  const uploadFile = async (data) => {
    try {
      // Make the request to upload the file
      const response = await axios.post(`${API_URL}/uploadfiles`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginWithEmail,
        forgotPassword,
        register,
        logout,
        createProject,
        createCase,
        getAllCases,
        getAllProjects,
        getSingleCase,
        getSingleProject,
        uploadFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
