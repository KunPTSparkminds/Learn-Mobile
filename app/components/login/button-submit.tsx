import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ButtonSubmitProps = {
  text: String;
  onPress?: () => void;
  diabled: boolean;
};
export const ButtonSubmit: React.FunctionComponent<
  ButtonSubmitProps
> = props => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: props.diabled ? '#939598' : '#17A9B8',
        },
      ]}
      onPress={props.onPress}
      disabled={props.diabled}>
      <View>
        <Text style={styles.textButton}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: 10,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
