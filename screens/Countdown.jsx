import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Context} from '../App';

const Countdown = ({initialValue = 5, navigation}) => {
  const [eMContext, setEMContext] = useContext(Context);
  const [count, setCount] = useState(eMContext.selectedNumber);
  const [intervalId, setIntervalId] = useState(null);
  const [statusIntervalId, setStatusIntervalId] = useState(null);
  // alert(JSON.stringify(eMContext));
  // Function to change the status bar color every second
  const changeStatusBarColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'lightblue', 'orange']; // Add more colors if you want
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    StatusBar.setBackgroundColor(randomColor);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    setIntervalId(timer);

    return () => clearInterval(timer);
  }, []);

  function handleComplete() {
    setCount(initialValue);
    clearInterval(intervalId);
    clearInterval(statusIntervalId);
    navigation.navigate('Phenomenon Message');
    StatusBar.setBackgroundColor('black');
  }

  useEffect(() => {
    if (count === -1) {
      handleComplete();
    }
  }, [count]);

  useEffect(() => {
    const timerId = setInterval(changeStatusBarColor, 1000);
    setStatusIntervalId(timerId);
    return () => {
      clearInterval(timerId);
      StatusBar.setBackgroundColor('black');
      // Reset the status bar color when the Countdown component is unmounted
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainContainerText}>Did the Color Repeat </Text>
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{count}</Text>
      </View>
      <Text style={styles.mainContainerText}>
        Count Down with Me. Creating the Space{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'blue',
  },
  mainContainerText: {color: 'wheat', fontSize: 34, marginTop: 100},
  countdownContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: 'white',
    shadowColor: 'wheat',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 25,
  },
  countdownText: {
    fontSize: 100,
    color: 'white',
  },
});

export default Countdown;
