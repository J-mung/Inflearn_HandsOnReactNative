import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';

const BOTTOM = 30;
const BUTTON_WIDTH = 60;

const InputFAB = () => {
  const [text, setText] = useState('');
  const [isOpend, setIsOpened] = useState(false);
  const inputRef = useRef(null);
  const windowWidth = useWindowDimensions().width;
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM);

  // current를 마지막에 붙임으로써 사용할 때마다 .current를 사용하는 불편이 줄음
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      // animation 효과가 native level에서 동작할지 결정하는 것.
      useNativeDriver: false, // layout을 수정할 때는 false.
      duration: 300, // animation이 수행되는 시간.
    }).start(() => {
      // animation이 끝나고 수행할 코드 작성.
      inputRef.current.focus();
    });
  };

  const close = () => {
    setIsOpened(false);

    Animated.timing(inputWidth, {
      toValue: BUTTON_WIDTH,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.blur();
    });
  };

  const onPressButton = () => (isOpend ? close() : open());

  useEffect(() => {
    const show = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hide = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardHeight(BOTTOM);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          styles.shadow,
          {
            bottom: keyboardHeight,
            alignItems: 'flex-start',
            width: inputWidth,
          },
        ]}
      >
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
      </Animated.View>
      <Pressable
        onPress={onPressButton}
        style={({ pressed }) => [
          styles.container,
          { bottom: keyboardHeight },
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
    bottom: BOTTOM,
    right: 10,
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
    color: WHITE,
  },
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
});

export default InputFAB;
