import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type UserDetailProps = {
  [x: string]: any;
};
interface UserDetail {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
export const UserDetail: React.FunctionComponent<UserDetailProps> = props => {
  const {route} = props;
  const {params} = route;
  return params && params?.data ? (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Image
          style={styles.image}
          source={{
            uri: params.data.avatar,
          }}
        />
        <Text>{params.data.email}</Text>
        <Text
          style={
            styles.text
          }>{`${params.data.first_name} ${params.data.last_name}`}</Text>
      </View>
    </View>
  ) : (
    <View>
      <Text>User not found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    padding: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fc7f03',
    borderStyle: 'dotted',
    alignItems: 'center',
    backgroundColor: '#f3e4e4',
  },
  text: {
    fontWeight: 'bold',
  },
});
