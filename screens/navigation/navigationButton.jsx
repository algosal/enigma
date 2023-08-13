import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Context} from '../../App';
import {useState, useContext} from 'react';

const NavigationButton = ({
  navigation,
  ScreenName,
  ButtonName,
  validationFunc,
}) => {
  const [eMContext, setEMContext] = useContext(Context);

  const handleNextPress = () => {
    let bit = validationFunc();
    if (bit === 0) {
      navigation.navigate(ScreenName);
    } else {
      alert('Some Field are not filled!');
    }
  };
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.8} // Set the desired opacity (0 to 1) for the pressed state
      onPress={handleNextPress}>
      <Text style={styles.buttonText}>{ButtonName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: 'blue',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 4,
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: '97%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default NavigationButton;
