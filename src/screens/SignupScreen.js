import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, HelperText } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, error, loading, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/app/');
    }
  }, [user]);

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Name validation
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      const success = await signup(name.trim(), email.trim(), password);
      if (success) {
        setName('');
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Surface style={styles.surface}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError('');
          }}
          style={styles.input}
          mode="outlined"
          error={!!nameError}
          disabled={loading}
        />
        <HelperText type="error" visible={!!nameError}>
          {nameError}
        </HelperText>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!emailError}
          disabled={loading}
        />
        <HelperText type="error" visible={!!emailError}>
          {emailError}
        </HelperText>
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
          style={styles.input}
          mode="outlined"
          secureTextEntry
          error={!!passwordError}
          disabled={loading}
        />
        <HelperText type="error" visible={!!passwordError}>
          {passwordError}
        </HelperText>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <Button
          mode="contained"
          onPress={handleSignup}
          style={styles.button}
          loading={loading}
        >
          Sign Up
        </Button>
        
        <Button
          mode="text"
          onPress={() => router.push('/auth/login')}
          style={styles.linkButton}
        >
          Already have an account? Login
        </Button>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  linkButton: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SignupScreen;
