import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';

const TextToSpeechButton = ({text}) => {
  const speak = () => {
    Tts.setDefaultLanguage('en');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    Tts.speak(text);
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={speak}>
      <Text style={styles.buttonText}>On Headphones?</Text>
    </TouchableOpacity>
  );
};

export default TextToSpeechButton;

//////////////

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 4, // Add elevation for Android shadow
    shadowColor: 'black', // Set the shadow color
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset (x, y)
    shadowOpacity: 0.5, // Set the shadow opacity (0 to 1)
    shadowRadius: 4, // Set the shadow radius
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
