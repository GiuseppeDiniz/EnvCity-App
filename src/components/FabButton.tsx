import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  View,
  StyleProp,
  ViewStyle,
  Modal,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCheckbox1,
  toggleCheckbox2
} from '../store/path/to/checkboxSlice ';

interface FabButtonProps {
  style?: StyleProp<ViewStyle>;
}

const FabButton: React.FC<FabButtonProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const { checkbox1, checkbox2 } = useSelector(
    (state: CheckboxState) => state.checkbox
  );
  const dispatch = useDispatch();

  const handleCheckbox1 = () => {
    dispatch(toggleCheckbox1());
  };

  const handleCheckbox2 = () => {
    dispatch(toggleCheckbox2());
  };

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true
    }).start();
    setOpen(!open);
  };

  const filter = {
    transform: [
      {
        scale: animation
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70]
        })
      }
    ]
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <Animated.View style={[styles.button, styles.submenu, filter]}>
          <Feather name="filter" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={24} color="#00213b" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Componentes:</Text>

            <View style={styles.separator} />

            <View style={styles.checkbox}>
              <Checkbox
                style={styles.checkbox}
                value={checkbox1}
                onValueChange={handleCheckbox1}
                color={checkbox1 ? '#4630EB' : undefined}
              />
              <Text style={styles.checkboxText}>Air Quality</Text>
            </View>

            <View style={styles.checkbox}>
              <Checkbox
                style={styles.checkbox}
                value={checkbox2}
                onValueChange={handleCheckbox2}
                color={checkbox2 ? '#4630EB' : undefined}
              />
              <Text style={styles.checkboxText}>Water Quality</Text>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute'
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: '#00213b',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
      width: 0
    }
  },
  menu: {
    backgroundColor: '#00213b'
  },
  submenu: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#00213b'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    ...Platform.select({
      ios: {
        width: '80%'
      },
      android: {
        width: '80%'
      },
      web: {
        width: '30%'
      }
    }),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16
  },
  applyButton: {
    backgroundColor: '#00213b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 10
  }
});
