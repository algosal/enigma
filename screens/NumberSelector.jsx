import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Context} from '../App';

const NumberSelector = ({navigation}) => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [eMContext, setEMContext] = useContext(Context);

  const handleSelectedNumberChange = number => {
    setSelectedNumber(number);
    setEMContext({...eMContext, selectedNumber: number});
    navigation.navigate('Count Down');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Number to Roll the Dice</Text>
      <View style={styles.numberContainer}>
        {Array.from({length: 7}, (_, index) => index + 1).map(number => (
          <TouchableOpacity
            key={number}
            style={[
              styles.numberButton,
              selectedNumber === number && styles.selectedButton,
            ]}
            onPress={() => handleSelectedNumberChange(number)}>
            <Text
              style={[
                styles.numberButtonText,
                selectedNumber === number && styles.selectedButtonText,
              ]}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedNumber}>
        Selected Number: {selectedNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'wheat',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
  selectedButton: {
    backgroundColor: 'blue',
  },
  numberButtonText: {
    fontSize: 18,
    color: 'black',
  },
  selectedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedNumber: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
  },
});

export default NumberSelector;
