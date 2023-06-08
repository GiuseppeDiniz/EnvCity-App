import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCheckbox1,
  toggleCheckbox2
} from '../../store/path/to/checkboxSlice ';

const ModalforChceck = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(isOpen);

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

  return (
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
  );
};

export default ModalforChceck;

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
