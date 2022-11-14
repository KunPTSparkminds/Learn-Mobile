import AsyncStorage from '@react-native-async-storage/async-storage';
import BcryptReactNative from 'bcrypt-react-native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Yup from 'yup';
import {useAppSelector} from '../../hooks';
import {selectUser} from '../../redux/slice/authSlice';
type SetUpLockScreenProps = {
  navigation?: any;
};
type PinCode = {
  user: string;
  isActive: boolean;
  hash: string;
};
export const SetUpLockScreen: React.FunctionComponent<SetUpLockScreenProps> = ({
  navigation,
}) => {
  const currentUser = useAppSelector(selectUser);
  const [email, setEmail] = useState<string>('');
  const [pinCode, setPinCode] = useState<PinCode[]>([]);
  const LockSchema = Yup.object().shape({
    pin: Yup.string()
      .required('Input your pin')
      .min(6, 'Must be exactly 6 digits'),
  });

  useEffect(() => {
    getEmail();
    getPinCode();
  }, []);

  const handleSubmitPin = async (pin: string) => {
    const salt = await BcryptReactNative.getSalt(10);
    const hash = await BcryptReactNative.hash(salt, pin);
    await Keychain.setGenericPassword(currentUser || email, hash);

    const obj: PinCode = {
      user: currentUser || email,
      isActive: true,
      hash: hash,
    };
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        await AsyncStorage.setItem(
          'pinCode',
          JSON.stringify([...pinCode, obj]),
        );
        navigation.navigate('home');
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };

  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value) {
        setEmail(value);
      }
    } catch (e) {
      return;
    }
  };

  const getPinCode = async () => {
    try {
      const value = await AsyncStorage.getItem('pinCode');
      if (value) {
        setPinCode(JSON.parse(value));
      }
    } catch (e) {
      return;
    }
  };

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    setFieldTouched,
    touched,
    isValid,
    dirty,
  } = useFormik({
    validationSchema: LockSchema,
    initialValues: {pin: ''},
    onSubmit: values => {
      handleSubmitPin(values.pin);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SET UP YOUR PIN CODE</Text>
      <TextInput
        keyboardType="numeric"
        maxLength={6}
        placeholder="Input your pin code"
        onChangeText={handleChange('pin')}
        onChange={() => setFieldTouched('pin')}
        value={values.pin}
      />
      {errors?.pin && touched?.pin && (
        <Text style={styles.errorText}>{errors.pin}</Text>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: !(isValid && dirty) ? '#939598' : '#17A9B8',
          },
        ]}
        onPress={handleSubmit}
        disabled={!(isValid && dirty)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
