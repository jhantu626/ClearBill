import React, {useRef, useEffect} from 'react';
import {Animated, View, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utils/colors';

const ShimmerBar = ({width = '100%', height = 14, style}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#E0E0E0', '#F5F5F5', '#E0E0E0'],
  });

  return (
    <Animated.View
      style={[{backgroundColor, borderRadius: 2}, {width, height}, style]}
    />
  );
};

const ChartBarShimmer = () => {
  const chartWidth = Dimensions.get('window').width - 32;
  const barCount = 16;
  const barWidth = (chartWidth - 40) / (barCount * 1.5); // Adjust spacing similar to your chart

  return (
    <View style={styles.container}>
      {/* X-axis labels placeholder */}
      <View style={styles.xAxisContainer}>
        {[...Array(barCount)].map((_, i) => (
          <ShimmerBar
            key={`label-${i}`}
            width={10}
            height={10}
            style={{marginHorizontal: (chartWidth - 20) / (barCount * 2)}}
          />
        ))}
      </View>

      {/* Bars placeholder */}
      <View style={styles.chartContainer}>
        {[...Array(barCount)].map((_, i) => (
          <View key={`bar-${i}`} style={styles.barWrapper}>
            <ShimmerBar
              width={barWidth}
              height={Math.random() * 180 + 20} // Random heights for shimmer effect
              style={{marginHorizontal: 2}}
            />
          </View>
        ))}
      </View>

      {/* Y-axis label placeholder */}
      <View style={styles.yAxisLabel}>
        <ShimmerBar width={20} height={15} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  xAxisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  barWrapper: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  yAxisLabel: {
    position: 'absolute',
    left: 8,
    top: 20,
  },
});

export default ChartBarShimmer;
