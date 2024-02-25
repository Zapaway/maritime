import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GlobalScreen from "./screens/user/GlobalScreen";
import LocalScreen from "./screens/user/LocalScreen";
import { styled } from "nativewind";
import { UserTabsParamList } from "./types/routes";
import { useAuthStore } from "./services/auth";
import { AuthStack, UserStack } from "./screens";



export default function App() {
  const [ user ] = useAuthStore(state => [state.user]);

  return (
    user ? <UserStack /> : <AuthStack />
 );
  
}
