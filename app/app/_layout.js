import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../src/context/AuthContext';
import { Appbar } from 'react-native-paper';

export default function AppLayout() {
  const theme = useTheme();
  const { logout } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route, options }) => (
          <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
            {navigation.canGoBack() && (
              <Appbar.BackAction 
                color="white" 
                onPress={navigation.goBack} 
              />
            )}
            <Appbar.Content 
              title={options.title || route.name} 
              color="white"
            />
            {route.name === 'index' && (
              <Appbar.Action 
                icon="logout" 
                color="white" 
                onPress={logout} 
              />
            )}
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'My Tasks',
          headerBackVisible: false,
        }} 
      />
      <Stack.Screen 
        name="add-task" 
        options={{ 
          title: 'Add New Task',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }} 
      />
      <Stack.Screen 
        name="task/[id]" 
        options={{ 
          title: 'Task Details',
          presentation: 'card',
          animation: 'slide_from_right',
        }} 
      />
    </Stack>
  );
}
