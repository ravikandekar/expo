import { router, useLocalSearchParams } from 'expo-router';
import TaskDetailsScreen from '../../../src/screens/TaskDetailsScreen';

export default function TaskDetails() {
  const { task } = useLocalSearchParams();
  return <TaskDetailsScreen />;
}
