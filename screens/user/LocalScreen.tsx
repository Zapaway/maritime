import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { getCaptureDownloadUrl, uploadCapture } from '../../services/storage';
import LoadingSpinner from './LoadingSpinner'; 
import PopupModal from './PopModal';
import axios from "axios";


// const readImage = async (imgSrc: string, width: number, height: number) => {
//   canvas.width = width;
//   Canvas.height = height;
//   const context = Canvas.getContext("2d");
//   const image = new CanvasImage(Canvas);

//   const options = { encoding: "base64", compress: 0.4 };
//   const base64 = await FileSystem.readAsStringAsync(imgSrc);
//   const src = "data:image/png;base64," + base64;
//   image.src = src;
//   image.addEventListener("load", () => {
//     context.drawImage(image, 0, 0);
//     context
//       .getImageData(0, 0, canvas.width, canvas.height)
//       .then((imageData) => {
//         console.log(
//           "Image data:",
//           imageData,
//           Object.values(imageData.data).length
//         );
//       })
//       .catch((e) => {
//         console.error("Error with fetching image data:", e);
//       });
//   });
// };


export default function App() {
  //Location functionality
  const [currentLocation, setCurrentLocation] = useState<LocationObjectCoords | null>(null);


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
          console.log('Current Location:', location.coords);

        } else {
          console.log('Permission to access location was denied');
        }
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    };

    fetchLocation();
  }, []);


  
  
  // Camera functionality 
  let camera: Camera;

  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null);
  const TAKE_PICTURE_TEXT = 'Take Picture';
  

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync({ base64: true });
    // console.log("photo", photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const CameraPreview = ({ photo }: any) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />

<TouchableOpacity
                onPress={__retakePicture}
                // @ts-ignore
                style={{
                  position: 'absolute',
                  bottom: 20,
                  alignSelf: 'left',
             
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 15
                  }}
                >
                  retake picture
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
        onPress={__usePicture}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          padding: 10,
          borderRadius: 20,
          
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 15,
          }}
        >
          use
        </Text>
      </TouchableOpacity>
             
      </View>
    );
  };

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [popupText, setPopupText] = useState('');

  const __usePicture = async () => {
    try {
      setLoading(true);

    // upload image to Firebase 
    const resizeResult = await manipulateAsync(
      capturedImage!.uri, [{ resize: { width: 77, height: 58 }}], { format: SaveFormat.PNG, base64: true }
    );

    const response = await fetch(resizeResult.uri!);
    const blob = await response.blob();

    await uploadCapture(blob, "testing");
    const imgDownloadUrl = await getCaptureDownloadUrl("testing");
    // const testUrl = encodeURIComponent("https://www.youtube.com");
    // console.log("URI", testUrl);
    
    console.log("URL", imgDownloadUrl);
    const res = await axios.get(`https://a66f-2607-fb90-ad98-861f-5553-d063-4eb9-2867.ngrok-free.app/capture/${imgDownloadUrl}`)

    await AsyncStorage.setItem('storedLocation', JSON.stringify(currentLocation));

    // Update the map based on the new location
    updateMapWithStoredLocation();
    setPopupText(res.data);  // TODO double-check
    setShowModal(true);
    setCapturedImage(null);
    __exitCamera();
    } finally {
      setLoading(false);
    }

  }

  const updateMapWithStoredLocation = async () => {
    try {
      const storedLocationString = await AsyncStorage.getItem('storedLocation');
      if (storedLocationString) {
        const storedLocation = JSON.parse(storedLocationString);
        setCurrentLocation(storedLocation);
      }
    } catch (error) {
      console.error('Error retrieving stored location:', error);
    }
  };

  const __exitCamera = () => {
    setStartCamera(false)
  }

  const closePopup = () => {
    setShowModal(false);
  };

  return (
    

   
    
    <> 
   {loading && <LoadingSpinner />} 
   
      <StatusBar style="auto" />
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage}  />
      ) : startCamera ? (
        <Camera
          style={{ flex: 1, width: '100%' }}
          ref={(r) => {
            camera = r;
          }}          
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}

            
          >

<TouchableOpacity
            onPress={__exitCamera}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              padding: 10,
              borderRadius: 20,
            
              zIndex: 2, // Ensure the exit button is above other elements
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Exit
            </Text>
          </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
              }}
            >
             
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                  }}
                />
              </View>
            </View>
          </View>
        </Camera>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
         

          <MapView
          style={{ flex: 1, width: '100%' }}
          region={{
            latitude: currentLocation?.latitude || 0,
            longitude: currentLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation?.latitude || 0,
              longitude: currentLocation?.longitude || 0,
            }}
            title="Your Location"
            description="This is your current location"
          />

          

<TouchableOpacity
            onPress={__startCamera}
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
                position: 'absolute',
                bottom: -435,
                right: -250,
                
              }}
            >
              {TAKE_PICTURE_TEXT}
            </Text>
          </TouchableOpacity>
          
        </MapView>
        <PopupModal isVisible={showModal} text={popupText} onClose={closePopup} />
      </View>
      )}
    </>
  );
            }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
