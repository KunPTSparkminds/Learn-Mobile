import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  AuthContextProvider,
  useAuth,
  useAuthContextValue,
} from './app/HOC/auth-context';
import {LoaderProvider, useLoader, useLoaderValue} from './app/HOC/withLoader';
import {LoginScreen} from './app/screens/login';

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
const Dashboard = () => {
  const authHook = useAuth();
  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={authHook.logOut} style={styles.button}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
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
  const loaderValue = useLoaderValue();
  const authValue = useAuthContextValue();
  return (
    <>
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
                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
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
                    name="Sign In"
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
