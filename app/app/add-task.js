import { router } from 'expo-router';
import AddTaskScreen from '../../src/screens/AddTaskScreen';

export default function AddTask() {
  return <AddTaskScreen navigation={router} />;
}
