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
  const buttonRotation = useRef(new Animated.Value(0)).current;
  // Animate에는 문자열을 값으로 전달할 수 없으므로, interpolate 사용.
  const spin = buttonRotation.interpolate({
    // Value가 0일 때, '0deg', value가 1일 때 '315deg'
    inputRange: [0, 1],
    outputRange: ['0deg', '315deg'],
  });

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
    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20, // animation 튕김 정도.
    }).start();
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
    Animated.spring(buttonRotation, {
      toValue: 0,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const onPressButton = () => (isOpend ? close() : open());

  useEffect(() => {
    if (Platform.OS === 'ios') {
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
    }
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

      <Animated.View
        style={[
          styles.container,
          { bottom: keyboardHeight, transform: [{ rotate: spin }] },
        ]}
      >
        <Pressable
          onPress={onPressButton}
          style={({ pressed }) => [
            styles.container,
            { right: 0 },
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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
