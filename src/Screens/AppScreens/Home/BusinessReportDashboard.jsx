import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import Layout from '../../Layout/Layout';
import {SecondaryHeader} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import Loader from '../../../Components/Loaders/Loader';
import {invoiceService} from '../../../Services/InvoiceService';
import {useAuth} from '../../../Context/AuthContext';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const BusinessReportDashboard = () => {
  // CONSTEXTS
  const {authToken} = useAuth();

  // STATE VALUES
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // LOADING VALUES
  const [isLoading, setIsLoading] = useState(true);

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await invoiceService.getReportData({
        authToken: authToken,
      });
      setData(responseData);
    } catch (error) {
      console.log(error);
      setError('Failed to load report data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  // Prepare chart data with null checks
  const revenueChartData = data ? {
    labels: data.topItems.map(item =>
      item.itemName.length > 8
        ? item.itemName.substring(0, 8) + '..'
        : item.itemName,
    ),
    datasets: [
      {
        data: data.topItems.map(item => Math.round(item.totalRevenue / 1000)),
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      },
    ],
  } : { labels: [], datasets: [] };

  const quantityChartData = data ? {
    labels: data.topItems.map(item =>
      item.itemName.length > 8
        ? item.itemName.substring(0, 8) + '..'
        : item.itemName,
    ),
    datasets: [
      {
        data: data.topItems.map(item => item.quantitySold),
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      },
    ],
  } : { labels: [], datasets: [] };

  const pieChartData = data ? data.topItems.map((item, index) => ({
    name:
      item.itemName.length > 12
        ? item.itemName.substring(0, 12) + '..'
        : item.itemName,
    population: item.totalRevenue,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5],
    legendFontColor: '#374151',
    legendFontSize: 12,
  })) : [];

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const MetricCard = ({title, value, color = '#3B82F6'}) => (
    <View style={[styles.metricCard, {borderLeftColor: color}]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );

  return (
    <Layout>
      <SecondaryHeader title="Report" navigation="back" />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeftContainer}>
              <Text style={styles.businessName}>{data?.businessName}</Text>
              <Text style={styles.address}>{data?.address}</Text>
              <Text style={styles.gstNumber}>GST: {data?.gstNumber}</Text>
            </View>
            <Image
              source={require('./../../../../assets/images/logo.png')}
              style={{width: 70, height: 70}}
            />
          </View>

          {/* Key Metrics */}
          {data && (
            <View style={styles.metricsContainer}>
              <View style={styles.metricsRow}>
                <MetricCard
                  title="Total Revenue"
                  value={formatCurrency(data.totalRevenue)}
                  color="#10B981"
                />
                <MetricCard
                  title="GST Collected"
                  value={formatCurrency(data.totalGstCollected)}
                  color="#3B82F6"
                />
              </View>
              <View style={styles.metricsRow}>
                <MetricCard
                  title="Total Invoices"
                  value={data.invoiceCount.toString()}
                  color="#F59E0B"
                />
                <MetricCard
                  title="Unique Customers"
                  value={data.uniqueCustomerCount.toString()}
                  color="#EF4444"
                />
              </View>
              <View style={styles.metricsRow}>
                <MetricCard
                  title="Total Discount"
                  value={formatCurrency(data.totalDiscount)}
                  color="#8B5CF6"
                />
                <MetricCard
                  title="Net Revenue"
                  value={formatCurrency(data.totalRevenue - data.totalDiscount)}
                  color="#06B6D4"
                />
              </View>
            </View>
          )}

          {/* Revenue by Product Chart */}
          {data?.topItems && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>
                Revenue by Product (₹ in thousands)
              </Text>
              <BarChart
                data={revenueChartData}
                width={width - 40}
                height={250}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={styles.chart}
                showValuesOnTopOfBars={true}
              />
            </View>
          )}

          {/* Quantity Sold Chart */}
          {data?.topItems && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Quantity Sold by Product</Text>
              <BarChart
                data={quantityChartData}
                width={width - 40}
                height={250}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                }}
                verticalLabelRotation={30}
                style={styles.chart}
                showValuesOnTopOfBars={true}
              />
            </View>
          )}

          {/* Revenue Distribution Pie Chart */}
          {data?.topItems && (
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Revenue Distribution</Text>
              <PieChart
                data={pieChartData}
                width={width - 40}
                height={250}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
                hasLegend={true}
              />
            </View>
          )}

          {/* Top Items Table */}
          {data?.topItems && (
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>Top Selling Items</Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 3}]}>Item Name</Text>
                <Text style={[styles.tableHeaderText, {flex: 1}]}>Qty</Text>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>Revenue</Text>
              </View>
              {data.topItems.map((item, index) => (
                <View
                  key={index}
                  style={[styles.tableRow, index % 2 === 0 && styles.evenRow]}>
                  <Text style={[styles.tableCell, {flex: 3}]} numberOfLines={2}>
                    {item.itemName}
                  </Text>
                  <Text
                    style={[styles.tableCell, {flex: 1, textAlign: 'center'}]}>
                    {item.quantitySold}
                  </Text>
                  <Text style={[styles.tableCell, {flex: 2, textAlign: 'right'}]}>
                    {formatCurrency(item.totalRevenue)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeftContainer: {
    width: '70%',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  reportPeriod: {
    fontSize: 14,
    color: '#00000080',
  },
  address: {
    fontSize: 12,
    color: '#00000080',
    lineHeight: 16,
  },
  gstNumber: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#00000090',
  },
  metricsContainer: {
    padding: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 32,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  evenRow: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    fontSize: 13,
    color: '#374151',
    paddingHorizontal: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BusinessReportDashboard;