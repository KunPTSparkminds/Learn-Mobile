import React, {ChangeEvent} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type InputProps = {
  name?: string;
  label: string;
  plh: string;
  keyboard?: KeyboardTypeOptions;
  desc?: string;
  entryPass?: boolean;
  value: string;
  onChangeText?: (e: string | ChangeEvent<any>) => void;
  onChange?: () => void;
  errors?: any;
  touched?: any;
  maxLength?: number;
};
export const Input: React.FC<InputProps> = props => {
  return (
    <View style={styles.formElement}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.plh}
        keyboardType={props.keyboard || 'default'}
        maxLength={props.maxLength}
        secureTextEntry={props.entryPass}
        onChangeText={props.onChangeText}
        onChange={props.onChange}
        value={props.value}
      />
      {props.errors &&
        props.touched &&
        props.touched[props.name as any] &&
        props.errors[props.name as any] && (
          <Text style={{color: 'red'}}>{props.errors[props.name as any]}</Text>
        )}
      {props.desc && <Text style={styles.otherOption}>{props.desc}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    fontSize: 11,
    color: '#000000',
    paddingBottom: 8,
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
  otherOption: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    textDecorationLine: 'underline',
    paddingTop: 8,
  },
});
