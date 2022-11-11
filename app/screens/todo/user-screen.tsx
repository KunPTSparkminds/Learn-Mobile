import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAuth} from '../../HOC/auth-context';
import {useLoader} from '../../HOC/withLoader';
import {useAppSelector} from '../../hooks';
import {selectUser} from '../../redux/slice/authSlice';

type UserProps = {};
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const UserScreen: React.FunctionComponent<UserProps> = ({
  navigation,
}: any) => {
  const loaderHook = useLoader();
  const authHook = useAuth();
  const currentUser = useAppSelector(selectUser);
  const [data, setData] = useState<User[]>([]);
  const [email, setEmail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUsers();
    getEmail();
  }, []);

  const fetchApi = async (page: number) => {
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    if (res) {
      setTotalPage(res.data.total_pages || 0);
    }
    return res.data.data;
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

  const getUsers = async () => {
    const response = await fetchApi(1);
    if (response && response.length > 0) {
      setRefreshing(false);
      loaderHook.dissmiss();
      setData(response);
    }
  };

  const handleReadMore = async () => {
    if (currentPage + 1 <= totalPage) {
      setCurrentPage(currentPage + 1);
      loaderHook.show();
      const response = await fetchApi(currentPage + 1);
      if (response && response.length > 0) {
        loaderHook.dissmiss();
        setData([...data, ...response]);
      }
    }
  };

  const onRefresh = async () => {
    if (currentPage !== 1) {
      setRefreshing(true);
      setCurrentPage(1);
    }
    const response = await fetchApi(1);
    if (response && response.length > 0) {
      setRefreshing(false);
      loaderHook.dissmiss();
      setData(response);
    }
  };

  const onPress = (index: number) => {
    const newArray = [...data];
    newArray[index].first_name = newArray[index].first_name + 'QuangPV';
    setData(newArray);
  };

  const handlePressItem = async (id: number) => {
    const res = await axios.get(`https://reqres.in/api/users?id=${id}`);
    if (res && res.data) {
      navigation.navigate('user-detail', {
        data: res.data.data,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={authHook.logOut}>
        {currentUser ? `user ${currentUser}` : `user ${email}`}
      </Text>
      {data.length > 0 && (
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.email}
          renderItem={({item, index}) => (
            <ScrollView>
              <TouchableWithoutFeedback
                onPress={() => handlePressItem(item.id)}>
                <View style={styles.listItem}>
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.avatar,
                      }}
                    />
                  </View>
                  <View>
                    <Text>{item.email}</Text>
                    <Text
                      style={
                        styles.text
                      }>{`${item.first_name} ${item.last_name}`}</Text>
                  </View>
                  {/* <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onPress(index)}>
                      <Text>Click</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          )}
          onEndReached={handleReadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fc7f03',
    borderStyle: 'dotted',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e4e4',
  },
});
