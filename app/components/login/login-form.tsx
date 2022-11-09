import {useFormik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {useAuth} from '../../HOC/auth-context';
import {useLoader} from '../../HOC/withLoader';
import {ButtonSubmit} from './button-submit';
import {Input} from './input';

type LoginFormProps = {
  navigation: any;
};
export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  navigation,
}) => {
  const loaderHook = useLoader();
  const authHook = useAuth();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
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
    validationSchema: LoginSchema,
    initialValues: {email: '', password: '', twofa: ''},
    onSubmit: values => {
      if (values.email && values.password) {
        loaderHook.show();
        authHook.logIn();
        setTimeout(() => {
          loaderHook.dissmiss();
        }, 300);
      }
    },
  });
  return (
    <>
      <Input
        name="email"
        label={'Email'}
        plh={'Enter your email'}
        onChangeText={handleChange('email')}
        onChange={() => setFieldTouched('email')}
        value={values.email}
        errors={errors}
        touched={touched}
      />
      <Input
        name="password"
        label={'Password'}
        plh={'Enter your password'}
        entryPass
        desc={'Forgot your password?'}
        onChangeText={handleChange('password')}
        onChange={() => setFieldTouched('password')}
        value={values.password}
        errors={errors}
        touched={touched}
      />
      <Input
        name="twofa"
        label={'Google 2FA Code'}
        plh={'Enter your 2FA'}
        desc={'Reset my google 2FA?'}
        keyboard={'numeric'}
        onChangeText={handleChange('twofa')}
        value={values.twofa}
        maxLength={6}
      />
      <ButtonSubmit
        text={'Sign In'}
        onPress={handleSubmit}
        diabled={!(isValid && dirty)}
      />
    </>
  );
};
