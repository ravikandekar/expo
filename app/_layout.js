import { useEffect } from 'react';
import { Slot, Stack, Redirect, useSegments, useRouter } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { TaskProvider } from '../src/context/TaskContext';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { user, loading, isInitialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === 'auth';

    if (user && inAuthGroup) {
      router.replace('/app');
    } else if (!user && !inAuthGroup) {
      router.replace('/auth/login');
    }
  }, [user, segments, isInitialized]);

  if (!isInitialized || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" options={{ animation: 'fade' }} />
      <Stack.Screen name="app" options={{ animation: 'fade' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <TaskProvider>
          <RootLayoutNav />
        </TaskProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
