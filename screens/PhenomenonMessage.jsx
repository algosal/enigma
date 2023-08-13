import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Context} from '../App';
import getEqualEneryEmotionSolution from './services/getEqualEnergyEmotionSolution';
import saveEnergyConvertionRequestObject from './services/finalMentalEvent';
import TextToSpeechButton from './TextToSpeechButton';
import AdvertisementCategorial from './AdvertisementCategorial';

const PhenomenonMessage = ({navigation}) => {
  const [eMContext, setEMContext] = useContext(Context);
  useEffect(() => {
    saveEnergyConvertionRequestObject(eMContext);
    return () => {};
  }, []);
  const [speechMessage, setSpeechMessage] = useState(
    'Please Wait, we are Processing',
  );
  let [equalEnergyEmotionSolution, setEqualEnergyEmotionSolution] = useState(
    'Processing your Emotions. You have to wait',
  );

  // alert(JSON.stringify(eMContext));
  const recordCurrentEMState = () => {
    // Your function logic here
    // alert(JSON.stringify(eMContext));
    let emState = {
      username: eMContext.username,
      Instigator: 'Environment',
      ['Mental Event']: 'Thoughts of Failure',
      'External Stimuli': '',
      'Internal Stimuli': '',
      feeling: 'Anger',
      desire: '',
      selectedNumber: 5,
      Intensity: 10,
      position: eMContext.position,
    };

    setEMContext(emState);
    navigation.navigate('MentalEventInput');
  };

  useEffect(() => {
    getEqualEneryEmotionSolution(eMContext.feeling).then(data => {
      setEqualEnergyEmotionSolution(data);
      setSpeechMessage(data);
    });

    //nothing to reset
    return () => {};
  }, []);

  const showDesire = () => {
    alert(
      'I re-enforce newly attained fresh energy from this process to my Desire. Repeat your desire again:\n    ' +
        eMContext.desire,
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.messageHeading}>Solution</Text>
        <Text style={styles.message}>{equalEnergyEmotionSolution}</Text>
        <Text>
          <TouchableOpacity onPress={showDesire}>
            <Text style={styles.clickableText}>
              Energy Transformation Affirmation
            </Text>
          </TouchableOpacity>
        </Text>
        <TextToSpeechButton text={speechMessage} />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={recordCurrentEMState}>
          <Text style={styles.buttonText}>New Event</Text>
        </TouchableOpacity>
      </View>
      <AdvertisementCategorial categorial={eMContext.feeling} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    backgroundColor: 'black',
    height: '100%',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 10,
    height: '50%',
  },
  messageHeading: {
    fontSize: 34,
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    color: 'green',
    margin: 10,
    marginBottom: 0,
    width: '100%',
  },
  message: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',

    marginBottom: 5,
  },
  clickableText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    backgroundColor: 'brown',
    borderRadius: 10,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'wheat',
  },
});

export default PhenomenonMessage;
