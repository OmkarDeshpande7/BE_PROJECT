
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';

// default component to be rendered from file
export default function Tap(props) {

  //using react hook to store state in a functional component
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
 

  // this function gets executed when the component gets mounted
  useEffect(() => {
    (async () => {

      //ask camera permissions asynchronously 
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  //asynchronous function to capture camera image
  const takePicture = async () => {
    console.log("Pressed " + this.camera)
    if (this.camera) {
        console.log("Camera")
   
        let photo = await this.camera.takePictureAsync({quality:0.3});
        Speech.speak("Tap the screen and ask your question.");
        console.log(photo.uri);
        props.navigation.navigate('ImageCapture', { uri: photo.uri })
    }
}

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // UI components rendering
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} 
      ref={ref => {this.camera = ref;}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}>
            <Text style={styles.text}> Click anywhere </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

// CSS stylesheet for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  camera: {
    flex: 1,
    flexDirection:'row',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderWidth:1,
    flexDirection:'column',
    alignItems: 'center',
    backfaceVisibility:"visible",
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
