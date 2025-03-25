import { router } from 'expo-router';
import HomeScreen from '../../src/screens/HomeScreen';

export default function Home() {
  return <HomeScreen navigation={router} />;
}
