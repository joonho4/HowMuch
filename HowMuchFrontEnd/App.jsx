import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage, Enjoy, Login, HomeScreen, Signup, Information, KoseuChucheon, MyPage } from './pages'
import { BottomNav } from './components';


const Stack = createNativeStackNavigator();
const Nav = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={HomePage} />
        <Stack.Screen name='Enjoy' component={Enjoy} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Information' component={Information} />
        <Stack.Screen name='KoseuChucheon' component={KoseuChucheon} />
        <Stack.Screen name='MyPage' component={MyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}