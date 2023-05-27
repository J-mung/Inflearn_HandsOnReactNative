import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/Button';

const Operators = {
  CLEAR: 'C',
  MINUS: '-',
  PLUS: '+',
  EQUAL: '=',
};

export default function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const width = (useWindowDimensions().width - 5) / 4;

  const calculate = () => {
    let operator = '';
    let calculatedNumber = 0;

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          // [1, +, 2]
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          // [1, -, 2]
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (num) => {
    const last = formula[formula.length - 1];

    if (isNaN(last)) {
      setResult(num);
      setFormula((prev) => [...prev, num]);
    } else {
      const newNumber = (last ?? 0) * 10 + num;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        break;
      case Operators.EQUAL:
        calculate();
        break;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.resultContainer}>
        <Text style={styles.result}>
          {result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginTop: 1 }}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width }}
            />
            <Button
              title="="
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{ width, height: width }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <View style={styles.operator}>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width, height: width * 2, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
  },
  result: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: '700',
    paddingRight: 30,
    paddingBottom: 30,
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-evenly',
  },
  bottom: { flexDirection: 'row', justifyContent: 'space-evenly' },
  operator: {},
});

/*
#1 rendering
  작성한 코드가 눈으로 볼 수 있도록 화면에 그려지는 것.

#2 re-rendering
  화면을 다시 rendering 하는 것.

  #2-1 re-rendering이 발생하는 조건
    1. 컴포넌트의 상태(state)가 변경.
    2. 컴포넌트의 props가 변경.
    3. 부모 컴포넌트가 re-rendering. 
      (부모: App component, 자식: Button component)
      App component 하단에 2개의 Button component child로 정의되어 있음.
      button을 클릭함으로써 App component의 state가 변경되어 re-rendering이 수행되며,
      re-rendering 발생조건 3.에 의해서 App의 자식 component인 Button이 각가 re-rendering.
      Button component defintion에서 log를 삽입했다면, App이 가지는 자식(Button) 수 만큼
      log가 발생하는 것. 

#참고
  #Props
    - 부모가 전달한 데이터.
    - 관리의 주체가 부모.

  #State
    - 컴포넌트에서 생성/관리 하는 데이터.
    - 관리의 주체가 컴포넌트 자신.

  #구조 분해 할당(Destructuring Assignment)
    const arr = [ 1, 2, 3, 4, 5 ];
    let [a, ...restArr] = arr;
    console.log(a) // 1
    console.log(restArr) // [ 2, 3, 4, 5 ]

    const obj = {
        k1: 1,
        k2: 2,
        k3: 3,
        k4: 4
      };
    let {k2, ...restObj} = obj;
    console.log(k2) // 2
    console.log(restObj) // { k1: 1, K3: 3, K4: 4 }

  #useState의 set method
      비동기적으로 처리되는 set method로 인해서 예상치 못한 error가 발생할 수 있음.
      함수형 업데이트(functional update)로 해결 가능.

      <Button
        ...
        onPress={() => {
          setResult((prev) => { // 상태 변경 이전 값을 prev 매개변수로 받음.
            console.log('1 setResult: ', prev);
            return prev + 1;    // 결과값 반영을 위해 반드시 반환.
          });
          setResult((prev) => {
            console.log('2 setResult: ', prev);
            return prev + 1;
          });
        }}
        ...
      />

      이처럼 component의 state를 관리하는 함수를 "Hook" 이라고 함.

  #Hook
      custom component와 function component에서만 사용.
      function component는 최상단에서만 사용.
*/
