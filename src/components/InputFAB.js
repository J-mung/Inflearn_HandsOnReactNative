import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { PRIMARY, WHITE } from '../colors';

const InputFAB = () => {
  const [text, setText] = useState('');
  const [isOpend, setIsOpened] = useState(false);
  const inputRef = useRef(null);
  const windowWidth = useWindowDimensions().width;

  const open = () => {
    setIsOpened(true);
    inputRef.current.focus();
  };

  const close = () => {
    setIsOpened(false);
    inputRef.current.blur();
  };

  const onPressButton = () => (isOpend ? close() : open());
  return (
    <>
      <View style={[styles.container, isOpend && { width: windowWidth - 20 }]}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          style={styles.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'none'}
          keyboardAppearance={'light'}
          returnKeyType={'done'}
          onBlur={close}
        />
      </View>
      <Pressable
        onPress={onPressButton}
        style={({ pressed }) => [
          styles.container,
          pressed && { backgroundColor: PRIMARY.DARK },
        ]}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 20,
    paddingRight: 70,
    color: WHITE,
  },
});

export default InputFAB;
