import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need access to your camera to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      saveToPhotos: true,
      quality: 1,
      maxWidth: '100%',
      maxHeight: '100%',
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleNewPhoto = () => {
    setSelectedImage(null);
    handleCameraLaunch();
  }

  return (
    <View style={styles.container}>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.header}>Here's your picture!</Text>
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
          />
          <Button style={styles.chooseAnother} title="Choose Another" onPress={() => handleNewPhoto()} />
        </View>
      )}
      {!selectedImage && (
        <View style={styles.optionsContainer}>
          <Button title="Open Camera" onPress={handleCameraLaunch} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 450,
    resizeMode: 'center',
    marginBottom: 20,
  },
  chooseAnother: {
    marginTop: 40,
  },
});
