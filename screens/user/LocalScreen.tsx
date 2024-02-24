import React, { useState } from "react";
import { LocalScreenProps } from "../../types/routes";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";


export default function LocalScreen({ navigation }: LocalScreenProps) {
  const [camera, setCamera] = useState<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const [startCamera, setStartCamera] = useState(false);

  const _toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const _startCamera = async () => {
    // const {status} = await Camera.requestCameraPermissionsAsync()
    // if (status === 'granted') {
    //   // start the camera
      setStartCamera(true)
    // } else {
    //   Alert.alert('Access denied')
    // }
  };

  return (
    <View className="items-center justify-center">
      {startCamera ? (
        <Camera
          className="w-full flex flex-1"
          // ref={(r) => {
          //   setCamera(r);
          // }}
          ratio={"1:1"}
        ></Camera>
      ) : (
        <View className="items-center justify-center">
          <TouchableOpacity onPress={_startCamera} className="w-32 border rounded bg-[#14274e] flex flex-row justify-center items-center h-10">
            <Text className="text-white font-bold text-center">
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
