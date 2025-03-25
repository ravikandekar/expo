import React, { createContext, useState, useContext, useCallback } from 'react';
import { tasks as mockTasks } from '../api/mockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([...mockTasks]); // Create a copy of mock tasks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getTasks = useCallback(async (userId) => {
    try {
      setLoading(true);
      const userTasks = tasks.filter(task => task.userId === userId);
      return userTasks;
    } catch (err) {
      setError('Failed to fetch tasks');
      return [];
    } finally {
      setLoading(false);
    }
  }, [tasks]);

  const addTask = async (userId, title, description) => {
    try {
      setLoading(true);
      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
        userId
      };
      
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      return true;
    } catch (err) {
      setError('Failed to add task');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      setLoading(true);
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      setTasks(updatedTasks);
      return true;
    } catch (err) {
      setError('Failed to update task');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      return true;
    } catch (err) {
      setError('Failed to delete task');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
