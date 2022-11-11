import AsyncStorage from '@react-native-async-storage/async-storage';
import date from 'date-and-time';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LoginForm} from '../../components/login/login-form';
import {useAuth} from '../../HOC/auth-context';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectValue, setValue} from '../../redux/slice/testSlice';

type LoginScreenProps = {
  navigation: any;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const authHook = useAuth();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const createdAt = await AsyncStorage.getItem('createdAt');
      if (isLoggedIn && createdAt) {
        if (date.subtract(new Date(), new Date(createdAt)).toMinutes() < 1) {
          authHook.logIn();
        }
      }
    } catch (e) {
      console.log('check e', e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <LoginForm navigation={navigation} />
      </View>
      <View>
        <Text
          style={styles.text}
          onPress={() => dispatch(setValue(Math.random()))}>
          Don't have an account yet?
          <Text style={styles.textGreen}>{' Sign Up'}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  label: {
    fontWeight: '600',
    fontSize: 11,
    color: '#000000',
    paddingBottom: 8,
  },
  otherOption: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    textDecorationLine: 'underline',
    paddingTop: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderStyle: 'solid',
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  formElement: {
    paddingBottom: 24,
  },
  button: {
    height: 50,
    backgroundColor: '#939598',
    padding: 10,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  textGreen: {
    color: '#00C3AC',
  },
});
