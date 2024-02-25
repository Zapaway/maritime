// PopupModal.js

import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const PopupModal = ({ isVisible, text, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text className="text-2xl">Congratulations you have found {text}! 😆 </Text>
        </View>
        <View style={{ marginTop: -50 }}>
          <Button title="Exit" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    padding: 0
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 50, // Adjusted padding to make the container bigger
    borderRadius: 50,
    alignItems: 'center',
    
  },
});

export default PopupModal;
