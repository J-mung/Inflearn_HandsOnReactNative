import { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PRIMARY } from '../colors';
import MyModal from './MyModal';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const DrawerState = {
  ShortOpen: deviceHeight * 0.4,
  Open: deviceHeight * 0.6,
};
const EmptyList = () => {
  const [modalY, setModalY] = useState(new Animated.Value(-deviceHeight));
  const [defaultHeight, setDefaultHeight] = useState(DrawerState.ShortOpen);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openMyModal = () => {
    setIsModalVisible(true);
  };

  const closeMyModal = () => {
    setIsModalVisible(false);
    setDefaultHeight(DrawerState.ShortOpen);
    console.log('close');
  };

  const increaseMyModal = () => {
    setDefaultHeight(DrawerState.Open);
    console.log('increase');
  };
  const decreaseMyModal = () => {
    setDefaultHeight(DrawerState.ShortOpen);
    console.log('decrease');
  };

  const openModal = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: -deviceHeight,
      useNativeDriver: true,
    }).start();
  };

  const onClickHeightHandler = () => {
    if (defaultHeight === DrawerState.ShortOpen) {
      setDefaultHeight(DrawerState.Open);
    } else {
      setDefaultHeight(DrawerState.ShortOpen);
    }
  };

  const decreaseHeight = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: -(DrawerState.Open - 100),
      useNativeDriver: true,
    }).start();
  };

  const increaseHeight = () => {
    Animated.timing(modalY, {
      duration: 500,
      toValue: -(deviceHeight * 0.4 + 100),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/main.png')} style={styles.image} />
      <Text style={styles.title}>할 일을 추가해주세요.</Text>
      <View>
        <TouchableOpacity onPress={openMyModal}>
          <Text>Button</Text>
        </TouchableOpacity>
      </View>
      <MyModal
        animationType={'fade'}
        visible={isModalVisible}
        dismiss={closeMyModal}
        modalHeight={defaultHeight}
      >
        <Text>Hello this is modal</Text>
        <TouchableOpacity onPress={closeMyModal}>
          <Text>close modal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={increaseMyModal}>
          <Text>increase modal height</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseMyModal}>
          <Text>decrease modal height</Text>
        </TouchableOpacity>
      </MyModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: PRIMARY.DARK,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonClose: {
    backgroundColor: 'red',
    alignItems: 'center',
    height: 60,
    width: 200,
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyList;
