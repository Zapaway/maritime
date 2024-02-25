import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

const OnboardPage = ({ iconSource, text, onPressButton, onPressNewButton }) => {
  const animation = useRef(null);

  return (
    <View style={styles.slide}>
      <View style={styles.animationContainer}>
        {/* Lottie Animation */}
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200, // Adjust the width as needed
            height: 200, // Adjust the height as needed
            alignSelf: 'center', // Center the icon horizontally
          }}
          source={iconSource}
        />
        {text && <Text style={styles.text}>{text}</Text>}
       
        {onPressButton && (
          <TouchableOpacity style={styles.button} onPress={onPressButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {onPressNewButton && (
          <TouchableOpacity style={styles.newButton} onPress={onPressNewButton}>
            <Text style={styles.newButtonText}>Drop in</Text>
          </TouchableOpacity>
        )}
       
      </View>
    </View>
  );
};
export default function OnboardScreen() {
  const swiperRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleButtonPress = () => {
    const nextIndex = currentIndex + 1;
    if (swiperRef.current && nextIndex < pages.length) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleNewButtonPress = () => {
    // Handle the press event for the new button
    console.log('New Button Pressed!');
  };

  const pages = [
  {
    iconSource: require('../animatedIcons/weed.json'),
    text: 'Welcome to Maritime!',
    additionalText: 'Help us save the world one bottle at a time!',
    onPressButton: handleButtonPress,
  },
  {
    iconSource: require('../animatedIcons/recycle.json'),
    text: 'Explore Page 2 Features!',
    onPressButton: handleButtonPress,
  },
  {
    iconSource: require('../animatedIcons/water.json'),
    onPressButton: handleButtonPress,
    onPressNewButton: handleNewButtonPress,
  },
];


  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        loop={false}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {pages.map((page, index) => (
          <OnboardPage
            key={index}
            iconSource={page.iconSource}
            text={page.text}
            onPressButton={index < pages.length - 1 ? page.onPressButton : null}
            onPressNewButton={index === pages.length - 1 ? page.onPressNewButton : null}
          />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold', // Set font weight to bold
    position: 'absolute',
    top: 500, // Adjust as needed to position below the top edge
    color: 'black', // Set text color to black for all text
  },
  smallText: {
    fontSize: 14, // Adjust font size as needed
    textAlign: 'center', // Center the text
    marginTop: 10, // Adjust as needed to add space below the previous text
    color: 'black', // Set text color to black
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    width: '100%',
    overflow: 'hidden',
    marginTop: -130, // Adjust as needed to shift both the icon and text upwards
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D3D3D3', // Set button background color to light gray
    justifyContent: 'center',
    alignItems: 'center',
  },
  newButton: {
    position: 'absolute',
    bottom: 200,
    width: 140,
    height: 55,
    borderRadius: 20,
    backgroundColor: '#ADD8E6', // Set button background color to light blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black', // Set text color to black
  },
  newButtonText: {
    color: 'black', // Set text color to black
    fontSize: 18, // Adjust font size as needed
    fontWeight: 'bold', // Set font weight to bold
  },
});
