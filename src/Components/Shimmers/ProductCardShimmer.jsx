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
  }, [shimmerAnim]);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [colors.itemBackgrounds, '#F5F5F5', colors.itemBackgrounds],
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

const ProductCardShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imagePlaceholder}>
          <ShimmerLine width="100%" height="100%" />
        </View>
        <View style={styles.textContainer}>
          <ShimmerLine 
            width={150} 
            height={18} 
            style={styles.productNamePlaceholder} 
          />
          <ShimmerLine 
            width={100} 
            height={12} 
            style={styles.hsnPlaceholder} 
          />
        </View>
      </View>
      <View style={styles.iconPlaceholder}>
        <ShimmerLine width="100%" height="100%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 6,
    overflow: 'hidden',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  productNamePlaceholder: {
    marginBottom: 6,
    borderRadius: 4,
  },
  hsnPlaceholder: {
    borderRadius: 4,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default ProductCardShimmer;