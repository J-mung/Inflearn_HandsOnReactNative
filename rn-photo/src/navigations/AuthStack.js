import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUnScreen from '../screens/SignUnScreen';
import { AuthRoutes } from './routes';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthRoutes.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={AuthRoutes.SIGN_UP} component={SignUnScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;