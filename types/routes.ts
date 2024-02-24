import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type UserTabsParamList = {
  Global: undefined;
  Local: undefined;
};

export type GlobalScreenProps = MaterialTopTabScreenProps<
  UserTabsParamList,
  "Global"
>;

export type LocalScreenProps = MaterialTopTabScreenProps<
  UserTabsParamList,
  "Local"
>;

export type AuthStackParamList = {
  Splash: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Splash"
>;