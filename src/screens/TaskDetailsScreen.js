import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Surface, IconButton, Dialog, Portal, Text } from 'react-native-paper';
import { useTask } from '../context/TaskContext';
import { router, useLocalSearchParams } from 'expo-router';

const TaskDetailsScreen = () => {
  const { task: taskParam } = useLocalSearchParams();
  const task = JSON.parse(taskParam);
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { updateTask, deleteTask, loading } = useTask();

  const handleUpdate = async () => {
    if (title.trim() && description.trim()) {
      const success = await updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
      });
      if (success) {
        router.replace('/app');
      }
    }
  };

  const handleDelete = async () => {
    const success = await deleteTask(task.id);
    if (success) {
      router.replace('/app');
    }
  };

  const handleToggleComplete = async () => {
    await updateTask(task.id, { completed: !task.completed });
    router.replace('/app');
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        {isEditing ? (
          <>
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
                onPress={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setIsEditing(false);
                }}
                style={styles.button}
              >
                Cancel
              </Button>
              
              <Button
                mode="contained"
                onPress={handleUpdate}
                style={styles.button}
                loading={loading}
                disabled={!title.trim() || !description.trim()}
              >
                Save
              </Button>
            </View>
          </>
        ) : (
          <>
            <View style={styles.header}>
              <Text 
                style={[styles.title, task.completed && styles.completedText]}
                variant="headlineMedium"
              >
                {task.title}
              </Text>
              <View style={styles.actions}>
                <IconButton
                  icon="pencil"
                  size={24}
                  onPress={() => setIsEditing(true)}
                />
                <IconButton
                  icon="delete"
                  size={24}
                  onPress={() => setShowDeleteDialog(true)}
                />
              </View>
            </View>
            
            <Text 
              style={[styles.description, task.completed && styles.completedText]}
              variant="bodyLarge"
            >
              {task.description}
            </Text>
            
            <Button
              mode="contained"
              onPress={handleToggleComplete}
              style={styles.completeButton}
              icon={task.completed ? 'check-circle' : 'circle-outline'}
            >
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
          </>
        )}
      </Surface>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Are you sure you want to delete this task?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={handleDelete} loading={loading}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
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
  completeButton: {
    marginTop: 16,
  },
  dialogText: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default TaskDetailsScreen;
