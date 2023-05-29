import { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input, { InputTypes } from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import Button from './Button';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      console.log(email, password);
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={[styles.container, { paddingTop: top }]}>
        {/* <Input
        title={'EMAIL'}
        placeholder={'your@email.com'}
        iconName={'email'}
        keyboardType={KeyboardTypes.EMAIL}
      /> */}
        <Input
          inputType={InputTypes.EMAIL}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          onSubmitEditing={() => passwordRef.current.focus()}
          styles={{ container: { marginTop: 20 } }}
        />
        <Input
          ref={passwordRef}
          inputType={InputTypes.PASSWORD}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          onSubmitEditing={onSubmit}
          styles={{ container: { marginTop: 20 } }}
        />

        <Button
          title={'SIGNIN'}
          disabled={disabled}
          isLoading={isLoading}
          onPress={onSubmit}
          styles={{ container: { marginTop: 20 } }}
        />
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
  },
});

export default SignInScreen;
