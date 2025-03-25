import { router } from 'expo-router';
import SignupScreen from '../../src/screens/SignupScreen';

export default function Signup() {
  return <SignupScreen navigation={router} />;
}
