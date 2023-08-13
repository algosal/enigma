import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState, useContext} from 'react';
import reactionTypes from './data/conversions';
import negativeMentalEvents from './data/negativeMentalEvents';
import Slider from '@react-native-community/slider';
import {Context} from '../App';
import NavigationButton from './navigation/navigationButton';
import Advertisement from './Advertisement';
import Geolocation from '@react-native-community/geolocation';
import InstigatorData from './data/InstigatorData';
import axios from 'axios';

const MentalEventInput = ({navigation}) => {
  useEffect(() => {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setEMContext({...eMContext, position: JSON.stringify(position.coords)});
      },
      error => alert('Check GPS', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  function TheUsersGeoLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // const {latitude, longitude} = position.coords;
        setEMContext({
          ...eMContext,
          position: JSON.stringify(position.coords),
        });
      },
      error => alert('Error in GPS', error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  //main state
  const [eMContext, setEMContext] = useContext(Context);

  //Instigator
  const [selectedInstigator, setSelectedInstigator] = useState(
    InstigatorData[0],
  );
  const [UnknwonInstigator, setUnknownInstigator] = useState('');
  //ME
  const [selectedMentalEvent, setSelectedMentalEvent] = useState(
    negativeMentalEvents[0],
  );
  //Intensity
  const [intensity, setIntensity] = useState(10);
  //Feelings or Emotion
  const [selectedFeeling, setSelectedFeeling] = useState(
    Object.keys(reactionTypes[0])[0],
  );
  //Desire to be Fulfilled
  const [desire, setDesire] = useState('');

  ///reset all the states local to the component
  const resetAllStates = () => {
    TheUsersGeoLocation();
    setSelectedInstigator(InstigatorData[0]);
    setUnknownInstigator('');
    setSelectedMentalEvent(negativeMentalEvents[0]);
    setIntensity(10);
    setSelectedFeeling(Object.keys(reactionTypes[0])[0]);
    setDesire('');
  };

  useEffect(() => {
    // alert('Use State in MEInput fired');
    setEMContext({
      ...eMContext,
      ['Mental Event']: selectedMentalEvent,
      feeling: selectedFeeling,
      Instigator: selectedInstigator,
    });

    return () => {};
  }, []);
  /////////////////below this is the handlers

  const handleSelectedMentalEvent = MentalEvent => {
    setSelectedMentalEvent(MentalEvent);
    setEMContext({...eMContext, ['Mental Event']: MentalEvent});
  };

  const handleSelectedInstigatorEvent = Instigator => {
    setSelectedInstigator(Instigator);
    setEMContext({...eMContext, ['Instigator']: Instigator});
  };

  const handleSelectedUnknownInstigatorEvent = UnknwonInstigator => {
    setUnknownInstigator(UnknwonInstigator);
    setEMContext({...eMContext, ['New Instigator']: UnknwonInstigator});
  };

  const handleIntensity = intensity => {
    setIntensity(intensity);
    setEMContext({...eMContext, Intensity: intensity});
  };
  const handleSelectedFeelingChange = feeling => {
    setSelectedFeeling(feeling);
    setEMContext({...eMContext, feeling});
  };
  const handleDesire = desire => {
    setDesire(desire);
    setEMContext({...eMContext, desire});
  };

  const validationFunc = () => {
    if (
      !desire ||
      !intensity ||
      !selectedMentalEvent ||
      !selectedFeeling | !selectedInstigator
    ) {
      return 1;
    } else {
      if (selectedInstigator == 'Other') {
        if (UnknwonInstigator == '') {
          return 1;
        } else {
          resetAllStates();
          // getMyAd();
          return 0;
        }
      } else {
        resetAllStates();
        // getMyAd();
        return 0;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mental Event</Text>
      <Text style={styles.label}>Instigator</Text>

      {selectedInstigator == 'Other' ? (
        <TextInput
          placeholder="Write the Instigator if not in the list"
          placeholderTextColor="grey"
          value={UnknwonInstigator}
          onChangeText={unknownInstigator =>
            handleSelectedUnknownInstigatorEvent(unknownInstigator)
          }
          style={styles.inputOtherInstigator}></TextInput>
      ) : (
        <Picker
          selectedValue={selectedInstigator}
          onValueChange={(Instgator, InstigatorIndex) =>
            handleSelectedInstigatorEvent(Instgator)
          }
          style={styles.picker}>
          {InstigatorData.map((event, index) => (
            <Picker.Item key={index} label={event} value={event} />
          ))}
        </Picker>
      )}

      <Text style={styles.label}>Right Now, I am going Through</Text>
      <Picker
        selectedValue={selectedMentalEvent}
        onValueChange={(MentalEvent, MentalIndex) =>
          handleSelectedMentalEvent(MentalEvent)
        }
        style={styles.picker}>
        {negativeMentalEvents.map((event, index) => (
          <Picker.Item key={index} label={event} value={event} />
        ))}
      </Picker>
      <Text style={styles.label}>
        Intensity of Mental Event Right Now: {intensity}
      </Text>
      <Slider
        style={styles.slider}
        value={intensity}
        onValueChange={value => handleIntensity(value)}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor="red"
        maximumTrackTintColor="pink"
        thumbTintColor="red"
        thumbStyle={styles.sliderButton} // Apply the custom style for the slider button
      />
      <Text style={styles.label}>This Mental Event is Leading To </Text>
      <Picker
        selectedValue={selectedFeeling}
        onValueChange={handleSelectedFeelingChange}
        style={styles.picker}>
        {reactionTypes.map((obj, index) => {
          const feeling = Object.keys(obj)[0];
          return <Picker.Item key={index} label={feeling} value={feeling} />;
        })}
      </Picker>
      <TextInput
        placeholder="Wish for a Desire that would be Manifested using the Energy of this Mental Event"
        placeholderTextColor="grey"
        value={desire}
        onChangeText={desire => handleDesire(desire)}
        style={styles.input}
        multiline={true} // Set the multiline prop to true
        numberOfLines={4} // Optionally, you can set the number of visible lines
      />
      <Advertisement />
      <NavigationButton
        navigation={navigation}
        ScreenName={'Number Selector'}
        ButtonName="Transform Energy"
        validationFunc={validationFunc}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
  },
  heading: {
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: 7,
    paddingTop: 0,
    marginBottom: 10,
    marginTop: 10,
    zIndex: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,
  },
  picker: {
    width: '100%',
    height: 30,
    marginTop: 0,
    marginBottom: 10,
    color: 'red',
  },
  slider: {
    marginTop: 5,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
  },
  sliderButton: {
    width: 30,
  },
  inputOtherInstigator: {
    height: 45,
    fontSize: 16,
    fontFamily: 'New Times roman',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    color: 'white',
    textAlignVertical: 'center',
  },
  input: {
    height: 70,
    fontSize: 16,
    fontFamily: 'New Times roman',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 0,
    marginTop: 0,
    padding: 10,
    color: 'white',
    justifyContent: 'flex-start',
    verticalAlign: 'top',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    bottom: 10,
    shadowColor: 'black',
    shadowOffset: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', // Center the text inside the TouchableOpacity
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MentalEventInput;
