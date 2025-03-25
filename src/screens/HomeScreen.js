import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { FAB, Card, Text, IconButton, useTheme } from 'react-native-paper';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

const HomeScreen = () => {
  const { tasks, getTasks, updateTask, loading } = useTask();
  const { user, logout } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      getTasks(user.id);
    }
  }, [user, getTasks]);

  const userTasks = useMemo(() => {
    return user ? tasks.filter(task => task.userId === user.id) : [];
  }, [user, tasks]);

  const handleLogout = () => {
    logout();
  };

  const handleToggleComplete = async (taskId, completed) => {
    await updateTask(taskId, { completed: !completed });
  };

  const renderTask = ({ item }) => (
    <Card 
      style={[styles.taskCard, item.completed && styles.completedCard]} 
      onPress={() => router.push({
        pathname: '/app/task/[id]',
        params: { id: item.id, task: JSON.stringify(item) }
      })}
    >
      <Card.Content>
        <View style={styles.taskHeader}>
          <Text 
            variant="titleMedium" 
            style={[styles.taskTitle, item.completed && styles.completedText]}
          >
            {item.title}
          </Text>
          <IconButton
            icon={item.completed ? 'check-circle' : 'circle-outline'}
            size={24}
            iconColor={item.completed ? theme.colors.primary : undefined}
            onPress={() => handleToggleComplete(item.id, item.completed)}
          />
        </View>
        <Text 
          variant="bodyMedium" 
          numberOfLines={2} 
          style={[styles.taskDescription, item.completed && styles.completedText]}
        >
          {item.description}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getTasks(user?.id)} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium">No tasks yet</Text>
            <Text variant="bodyMedium">Add your first task by tapping the + button</Text>
          </View>
        )}
      />
      
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/app/add-task')}
      />
      
      <IconButton
        icon="logout"
        size={24}
        style={styles.logoutButton}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  taskCard: {
    marginBottom: 12,
    elevation: 2,
  },
  completedCard: {
    opacity: 0.8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    marginRight: 8,
  },
  taskDescription: {
    marginTop: 4,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  logoutButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
