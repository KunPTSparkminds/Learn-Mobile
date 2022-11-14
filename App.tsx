import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthContextProvider, useAuthContextValue} from './app/HOC/auth-context';
import {LoaderProvider, useLoader, useLoaderValue} from './app/HOC/withLoader';
import {LoginScreen} from './app/screens/login';
import {UserDetail, UserScreen} from './app/screens/todo';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import {ChangePinScreen, SetUpLockScreen} from './app/screens/lock';
import {LockScreen} from './app/screens/lock/lock-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Content = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor={'#17A9B8'} />
        <LoginScreen navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Loader = () => {
  const loaderHook = useLoader();
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loaderHook.isShow}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={'large'} />
            <Text style={styles.textLoading}>Waiting for you..</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const App = () => {
  const [isActivePin, setIsActivePin] = useState(false);
  const loaderValue = useLoaderValue();
  const authValue = useAuthContextValue();

  (async () => {
    try {
      // await AsyncStorage.removeItem('pinCode');
      const final = await Promise.all([
        AsyncStorage.getItem('pinCode'),
        AsyncStorage.getItem('email'),
      ]);
      console.log('check final', final);
      if (final && final.length > 0 && final[0]) {
        const isActive =
          JSON.parse(final[0]).filter((x: any) => x?.user === final[1])
            ?.length > 0;
        setIsActivePin(isActive);
      }
    } catch (e) {
      return;
    }
  })();
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider value={authValue}>
          <LoaderProvider value={loaderValue}>
            {loaderValue.isShow && <Loader />}
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#ffffff',
                    fontWeight: '600',
                  },
                }}>
                {authValue.isLoggedIn ? (
                  <>
                    {isActivePin ? (
                      <Stack.Screen
                        name="Lock"
                        component={LockScreen}
                        options={{
                          headerStyle: {
                            backgroundColor: '#17A9B8',
                          },
                        }}
                      />
                    ) : (
                      <Stack.Screen
                        name="set-lock"
                        component={SetUpLockScreen}
                        options={{
                          headerStyle: {
                            backgroundColor: '#17A9B8',
                          },
                        }}
                      />
                    )}
                    <Stack.Screen
                      name="home"
                      component={UserScreen}
                      options={{
                        headerStyle: {
                          backgroundColor: '#17A9B8',
                        },
                        headerTintColor: '#fff',
                      }}
                    />

                    <Stack.Screen
                      name="user-detail"
                      component={UserDetail}
                      options={{
                        headerStyle: {
                          backgroundColor: '#17A9B8',
                        },
                        headerTintColor: '#fff',
                      }}
                    />
                    <Stack.Screen
                      name="change-pin"
                      component={ChangePinScreen}
                      options={{
                        headerStyle: {
                          backgroundColor: '#17A9B8',
                        },
                        headerTintColor: '#fff',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="sign-in"
                      component={Content}
                      options={{
                        headerStyle: {
                          backgroundColor: '#17A9B8',
                        },
                      }}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </LoaderProvider>
        </AuthContextProvider>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#a69c9b30',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textLoading: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 40,
    backgroundColor: '#17A9B8',
    borderBottomLeftRadius: 12,
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default App;
