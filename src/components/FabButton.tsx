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
  Platform,
  Easing
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCheckbox1,
  toggleCheckbox2
} from '../store/path/to/checkboxSlice ';
import { toogleRefresh } from '../store/path/to/refreshSlice';

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

  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(true);
    setTimeout(() => {
      setShowModal(true);
    }, 100);
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

  const [refreshing] = useState(new Animated.Value(0));

  // Função para lidar com o clique e disparar a animação
  const handleRefresh = () => {
    Animated.timing(refreshing, {
      toValue: 1,
      duration: 1000, // Duração da animação em milissegundos
      useNativeDriver: true // Utiliza o driver nativo para melhor desempenho
    }).start(() => {
      // Reinicie a animação para o estado inicial após a conclusão
      refreshing.setValue(0);
    });
    dispatch(toogleRefresh());
  };

  const refresh = {
    transform: [
      {
        scale: animation
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      },
      {
        rotate: refreshing.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '720deg']
        })
      }
    ]
  };

  const legendRefresh = {
    transform: [
      {
        scale: animation
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }
    ]
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
      <TouchableWithoutFeedback onPress={handleRefresh}>
        <Animated.View
          style={[
            { backgroundColor: '#00213b' },
            styles.button,
            styles.submenu,
            refresh
          ]}
        >
          <Feather name="refresh-cw" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>
      {open ? (
        <Animated.View
          style={[
            {
              backgroundColor: '#00213b',
              position: 'absolute',
              bottom: 140 - 30,
              left: 24 + 10
            }
          ]}
        >
          <Text style={{ color: '#fff', fontSize: 12 }}> Atualizar </Text>
        </Animated.View>
      ) : null}

      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[
            { backgroundColor: isClicked ? '#ccc' : '#00213b' },
            styles.button,
            styles.submenu,
            filter
          ]}
        >
          <Feather
            name="filter"
            size={24}
            color={isClicked ? '#00213b' : '#fff'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      {open ? (
        <Animated.View
          style={[
            {
              backgroundColor: isClicked ? '#ccc' : '#00213b',
              position: 'absolute',
              bottom: 70 - 30,
              left: 24 + 10
            }
          ]}
        >
          <Text style={{ color: isClicked ? '#00213b' : '#fff', fontSize: 12 }}>
            {' '}
            Filtrar{' '}
          </Text>
        </Animated.View>
      ) : null}

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="white" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setShowModal(false);
          setIsClicked(false);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setIsClicked(false);
              }}
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
              onPress={() => {
                setShowModal(false);
                setIsClicked(false);
              }}
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
    borderRadius: 48 / 2
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
