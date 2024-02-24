import { styled } from 'nativewind'
import React from 'react'
import WebView from 'react-native-webview'
import { NavigationContainerProps } from '@react-navigation/native';
import { GlobalScreenProps } from '../../types/routes';
import { StyleSheet, Text, View } from 'react-native';


export default function GlobalScreen({ navigation }: GlobalScreenProps) {
  return (
      <WebView source={{uri: "https://maritime-web-new.vercel.app"}} />
  )
}
