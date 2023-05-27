import { StyleSheet, Text } from 'react-native';
//import PropTypes from 'prop-types';

const Button = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button</Text>
    </View>
  );
};

Button.propTypes = {
  // PropTypes
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

export default Button;
