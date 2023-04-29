import PropTypes from 'prop-types';
import { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const ListItem = memo(({ item }) => {
  console.log(item);
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 20 }}>{item.task}</Text>
    </View>
  );
});

const ListScreen = () => {
  const todos = [];
  for (let i = 1; i < 501; i++) {
    todos.push({ id: i, task: `task ${i}`, number: i });
  }

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.number.toString()}
      windowSize={5} // prev : 10, cur: 1, next: 10
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

ListScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ListScreen;
