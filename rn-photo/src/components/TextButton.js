import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text } from 'react-native';
import { PRIMARY } from '../colors';

const TextButton = ({ styles, title, onPress, hitSlop }) => {
  return (
    <Pressable
      style={styles?.button}
      hitSlop={hitSlop ? hitSlop : 10}
      onPress={onPress}
    >
      <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
    </Pressable>
  );
};

TextButton.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func,
  hitSl: PropTypes.number,
  // PropTypes
};

const defaultStyles = StyleSheet.create({
  title: {
    color: PRIMARY.DEFAULT,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default TextButton;
