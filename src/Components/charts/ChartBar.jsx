import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {colors} from '../../utils/colors';

const ChartBar = ({data}) => {
  // Sample data - replace with your actual data
  

  return (
    <BarChart
      data={data}
      width={Dimensions.get('window').width - 32} // subtract left and right margins
      height={220}
      yAxisLabel="₹"
      verticalLabelRotation={-45}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => colors.inputBackground,
        labelColor: (opacity = 1) => colors.inputBackground,
        barPercentage: data.labels.length > 0 ? Math.min(1, 7 / data.labels.length) : 1,
        // barPercentage: 1,
        barRadius: 2,
        propsForBackgroundLines: {
          strokeWidth: 0,
          stroke: colors.inputBackground,
          strokeDasharray: '0',
        },
        propsForLabels: {
          fontSize: 12,
          textAnchor: 'middle'
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
