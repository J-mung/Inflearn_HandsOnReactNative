import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Input, { InputTypes } from '../components/Input';
import { AuthRoutes } from '../navigations/routes';
// import PropTypes from 'prop-types';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignInScreen</Text>
      <Button
        title="signup"
        onPress={() => {
          navigation.navigate(AuthRoutes.SIGN_UP);
        }}
      />

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
        styles={inputStyles}
      />
      <Input
        inputType={InputTypes.PASSWORD}
        value={password}
        onChangeText={(text) => setPassword(text.trim())}
        styles={inputStyles}
      />
    </View>
  );
};

SignInScreen.propTypes = {
  // PropTypes
};

const inputStyles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 20 },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default SignInScreen;
