import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

// 외부에서 모듈처럼 사용하기 위해서 export
export const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};

const Colors = {
  NUMBER: ['#71717a', '#3f3f46'],
  OPERATOR: ['#f59e0b', '#b45309'],
};
const Button = ({ title, onPress, buttonStyle, buttonType }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
        buttonStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

// 해당 component(s)의 prop(s)를 default로 지정.
Button.defaultProps = {
  buttonType: ButtonTypes.NUMBER,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  // buttonType: PropTypes.oneOf ( Object.values( 'NUMBER', 'OPERATOR')),
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: '#ffffff',
  },
});

// rendering이 수행되야 하는 부분은 export default.
export default Button;

/*
    #1 <TouchableOpacity> 태그)
      button click에 적절한 피드백을 던져주는 wrapper.

    #1 semple code)
      <TouchableOpacity
        onPress={() => console.log('clicked')}
        style={{ backgroundColor: 'blue' }}
      >
        <Text>{title}</Text>
      </TouchableOpacity>

    -----------------------------------------

    #2 <TouchableHighlight> 태그)
      underlayColor prop을 통해서 touch 했을 때의 색상 지정 가능.
    
    #2 semple code)
      <TouchableHighlight
      onPress={() => console.log('clicked')}
      style={{ backgroundColor: 'red' }}
      underlayColor={'blue'}
      >
        <Text>{title}</Text>
      </TouchableHighlight>

      ----------------------------------------

      #3 <Pressable> 태그)
        하단 요소들에서 발생하는 다양한 단계의 press interactions을 감지하는 wrapper

      #3 Semple code)
        <Pressable
          onPress={() => console.log('clicked')}
          // style props에 함수를 전달.
          // 반드시 style code를 return.
          style={({ pressed }) => {
            console.log(pressed);
            return [
              { backgroundColor: 'red' },
              pressed && { backgroundColor: 'orange', opacity: 0.3 },
            ];
          }}
        >
          <Text>{title}</Text>
        </Pressable>

      -----------------------------------------

      #4 <Pressable> 태그의 props)
        onPressIn: button을 눌렀을 때 즉시 호출되며 onPress, onPressOut 보다 먼저 호출.
        onPressOut: button을 뗐을 때 호출.
        onPress: onPressOut 다음으로 호출.
        onLongPress: button을 길게 눌렀을 때 호출 (delay default 1000ms).
        delayLongPress: onLongPress의 지연시간 지정. 

      #4 Semple code)
        <Pressable
          onPressIn={() => console.log('In')}
          onPressOut={() => console.log('Out')}
          onPress={() => console.log('onPress')}
          onLongPress={() => console.log('Long')}
          delayLongPress={2000}
          style={({ pressed }) => [
            { backgroundColor: 'red' },
            pressed && { backgroundColor: 'orange', opacity: 0.3 },
          ]}
        >
          <Text>{title}</Text>
        </Pressable>
    */
