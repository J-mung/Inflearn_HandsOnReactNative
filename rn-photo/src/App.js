import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { initFirebase } from './api/firebase';
import Navigation from './navigations';

const App = () => {
  LogBox.ignoreLogs(['@firebase/auth: Auth ']);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Asset.fromModule(require('../assets/cover.png')).downloadAsync();

        const app = initFirebase();
        console.log('>>> app: ', app);
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onReady}>
      <StatusBar style={'dark'} />
      <Navigation />
    </View>
  );
};

export default App;
