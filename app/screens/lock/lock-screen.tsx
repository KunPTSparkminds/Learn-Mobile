import AsyncStorage from '@react-native-async-storage/async-storage';
import BcryptReactNative from 'bcrypt-react-native';
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
type LockScreenProps = {
  navigation: any;
};
export const LockScreen: React.FunctionComponent<LockScreenProps> = ({
  navigation,
}) => {
  const [error, setError] = useState<string>('');
  const LockSchema = Yup.object().shape({
    pin: Yup.string()
      .required('Input your pin')
      .min(6, 'Must be exactly 6 digits'),
  });

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

  const handleSubmitPin = async (pin: string) => {
    try {
      const final = await Promise.all([
        AsyncStorage.getItem('pinCode'),
        AsyncStorage.getItem('email'),
      ]);
      if (final && final.length > 0 && final[0]) {
        const infoUser = JSON.parse(final[0]).filter(
          (x: any) => x?.user === final[1],
        );
        const isSame = await BcryptReactNative.compareSync(
          pin,
          infoUser[0].hash,
        );
        if (isSame) {
          navigation.navigate('home');
        } else {
          setError('Wrong pin code');
        }
      }
    } catch (error) {
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ENTER YOUR PIN CODE</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        placeholder="Input your pin code"
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
