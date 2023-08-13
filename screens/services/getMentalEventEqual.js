  function getEqualEneryEmotion() {
      let convertors_url =
        'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/getequalenergyemotion';
      axios
        .put(convertors_url, {emotion: phenomenon.feelings})
        .then(data => {
          console.log(data.data.body);
        //   setEqualEnergyEmotion(data.data.body['converted-to']);
        })
        .catch(e => console.log(e));
    }