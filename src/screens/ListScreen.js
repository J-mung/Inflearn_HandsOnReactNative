import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { customAlphabet } from 'nanoid/non-secure';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import 'react-native-get-random-values';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';

const ListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [isBottom, setIsBottom] = useState(false); // 스크롤이 바닥에 도착했는지 여부.
  const { bottom } = useSafeAreaInsets(); // List와 화면 바닥에 공간 생성.
  const { getItem, setItem } = useAsyncStorage('todos');

  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      setTodos(data);
    } catch (e) {
      Alert.alert('저장 실패');
    }
  };

  const load = async () => {
    try {
      const data = await getItem();
      const todos = JSON.parse(data || '[]'); // data가 비었을 때, 빈 배열을 삽입.
      setTodos(todos);
    } catch (e) {
      Alert.alert('불러오기 실패');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onInsert = (task) => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const id = nanoid();
    const newTask = { id, task, isDone: false };
    save([newTask, ...todos]);
  };

  return (
    <SafeAreaProvider>
      <View style={{ paddingBottom: bottom, flex: 1 }}>
        {todos.length ? (
          <List data={todos} setIsBottom={setIsBottom} />
        ) : (
          <EmptyList />
        )}
        <InputFAB onInsert={onInsert} isBottom={isBottom} />
      </View>
    </SafeAreaProvider>
  );
};

export default ListScreen;
