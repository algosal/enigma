import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
// import reactionTypes from "./conversions";

const PhenomenonMessage = ({phenomenon}) => {
  // Find the object in the reactionTypes array that matches the key phenomenon.feelings
  // const reactionTypeObj = reactionTypes.find(
  //   (obj) => Object.keys(obj)[0] === phenomenon.feelings
  // );

  let [equalEnergyEmotion, setEqualEnergyEmotion] =
    useState('Processing Emotion');

  //   useEffect(() => {
  //     function getEqualEneryEmotion() {
  //       let convertors_url =
  //         'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/getequalenergyemotion';
  //       axios
  //         .put(convertors_url, {emotion: phenomenon.feelings})
  //         .then(data => {
  //           console.log(data.data.body);
  //           setEqualEnergyEmotion(data.data.body['converted-to']);
  //         })
  //         .catch(e => console.log(e));
  //     }

  //     getEqualEneryEmotion();
  //     // Optional cleanup function (runs when the component unmounts)
  //     return () => {
  //       // Perform any cleanup tasks here (e.g., canceling subscriptions)
  //       console.log('Exiting the useEffect');
  //     };
  //   }, []);

  // Get the value of the found object
  // const reactionTypeValue = reactionTypeObj
  //   ? reactionTypeObj[phenomenon.feelings]
  //   : "";

  const showDesire = () => {
    Alert.alert('Desire', phenomenon.desire);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {phenomenon['Mental Event']} has a bad effect of {phenomenon.feelings}{' '}
        on you and it should be converted to {equalEnergyEmotion}. It is at the
        intensity of {phenomenon.intensity}/100. Convert the Energy from{' '}
        {phenomenon.Instigator}. Imagine your Desire to be True for
        Manifestation. Remember Your Desire.
      </Text>
      <Text>
        <TouchableOpacity onPress={showDesire}>
          <Text style={styles.clickableText}>Re-Enforce It</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
    margin: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'left',
  },
  clickableText: {
    color: 'blue',
    // textDecorationLine: "underline",
    fontSize: 18,
  },
});

export default PhenomenonMessage;
