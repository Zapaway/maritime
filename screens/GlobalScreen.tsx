import React from 'react'
import WebView from 'react-native-webview'

export default function GlobalScreen() {
  return (
            <WebView source={{uri: "https://maritime-web-new.vercel.app"}} />
  )
}
