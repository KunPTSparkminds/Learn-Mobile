import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoginScreen} from './app/screens/login';

// const Header = () => {
//   return (
//     <View style={styles.header}>
//       <Text style={styles.text}>Sign In</Text>
//     </View>
//   );
// };

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
const Content1 = () => {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#ffffff',
            fontWeight: '600',
          },
        }}>
        <Stack.Screen
          name="Sign In"
          component={Content}
          options={{
            headerStyle: {
              backgroundColor: '#17A9B8',
            },
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Content1}
          options={{
            headerStyle: {
              backgroundColor: '#17A9B8',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
