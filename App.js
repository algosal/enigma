// In App.js in a new project

import * as React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginButtonComponent from './screens/Login';
import MentalEventInput from './screens/MentalEventInput';
import NumberSelector from './screens/NumberSelector';
import Countdown from './screens/Countdown';
import PhenomenonMessage from './screens/PhenomenonMessage';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { createContext, useState } from 'react';
import RegisterComponent from './screens/RegisterComponent';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'black' }}>
      <Text style={{color:'white', fontSize:34}}>Incorrect Information</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export const Context = createContext();
function App() {


  let emState = {
    username: 'notloggedin',
    Instigator: "Environment",
    ['Mental Event']: 'Thoughts of Failure',
    'External Stimuli': '',
    'Internal Stimuli': '',
    feeling: 'Anger',
    desire: '',
    selectedNumber: 5,
    Intensity: 10, 
    position: {},
  };
 const [eMContext, setEMContext] = useState(emState);
  return (
    <NavigationContainer>
      <SafeAreaView>

        <View>
          <StatusBar barStyle="light-content" backgroundColor="black" color="blue" />     
        </View>
      </SafeAreaView>
      <Context.Provider value={[eMContext, setEMContext]}>

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={LoginButtonComponent}
              options={{
    headerShown: false, // Hide the header
  }}
        />
          <Stack.Screen name="Wrong Information" component={HomeScreen} />
          
            <Stack.Screen
          name="MentalEventInput"
          component={MentalEventInput}
         options={{
    headerShown: false, // Hide the header
  }}
          />
          

             <Stack.Screen name="Number Selector" component={NumberSelector}
            options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'Wheat', 
          }}
          />
          

            <Stack.Screen
          name="Count Down"
          component={Countdown}
         options={{
    headerShown: false, // Hide the header
  }}
          />


                <Stack.Screen
          name="Phenomenon Message"
          component={PhenomenonMessage}
         options={{
    headerShown: false, // Hide the header
  }}
          />

          
            <Stack.Screen
          name="Register"
          component={RegisterComponent}
         options={{
    headerShown: false, // Hide the header
  }}
          />
        </Stack.Navigator>
      </Context.Provider>
        
    </NavigationContainer>
   
  );
}




const styles = StyleSheet.create({
  body: {
    backgroundColor:"navy",
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
    color: "white",
    height: 720,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: -20,
    color: "wheat",
    alignSelf: "center",
  },
  header_logo: {
    fontSize: 150,
    marginTop: 50,
    marginBottom: 0,
    color: "navy",
    alignSelf: "center",
    textShadowColor: "white",
    textShadowOffset: { width: 5, height: 10 },
    textShadowRadius: 50,
  },
});


export default App;