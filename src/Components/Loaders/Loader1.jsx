import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const BAR_COUNT = 12;

const Loader1 = () => {
  const opacityValues = useRef(
    Array.from({length: BAR_COUNT}, () => new Animated.Value(0.25)),
  ).current;

  useEffect(() => {
    const animations = opacityValues.map((value, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(value, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.25,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      );
    });

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, [opacityValues]);

  return (
    <View style={styles.loader}>
      {opacityValues.map((opacity, index) => {
        const rotate = `${index * (360 / BAR_COUNT)}deg`;
        const transform = [{rotate}, {translateY: -13}];

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                opacity,
                transform,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 36,
    height: 36,
    borderRadius: 8,
    position: 'relative',
  },
  bar: {
    width: 3,
    height: 9,
    backgroundColor: 'rgb(128, 128, 128)',
    position: 'absolute',
    left: '50%',
    top: '30%',
    marginLeft: -1.5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default Loader1;
