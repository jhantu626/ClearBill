import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
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

const UserCardShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.personContainer} />
        <View style={styles.contentContainer}>
          <ShimmerLine width="60%" height={16} style={styles.namePlaceholder} />
          <ShimmerLine width="80%" height={14} style={styles.subTextPlaceholder} />
          <ShimmerLine width="90%" height={14} style={styles.subTextPlaceholder} />
        </View>
      </View>
      <ShimmerLine width={60} height={16} style={styles.adminPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1, // Takes all available space
  },
  personContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1, // Takes remaining space after personContainer
  },
  namePlaceholder: {
    marginBottom: 6,
  },
  subTextPlaceholder: {
    marginBottom: 2,
  },
  adminPlaceholder: {
    borderRadius: 4,
  },
});

export default UserCardShimmer;