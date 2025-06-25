import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SelectInput = ({
  options = [],
  value,
  setValue,
  placeholder = 'Select an option',
  disabled = false,
  dropdownHeight = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const componentRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (disabled) return;

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setIsOpen(false));
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, dropdownHeight],
  });

  return (
    <View style={styles.container} ref={componentRef}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={toggleDropdown}
        activeOpacity={0.8}
        disabled={disabled}>
        <Text style={[styles.selectedText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}>
          <Icon name="arrow-drop-down" size={24} color="#61758A" />
        </Animated.View>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          ref={dropdownRef}
          style={[
            styles.dropdown,
            {
              maxHeight: heightInterpolation,
            },
          ]}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setValue(item);
                  closeDropdown();
                }}>
                <Text
                  style={[
                    styles.dropdownText,
                    item === value && styles.selectedItemText,
                  ]}>
                  {item}
                </Text>
                {item === value && (
                  <Icon name="check" size={18} color="#4A90E2" />
                )}
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    // marginBottom: 10,
  },
  inputContainer: {
    height: 55,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  selectedText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    marginRight: 10,
  },
  placeholderText: {
    color: '#61758A',
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 1000,
    maxHeight: 200, // Fixed max height for scroll
  },
  dropdownItem: {
    paddingHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdownText: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  selectedItemText: {
    color: '#4A90E2',
  },
});

export default SelectInput;
