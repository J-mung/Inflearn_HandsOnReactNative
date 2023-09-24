import t from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const deviceHeight = Dimensions.get('window').height;

class MyModal extends React.Component {
  static propTypes = {
    children: t.node.isRequired,
    visible: t.bool.isRequired,
    dismiss: t.func.isRequired,
    transparent: t.bool,
    animationType: t.string,
    modalHeight: t.number,
  };

  static defaultProps = {
    animationType: 'none',
    transparent: true,
  };

  render() {
    const { props } = this;
    return (
      <View>
        <Modal
          visible={props.visible}
          transparent={props.transparent}
          onRequestClose={props.dismiss}
          animationType={props.animationType}
        >
          <TouchableWithoutFeedback onPress={props.dismiss}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.modalContent,
              {
                height: props.modalHeight,
                bottom: -(deviceHeight - props.modalHeight),
              },
            ]}
          >
            {props.children}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    // margin: '5%',
    backgroundColor: 'skyblue',
    // bottom: -(deviceHeight / 2),
    // height: deviceHeight / 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default MyModal;
