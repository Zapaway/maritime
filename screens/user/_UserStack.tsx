import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GlobalScreen from "./GlobalScreen";
import LocalScreen from "./LocalScreen";
import { UserTabsParamList } from "../../types/routes";

export const UserStack = () => {
  const Tab = createMaterialTopTabNavigator<UserTabsParamList>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Global"
          screenOptions={{ swipeEnabled: false }}
        >
          <Tab.Screen name="Global" component={GlobalScreen} />
          <Tab.Screen name="Local" component={LocalScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
