// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const API_URL = "http://10.10.7.81:8000";
// console.log("API_URL:", API_URL);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginWithEmail = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response);
      if (response.data.error === false) {
        console.log(response + "----" + response.data + "----" + response.data.token)
        localStorage.setItem("access-token", response.data.data.accessToken);
        localStorage.setItem("id", response.data.data.userID);
        setIsAuthenticated(true);
        refresh();
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
    try {
      const response = await axios.post(`${API_URL}/logout`, data, {
        headers: { "Content-Type": "application/json" },
      });
      // console.log(response); 
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout error");
    }
  };

  const createProject = async (data) => {
    try {
      const token = localStorage.getItem("access-token");
      // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb29qYS5hYyIsImlzcyI6IkVudHJ1c3QySXNzdWVyIiwiZXhwIjoxNzIzNzg0Mzg5fQ.TbXHtgJipXKzgEptRswT-OUVkPVluSqupf8raq0guYc";
      const response = await axios.post(`${API_URL}/project/create_project/`, data, {
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

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
