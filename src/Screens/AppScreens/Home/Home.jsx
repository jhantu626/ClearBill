import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '../../Layout/Layout';
import {
  ChartBar,
  ChartBarShimmer,
  CommonShimmerLine,
  SecondaryHeader,
  ShareBottomSheet,
} from '../../../Components';
import {fonts} from '../../../utils/fonts';
import {colors} from '../../../utils/colors';
import InvoiceCard from '../../../Components/Cards/InvoiceCard';
import {invoiceService} from '../../../Services/InvoiceService';
import {useAuth} from '../../../Context/AuthContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../../../Components/Loaders/Loader';
import {hoursAmPm} from '../../../utils/data';
import {reportTemplate} from '../../../utils/ReportTemplate';

const Home = () => {
  const navigation = useNavigation();

  // CONTEXT
  const {authToken} = useAuth();

  const options = ['DAY', 'WEEK', 'MONTH'];
  const [invoices, setInvoices] = useState([]);

  // Selected State
  const [selectedSales, setSelectedSales] = React.useState('DAY');
  const [sharableInvoices, setSharableInvoices] = useState(null);
  const [salesOverview, setSalesOverview] = useState({
    labels: [],
    datasets: [{data: []}],
  });
  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [isReportLoading, setIsLoadingReport] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Ref States
  const bottomSheetRef = useRef(null);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await invoiceService.getInvoice({
        authToken: authToken,
        pageNo: 0,
        pageSize: 10,
      });
      setInvoices(data || []);
    } catch (error) {
      console.error(error);
      setError('Failed to load invoices');
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSalesOverview = async () => {
    try {
      setIsChartLoading(true);
      setError(null);
      const data = await invoiceService.getSalesOverview({
        authtToken: authToken,
        type: selectedSales,
      });

      if (!data || !data.dataSet) {
        setSalesOverview({
          labels: [],
          datasets: [{data: []}],
        });
        setTotal(0);
        setTotalPercentage(0);
        return;
      }

      let sortedDataSet = [...data.dataSet];
      if (selectedSales === 'WEEK') {
        const dayOrder = [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ];

        sortedDataSet.sort((a, b) => {
          return dayOrder.indexOf(a.label) - dayOrder.indexOf(b.label);
        });
      } else {
        sortedDataSet.sort((a, b) => Number(a.label) - Number(b.label));
      }

      const lables = [];
      const dataSetData = [];

      for (let i = 0; i < sortedDataSet.length; i++) {
        lables[i] =
          selectedSales === 'DAY'
            ? hoursAmPm[sortedDataSet[i]?.label] || sortedDataSet[i]?.label
            : selectedSales === 'WEEK'
            ? (sortedDataSet[i]?.label || '').slice(0, 3)
            : sortedDataSet[i]?.label || '';

        dataSetData[i] = sortedDataSet[i]?.value || 0;
      }

      const payload = {
        labels: lables,
        datasets: [
          {
            data: dataSetData,
          },
        ],
      };

      setSalesOverview(payload);
      setTotal(data?.totalSum || 0);
      setTotalPercentage(data?.percentage || 0);
    } catch (error) {
      console.error(error);
      setError('Failed to load sales data');
      setSalesOverview({
        labels: [],
        datasets: [{data: []}],
      });
      setTotal(0);
      setTotalPercentage(0);
    } finally {
      setIsChartLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchInvoices(), fetchSalesOverview()]);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await Promise.all([fetchInvoices(), fetchSalesOverview()]);
        } catch (error) {
          console.error(error);
          setError('Failed to load data');
        }
      };

      fetchData();
    }, []),
  );

  useEffect(() => {
    if (!isChartLoading) {
      fetchSalesOverview();
    }
  }, [selectedSales]);

  const generateReport = async () => {
    try {
      setIsLoadingReport(true);
      const data = await invoiceService.getReportData({
        authToken: authToken,
      });
      if (data) {
        const htmlTemplate = reportTemplate(data);
        console.log(htmlTemplate);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to generate report');
    } finally {
      setIsLoadingReport(false);
    }
  };

  return (
    <Layout>
      <SecondaryHeader
        navigation="simple"
        title="Dashboard"
        isNotification={true}
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.topView}>
          <Text style={styles.headerText}>Sales Overview</Text>
          <View style={styles.btnSelectContainer}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => setSelectedSales(item)}
                style={[
                  styles.selectedBtnContainer,
                  selectedSales === item && {backgroundColor: colors.primary},
                ]}>
                <Text
                  style={[
                    styles.itemText,
                    selectedSales === item && {color: '#fff'},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text style={{fontSize: 16, fontFamily: fonts.medium}}>Sales</Text>
            {isChartLoading ? (
              <CommonShimmerLine height={30} width="30%" />
            ) : (
              <Text style={{fontSize: 28, fontFamily: fonts.bold}}>
                ₹{total.toFixed(2)}
              </Text>
            )}

            <View style={{flexDirection: 'row', gap: 5}}>
              {isChartLoading ? (
                <CommonShimmerLine height={14} width="30%" />
              ) : (
                <Text style={{fontSize: 16, fontFamily: fonts.regular}}>
                  {selectedSales === 'DAY' ? 'Today' : 'This'}{' '}
                  {selectedSales === 'DAY'
                    ? ''
                    : selectedSales.charAt(0).toUpperCase() +
                      selectedSales.slice(1).toLowerCase()}
                </Text>
              )}
              {isChartLoading ? (
                <CommonShimmerLine height={14} width="10%" />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.regular,
                    color: totalPercentage > 0 ? '#088738' : colors.error,
                  }}>
                  {totalPercentage > 0 ? '+' : ''}
                  {totalPercentage.toFixed(2)}%
                </Text>
              )}
            </View>
            {isChartLoading ? (
              <ChartBarShimmer />
            ) : (
              <ChartBar data={salesOverview} />
            )}
          </View>
        </View>
        <View style={styles.middleBtnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateInvoice')}
            style={[styles.middleBtn, {backgroundColor: colors.primary}]}>
            <Text style={styles.middleBtnText}>Create Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.middleBtn,
              {backgroundColor: colors.inputBackground + '40'},
            ]}
            onPress={() => {
              navigation.navigate('BusinessReport');
            }}>
            {isReportLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={[styles.middleBtnText, {color: '#000'}]}>
                View Reports
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.invoiceText}>Recent Invoices</Text>
        {isLoading ? (
          <View style={{marginTop: 40}}>
            <Loader />
          </View>
        ) : invoices.length > 0 ? (
          invoices.map((item, index) => (
            <InvoiceCard
              invoice={item}
              key={index + 'invoice'}
              onPressFunction={() => {
                setSharableInvoices(index);
                bottomSheetRef.current?.expand();
              }}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No invoices found</Text>
        )}
        {!isLoading && invoices.length > 0 && (
          <TouchableOpacity
            style={styles.viewMoreButton}
            onPress={() => {
              navigation.navigate('Invoice');
            }}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <ShareBottomSheet
        ref={bottomSheetRef}
        snapPoints={useMemo(() => ['15%'], [])}
        key={'bottomSheet-share'}
        invoice={invoices[sharableInvoices]}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topView: {
    gap: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  btnSelectContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.inputBackground + '40',
    height: 45,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedBtnContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.inputBackground,
  },
  middleBtnContainer: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  middleBtn: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  middleBtnText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: '#fff',
    letterSpacing: 1,
  },
  invoiceText: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 45,
    width: 150,
    alignSelf: 'center',
    marginVertical: 30,
    borderRadius: 10,
  },
  viewMoreText: {
    color: '#fff',
    fontFamily: fonts.semibold,
  },
  errorContainer: {
    backgroundColor: colors.errorBackground,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: colors.error,
    fontFamily: fonts.medium,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
});

export default Home;
