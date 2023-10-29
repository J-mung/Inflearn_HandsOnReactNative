import { StyleSheet, Text, View } from 'react-native';

/*
  const [state, dispatch] = useReducer(reducer, initState)

  state : 상태 변수
  dispatch : reducer로 action을 전달하는 함수
  action : 현재 상태를 어떻게 변경해야 하는지에 대한 행동 지침
  reducer : state와 action을 받아서 변경된 상태를 반환하는 함수
*/

const ReducerTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReducerTest</Text>
    </View>
  );
};

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

export default ReducerTest;
