import EmptyList from '../components/EmptyList';
import InputFAB from '../components/InputFAB';
import List from '../components/List';

const ListScreen = () => {
  const todos = [
    //{ id: 1, task: 'tete', isDone: false }
  ];

  return (
    <>
      {todos.length ? <List data={todos} /> : <EmptyList />}
      <InputFAB />
    </>
  );
};

export default ListScreen;
