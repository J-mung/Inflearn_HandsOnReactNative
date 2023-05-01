import EmptyList from '../components/EmptyList';
import List from '../components/List';

const ListScreen = () => {
  const todos = [{ id: 1, task: 'tete', isDone: false }];

  return todos.length ? <List data={todos} /> : <EmptyList />;
};

export default ListScreen;
