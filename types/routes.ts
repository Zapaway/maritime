import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

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
