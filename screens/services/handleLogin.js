import axios from 'axios';

const handleLogin = async (username, password) => {
    let login_url =
        "https://x1jequ5jl2.execute-api.us-east-1.amazonaws.com/v1/user/login";
    return await  axios
        .put(login_url, {
            email: username,
            password: password,
        }).then(data => {
            // alert(JSON.stringify(data.data));
            return data
        }).catch(e=>e);
         
}

   
export default handleLogin;