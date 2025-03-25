import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users, generateToken } from '../api/mockData';
import { router } from 'expo-router';

const AuthContext = createContext();

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError('');

      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        return false;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return false;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      
      // Simulate API call
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      if (foundUser) {
        const token = generateToken(foundUser);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError('');

      // Validate inputs
      if (!name || !email || !password) {
        setError('All fields are required');
        return false;
      }

      if (name.trim().length < 2) {
        setError('Name must be at least 2 characters long');
        return false;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return false;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }

      // Check if user already exists (case-insensitive email check)
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError('Email is already registered');
        return false;
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      };

      users.push(newUser);
      const token = generateToken(newUser);
      
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
      router.replace('/auth/login');
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        router.replace('/app/');
      } else {
        router.replace('/auth/login');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      router.replace('/auth/login');
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        login,
        isInitialized,
        signup,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
