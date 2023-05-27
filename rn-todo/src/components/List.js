import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { GRAY } from '../colors';
import ListItem from './ListItem';

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const List = ({ data, setIsBottom, onDelete, onToggle }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      windowSize={5} // prev : 2, cur: 1, next: 2
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
      /*
        onScroll
        contentOffset.y : 스크롤의 높이 (스크롤의 가장 위쪽과 화면 위쪽 사이의 거리)
        layoutMeasurement.height: 화면의 높이
        contentSize.height: 목록 전체의 높이

        목록 전체의 높이 - 화면의 높이 = 남아있는 화면의 높이
        (남아있는 화면의 높이 - 스크롤의 높이)가 0이면 스크롤이 바닥에 있는 것.
        따라서, 목록 전체의 높이 - (화면의 높이 + 스크롤 높이) = 0 이면 스크롤이 바닥.
      */
      onScroll={({
        nativeEvent: { contentSize, contentOffset, layoutMeasurement },
      }) => {
        const distance =
          contentSize.height - (contentOffset.y + layoutMeasurement.height);
        setIsBottom(!(distance > 20 || contentOffset.y === 0));
      }}
    />
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  setIsBottom: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;
