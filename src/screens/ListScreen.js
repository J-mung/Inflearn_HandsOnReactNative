import { customAlphabet } from 'nanoid/non-secure';
import { useState } from 'react';
import 'react-native-get-random-values';
import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';

const ListScreen = () => {
  const [todos, setTodos] = useState([]);

  const onInsert = (task) => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const id = nanoid();
    const newTask = { id, task, isDone: false };
    setTodos((prev) => [newTask, ...prev]);
  };

  return (
    <>
      {todos.length ? <List data={todos} /> : <EmptyList />}
      <InputFAB onInsert={onInsert} />
    </>
  );
};

export default ListScreen;
