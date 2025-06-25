import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import {DefaultInput, SecondaryHeader, SelectInput} from '../../../Components';
import UploadInput from '../../../Components/Input/UploadInput';
import {colors} from '../../../utils/colors';
import {
  isValidName,
  validateHsnCode,
  validateProductName,
} from '../../../utils/validations';
import {fonts} from '../../../utils/fonts';
import {productService} from '../../../Services/ProductService';
import {useAuth} from '../../../Context/AuthContext';

const AddProducts = () => {
  // TOKEN
  const {authToken} = useAuth();

  // STATE VARIABLES
  const [name, setName] = useState('');
  const [unitType, setUnityType] = useState('PCS');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gstType, setGstType] = useState('Non-GST');
  const [hsnCode, setHsnCode] = useState('');
  const [cGst, setCGst] = useState(0);
  const [sGst, setSGst] = useState(0);
  const [iGst, setIGst] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // ERROR STATE
  const [error, setError] = useState({
    nameError: '',
    priceError: '',
    discountError: '',
    gstTypeError: '',
    hsnCodeError: '',
    cGstError: '',
    sGstError: '',
    iGstError: '',
    descriptionError: '',
    imageError: '',
  });

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // Validation Function
  const validation = () => {
    if (!validateProductName(name)) {
      setError({
        nameError: 'Name is Invalid',
      });
      ToastAndroid.show('Name is Invalid', ToastAndroid.SHORT);
      return false;
    } else if (!price) {
      setError({
        priceError: 'Price is Required',
      });
      ToastAndroid.show('Price is Required', ToastAndroid.SHORT);
      return false;
    } else if (gstType === 'GST' && (!hsnCode || !validateHsnCode(hsnCode))) {
      setError({
        hsnCodeError: 'Hsn Code is Invalid',
      });
      ToastAndroid.show('Hsn Code is Invalid', ToastAndroid.SHORT);
      return false;
    } else if (gstType === 'GST' && !cGst && !sGst && !iGst) {
      setError({
        cGstError: 'Atlease one of CGST, SGST, IGST is Required',
      });
      ToastAndroid.show(
        'Atlease one of CGST, SGST, IGST is Required',
        ToastAndroid.SHORT,
      );
      return false;
    } else if (!image) {
      setError({
        imageError: 'Image is Required',
      });
      ToastAndroid.show('Image is Required', ToastAndroid.SHORT);
      return false;
    } else {
      setError({
        nameError: '',
        priceError: '',
        discountError: '',
        gstTypeError: '',
        hsnCodeError: '',
        cGstError: '',
        sGstError: '',
        iGstError: '',
        descriptionError: '',
        imageError: '',
      });
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validation()) {
      console.log({
        name,
        unitType,
        price,
        discount,
        gstType,
        hsnCode,
        cGst,
        sGst,
        iGst,
        description,
        image,
      });

      try {
        setIsLoading(true);
        const data = await productService.addProduct({
          authToken: authToken,
          name: name,
          description: description,
          price: price,
          discount: discount ? discount : 0,
          isTaxable: gstType === 'GST' ? true : false,
          hsnCode: hsnCode,
          unitType: unitType,
          cgst: cGst ? cGst : 0,
          sgst: sGst ? sGst : 0,
          igst: iGst ? iGst : 0,
          logo: image?.path
            ? {
                uri: image.path,
                type: image.mime,
                name: image.filename,
              }
            : null,
        });
        console.log(data);
        if (data?.status) {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
          resetForm();
        } else {
          ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setUnityType('PCS');
    setPrice(0);
    setDiscount(0);
    setGstType('Non-GST');
    setHsnCode('');
    setCGst(0);
    setSGst(0);
    setIGst(0);
    setDescription('');
    setImage(null);
  };

  return (
    <Layout>
      <SecondaryHeader title="Add Product" navigation="back" />
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <DefaultInput
          placeholder="Enter Product Name"
          value={name}
          setValue={setName}
        />
        {error.nameError && (
          <Text style={styles.errorText}>{error.nameError}</Text>
        )}
        <SelectInput
          options={['PCS', 'KG', 'LITRE']}
          placeholder="Select Unit"
          value={unitType}
          setValue={setUnityType}
        />
        <DefaultInput
          placeholder="Enter Price"
          value={price}
          setValue={setPrice}
          keyboardType="decimal-pad"
        />
        {error.priceError && (
          <Text style={styles.errorText}>{error.priceError}</Text>
        )}
        <DefaultInput
          placeholder="Discount(Optional)"
          value={discount}
          setValue={setDiscount}
          keyboardType={'decimal - pad'}
        />
        <SelectInput
          options={['GST', 'Non-GST']}
          placeholder="Select GST Type"
          value={gstType}
          setValue={setGstType}
        />
        {gstType === 'GST' && (
          <View style={styles.conditionalView}>
            <DefaultInput
              placeholder="Enter HSN Code"
              value={hsnCode}
              setValue={setHsnCode}
              maxLength={8}
              keyboardType="number-pad"
            />
            {error.hsnCodeError && (
              <Text style={styles.errorText}>{error.hsnCodeError}</Text>
            )}
            <DefaultInput
              placeholder="CGST"
              value={cGst}
              setValue={setCGst}
              keyboardType="number-pad"
              maxLength={2}
            />
            {error.cGstError && (
              <Text style={styles.errorText}>{error.cGstError}</Text>
            )}
            <DefaultInput
              placeholder="SGST"
              value={sGst}
              setValue={setSGst}
              keyboardType="number-pad"
              maxLength={2}
            />
            <DefaultInput
              placeholder="IGST"
              value={iGst}
              setValue={setIGst}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        )}
        <DefaultInput
          placeholder="Product Description(optional)"
          value={description}
          setValue={setDescription}
        />
        <UploadInput
          title={'Upload Product Name'}
          subTitle={'Tap to upload an image of the product'}
          value={image}
          setValue={setImage}
        />
        {error.imageError && (
          <Text style={styles.errorText}>{error.imageError}</Text>
        )}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#fff'} />
          ) : (
            <Text style={styles.btnText}>Add Product</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 15,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  conditionalView: {
    gap: 15,
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.error,
    marginLeft: 5,
    marginTop: -10,
  },
});

export default AddProducts;
