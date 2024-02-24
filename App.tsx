import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GlobalScreen from './screens/GlobalScreen';
import LocalScreen from './screens/LocalScreen';
import { styled } from 'nativewind';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1,}}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{swipeEnabled: false}}>
        <Tab.Screen name="Global" component={GlobalScreen} />
        <Tab.Screen name="Local" component={LocalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}