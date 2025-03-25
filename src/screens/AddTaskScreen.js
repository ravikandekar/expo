import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask, loading } = useTask();
  const { user } = useAuth();

  const handleAddTask = async () => {
    if (title.trim() && description.trim()) {
      const success = await addTask(user.id, title.trim(), description.trim());
      if (success) {
        router.replace('/app');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <TextInput
          label="Task Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={4}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.button}
          >
            Cancel
          </Button>
          
          <Button
            mode="contained"
            onPress={handleAddTask}
            style={styles.button}
            loading={loading}
            disabled={!title.trim() || !description.trim()}
          >
            Add Task
          </Button>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AddTaskScreen;
