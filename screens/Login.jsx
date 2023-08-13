import handleLogin from './services/handleLogin';
import {Context} from '../App';

import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';

function LoginButtonComponent({navigation}) {
  const [eMContext, setEMContext] = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = async () => {
    const url = 'https://consciousneurons.com/em'; // Replace with your actual reset password URL
    await Linking.openURL(url);
  };

  const handleHelp = async () => {
    const url = 'https://consciousneurons.com'; // Replace with your actual reset password URL
    await Linking.openURL(url);
  };

  async function handleLoginFirst() {
    if (!username | !password) {
      alert('Feilds can NOT be empty');
      return;
    }
    await handleLogin(username, password)
      .then(data => {
        let decision = data.data.statusCode;
        if (decision === 200) {
          setEMContext({...eMContext, username: username});
          setPassword('');
          navigation.navigate('MentalEventInput');
        } else {
          setPassword('');
          navigation.navigate('Wrong Information');
        }
      })
      .catch(e => alert(JSON.stringify(e)));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.help} onPress={handleHelp}>
        ?
      </Text>
      <Text style={styles.header_logo}>EM</Text>
      <Text style={styles.header}>Effortless Manifestation</Text>

      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <View style={styles.my_buttons}>
        <TouchableOpacity
          style={styles.login}
          activeOpacity={0.7} // Set the desired opacity (0 to 1) for the pressed state
          onPress={handleLoginFirst}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
    color: 'white',
    height: '100%',
  },
  help: {
    position: 'absolute',
    color: 'orange',
    top: 0,
    right: 25,
    fontSize: 50,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: -20,
    color: 'wheat',
    alignSelf: 'center',
  },
  header_logo: {
    fontSize: 150,
    marginTop: 50,
    marginBottom: 0,
    color: 'navy',
    alignSelf: 'center',
    textShadowColor: 'white', // Set the shadow color to white
    textShadowOffset: {width: 5, height: 10}, // Set the offset (x, y) for the shadow
    textShadowRadius: 52, // Set the shadow radius
  },
  picker: {
    width: '80%',
    height: 40,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'blue',
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  my_buttons: {
    width: 300,
  },

  errorMessage: {
    color: 'red',
  },
  login: {
    backgroundColor: 'lightcyan',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  register: {
    backgroundColor: 'lightgreen',
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  forgotPassword: {
    backgroundColor: 'orange',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
});

export default LoginButtonComponent;
