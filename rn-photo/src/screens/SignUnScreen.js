import { StyleSheet, Text, View } from 'react-native';

const SignUnScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUnScreen</Text>
    </View>
  );
};

SignUnScreen.propTypes = {
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

export default SignUnScreen;
