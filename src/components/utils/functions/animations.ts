import { Animated } from 'react-native';

export const toggleMenuAnimation = (open, animation, setOpen) => {
  const toValue = open ? 0 : 1;
  Animated.spring(animation, {
    toValue,
    friction: 6,
    useNativeDriver: true
  }).start();
  setOpen(!open);
};

export const refreshAnimation = (refreshing) => {
  Animated.timing(refreshing, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true
  }).start(() => {
    refreshing.setValue(0);
  });
};

export const getRefreshTransform = (animation, refreshing) => {
  return {
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
          outputRange: ['0deg', '360deg']
        })
      }
    ]
  };
};

export const getFilterTransform = (animation) => {
  return {
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
};

export const getRotationTransform = (animation) => {
  return {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  };
};
