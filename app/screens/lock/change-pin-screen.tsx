import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import BcryptReactNative from 'bcrypt-react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectStep, setStep} from '../../redux/slice/authSlice';
import {useAuth} from '../../HOC/auth-context';

type ChangePinProps = {
  navigation: any;
};
export const ChangePinScreen: React.FunctionComponent<ChangePinProps> = ({
  navigation,
}) => {
  const authHook = useAuth();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const step = useAppSelector(selectStep);
  const PinSchema = Yup.object().shape({
    pin: Yup.string().required('Required').min(6, 'Must be exactly 6 digits'),
  });
  const NewPinSchema = Yup.object().shape({
    newPin: Yup.string()
      .required('Required')
      .min(6, 'Must be exactly 6 digits'),
  });
  const handleChangePin = async (pin: string) => {
    console.log('in old pin', pin);
    const final = await Promise.all([
      AsyncStorage.getItem('pinCode'),
      AsyncStorage.getItem('email'),
    ]);
    if (final && final.length > 0 && final[0]) {
      const infoUser = JSON.parse(final[0]).filter(
        (x: any) => x?.user === final[1],
      );
      const isSame = await BcryptReactNative.compareSync(pin, infoUser[0].hash);
      if (isSame) {
        dispatch(setStep(2));
      } else {
        setError('Wrong pin code');
      }
    }
  };
  const handleChangeNewPin = async (pin: string) => {
    try {
      console.log('check new pin', pin);
      const salt = await BcryptReactNative.getSalt(10);
      const hash = await BcryptReactNative.hash(salt, pin);
      const final = await Promise.all([
        AsyncStorage.getItem('pinCode'),
        AsyncStorage.getItem('email'),
      ]);
      const newArr = [...final];
      if (newArr && newArr.length > 0 && newArr[0]) {
        const arr = JSON.parse(newArr[0]).filter(
          (x: any) => x?.user === newArr[1],
        );
        const index = JSON.parse(newArr[0]).findIndex(
          (x: any) => x?.hash === arr[0]?.hash,
        );
        if (index >= 0) {
          JSON.parse(newArr[0])[index].hash = hash;
          console.log('check json', JSON.stringify(newArr[0]));
          await AsyncStorage.setItem('pinCode', newArr[0]);

          await authHook.logOut();
          await dispatch(setStep(1));
        }
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
    validationSchema: step === 1 ? PinSchema : NewPinSchema,
    initialValues: step === 1 ? {pin: ''} : {newPin: ''},
    onSubmit: values => {
      step === 1 && handleChangePin(values.pin || '');
      step === 2 && handleChangeNewPin(values.newPin || '');
    },
  });

  return (
    <View>
      <Text>Change PIN Code</Text>
      {step === 1 && (
        <>
          <TextInput
            keyboardType="numeric"
            maxLength={6}
            placeholder="Input your old pin code"
            onChangeText={handleChange('pin')}
            onChange={() => {
              setFieldTouched('pin');
              setError('');
            }}
            value={values.pin}
          />
          {((errors?.pin && touched?.pin) || error) && (
            <Text style={styles.errorText}>{errors.pin || error}</Text>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <TextInput
            keyboardType="numeric"
            maxLength={6}
            placeholder="Input your new pin code"
            onChangeText={handleChange('newPin')}
            onChange={() => {
              setFieldTouched('newPin');
              setError('');
            }}
            value={values.newPin}
          />
          {((errors?.newPin && touched?.newPin) || error) && (
            <Text style={styles.errorText}>{errors.newPin || error}</Text>
          )}
        </>
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
    marginBottom: 10,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
