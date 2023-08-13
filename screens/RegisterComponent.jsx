import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import axios from 'axios';

const RegisterComponent = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleTermsLink = () => {
    Linking.openURL('https://consciousneurons.com/privacy/em/terms.html');
  };

  const handleRegister = () => {
    const errors = [];
    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    if (!username) {
      errors.push('Username is required');
    }

    if (!email) {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('Invalid email address');
    }

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }

      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }

      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase character');
      }

      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        errors.push('Password must contain at least one special symbol');
      }
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    axios
      .post(
        'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/user/register',
        {
          username: username,
          password: password,
          email: email,
        },
      )
      .then(data => {
        Alert.alert('Success', data.data.body, [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      {errorMessages.map((message, index) => (
        <Text key={index} style={styles.errorMessage}>
          {message}
        </Text>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="blue"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="blue"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="blue"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="blue"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
      />

      <View style={styles.termsContainer}>
        <Checkbox
          disabled={false}
          value={termsAccepted}
          onValueChange={value => setTermsAccepted(value)}
          tintColors={{true: 'green', false: 'red'}} // Customize checkbox color
        />
        <Text style={styles.termsText}>
          I agree to the
          <Text style={styles.linkText} onPress={handleTermsLink}>
            {' '}
            terms and conditions
          </Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'green',
    textAlign: 'center',
    alignItems: 'center',
    width: 300,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 5,
    color: 'white',
  },
});

export default RegisterComponent;
