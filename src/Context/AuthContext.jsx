import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async token => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setAuthToken(token);
    } catch (error) {
      console.log('error', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  const check = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      setAuthToken(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <AuthContext.Provider value={{authToken, login, logout, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export {useAuth};

export default AuthProvider;
