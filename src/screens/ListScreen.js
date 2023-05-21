import { customAlphabet } from 'nanoid/non-secure';
import { useState } from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';

const ListScreen = () => {
  const [todos, setTodos] = useState([
    { id: '1', task: 'task 1', isDone: false },
    { id: '2', task: 'task 2', isDone: false },
    { id: '3', task: 'task 3', isDone: false },
    { id: '4', task: 'task 4', isDone: false },
    { id: '5', task: 'task 5', isDone: false },
    { id: '6', task: 'task 6', isDone: false },
    { id: '7', task: 'task 7', isDone: false },
    { id: '8', task: 'task 8', isDone: false },
    { id: '9', task: 'task 9', isDone: false },
    { id: '10', task: 'task 10', isDone: false },
    { id: '11', task: 'task 11', isDone: false },
    { id: '12', task: 'task 12', isDone: false },
  ]);
  const [isBottom, setIsBottom] = useState(false); // 스크롤이 바닥에 도착했는지 여부.
  const { bottom } = useSafeAreaInsets(); // List와 화면 바닥에 공간 생성.

  const onInsert = (task) => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const id = nanoid();
    const newTask = { id, task, isDone: false };
    setTodos((prev) => [newTask, ...prev]);
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
