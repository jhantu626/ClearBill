import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const ShimmerLine = ({ width = '100%', height = 14, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#E0E0E0', '#F5F5F5', '#E0E0E0'],
  });

  return (
    <Animated.View
      style={[
        { backgroundColor, borderRadius: 6, marginVertical: 4 },
        { width, height },
        style,
      ]}
    />
  );
};

const BusinessCardShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <ShimmerLine width="60%" height={20} /> {/* Company Name */}
        <ShimmerLine width="80%" />
        <ShimmerLine width="80%" />
        <ShimmerLine width="60%" />
        <View style={styles.btnContainer}>
          <ShimmerLine width={60} height={24} />
        </View>
      </View>
      <View style={styles.imagePlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.itemBackgrounds+70,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  leftContainer: {
    flex: 1,
    paddingRight: 12,
  },
  btnContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
});

export default BusinessCardShimmer;