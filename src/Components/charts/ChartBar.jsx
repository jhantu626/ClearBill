import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {colors} from '../../utils/colors';

const ChartBar = () => {
  // Sample data - replace with your actual data
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 60, 20, 45, 28, 80, 99, 43, 50, 60],
      },
    ],
  };

  return (
    <BarChart
      data={data}
      width={Dimensions.get('window').width - 32} // subtract left and right margins
      height={220}
      yAxisLabel="₹"
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => colors.inputBackground,
        labelColor: (opacity = 1) => colors.inputBackground,
        barPercentage: data.labels.length / 2 / data.labels.length,
        barRadius: 2,
        propsForBackgroundLines: {
          strokeWidth: 0,
          stroke: colors.inputBackground,
          strokeDasharray: '0',
        },
        propsForLabels: {
          fontSize: 12,
        },
        fillShadowGradient: colors.primary,
        fillShadowGradientOpacity: 1,
        style: {
          borderRadius: 16,
        },
        barColors: [colors.primary],
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
      fromZero={true}
      showBarTops={false}
    />
  );
};

export default ChartBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
});
