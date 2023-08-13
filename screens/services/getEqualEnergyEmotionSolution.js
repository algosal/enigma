import axios from 'axios';
export default async function getEqualEneryEmotionSolution(feelings) {
      let convertors_url =
        'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/getequalenergyemotion';
       return await axios
        .put(convertors_url, {emotion: feelings})
        .then(data => {
        //   console.log(data.data.body);
            // alert(JSON.stringify(data.data.body));
            return data.data.body['converted-to'];
        })
        .catch(e => console.log(e));
    }
