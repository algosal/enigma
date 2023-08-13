import axios from "axios";  
let saveEnergyConvertionRequestObject = (energyConvertionRequestObject) => {
    // alert(JSON.stringify(energyConvertionRequestObject));
    let MentalEvents_URL =
      'https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/insertmentalevent';
    axios.post(MentalEvents_URL, energyConvertionRequestObject).then(data => {
    //   alert(JSON.stringify(data));
    }).catch(e=>alert(e));
};
  
export default saveEnergyConvertionRequestObject;
