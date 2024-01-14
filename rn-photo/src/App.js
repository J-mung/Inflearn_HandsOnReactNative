import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { UserProvier } from './contexts/UserContext';
import Navigation from './navigations';

const App = () => {
  LogBox.ignoreLogs(['@firebase/auth: Auth ']);

  return (
    <UserProvier>
      <StatusBar style={'dark'} />
      <Navigation />
    </UserProvier>
  );
};

export default App;
