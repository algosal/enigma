import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Linking, StyleSheet} from 'react-native';
import axios from 'axios';

const AdvertisementCategorial = ({categorial}) => {
  let imageLink = 'https://salmansaeed.us/brain/1.jpg';
  let targetLink = 'https://tosuperhuman.com';

  let adInitialState = {
    imageLink,
    targetLink,
  };
  const [advertisementState, setAdvertisementState] = useState(adInitialState);

  const getMyAd = async () => {
    let advertisement_url =
      'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/advertisements';
    await axios
      .put(advertisement_url, {feeling: categorial})
      .then(data => {
        setAdvertisementState(data.data.body);
      })
      .catch(e => {
        setEMContext({...eMContext, e: e});
      });
  };

  useEffect(() => {
    getMyAd().then(d => {
      // alert(JSON.stringify(advertisementState));
    });
  }, []);

  const handleLinkPress = () => {
    Linking.openURL(adInitialState.targetLink);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLinkPress}>
        <Image
          source={{uri: advertisementState.imageLink}}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(100, 100, 100, 0.5)',
    backgroundColor: 'transparent',
    width: 380,
    height: '50%',
    alignSelf: 'center',
    padding: 0,
    margin: 10,
    borderRadius: 10,
    opacity: 1,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default AdvertisementCategorial;
