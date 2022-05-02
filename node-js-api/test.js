const axios = require('axios').default;

// You might need to install axios: `npm i axios`
// You can get a free API key pair here: https://dashboard.blockchainapi.com?a2PtQOp3ki4m8kE9yTap#api-keys"

const myFunction = async () => {
    const url = 'https://api.blockchainapi.com/third-party-apis/a2PtQOp3ki4m8kE9yTap/v0.0.1/public_key';
    const headers = {
        "APIKeyId": "u4xCxAwbF29n3W8",
        "APISecretKey": "i1CYr3c4KAU3hpo"
    };
    const response = await axios.post(
        url,
        {
            "starting_with": "A"
        }, 
        {
            headers
        }
    );
    console.log(response.data, response.status);
}

myFunction()