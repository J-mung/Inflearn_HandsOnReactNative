import { useNavigation } from '@react-navigation/native';
import { useReducer, useRef } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '../colors';
import HR from '../components/HR';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import TextButton from '../components/TextButton';
import { AuthRoutes } from '../navigations/routes';
import {
  AuthFormTypes,
  authFormReducer,
  initAuthForm,
} from '../reducers/authFormReducer';
import Button from './Button';

const SignInScreen = ({ navigation }) => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  const updateForm = (payload) => {
    const newForm = { ...form, ...payload };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      newForm.password !== newForm.passwordConfirm;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      console.log(form.email, form.password);
      setTimeout(() => {
        dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      }, 1000);
    }
  };

  return (
    <SafeInputView>
      <StatusBar style={'light'} />
      <View style={[styles.container, { paddingTop: top }]}>
        {/* <Input
        title={'EMAIL'}
        placeholder={'your@email.com'}
        iconName={'email'}
        keyboardType={KeyboardTypes.EMAIL}
      /> */}
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode={'cover'}
          />
        </View>
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
          keyboardShouldPersistTaps={'always'}
        >
          <Input
            inputType={InputTypes.EMAIL}
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordRef}
            inputType={InputTypes.PASSWORD}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.NEXT}
          />
          <Input
            ref={passwordConfirmRef}
            inputType={InputTypes.PASSWORD_CONFIRM}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            onSubmitEditing={onSubmit}
            styles={{ container: { marginTop: 20 } }}
            returnKeyType={ReturnKeyTypes.DONE}
          />

          <Button
            title={'SIGNUP'}
            disabled={form.disabled}
            isLoading={form.isLoading}
            onPress={onSubmit}
            styles={{ container: { marginTop: 20 } }}
          />

          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />

          <TextButton
            title={'SIGNIN'}
            onPress={() => navigate(AuthRoutes.SIGN_IN)}
          />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
  },
  form: {
    flexGrow: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignInScreen;
