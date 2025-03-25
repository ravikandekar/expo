import { router } from 'expo-router';
import LoginScreen from '../../src/screens/LoginScreen';

export default function Login() {
  return <LoginScreen navigation={router} />;
}
