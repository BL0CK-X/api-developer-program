const axios = require('axios').default;

// You might need to install axios: `npm i axios`
// You can get a free API key pair here: https://dashboard.blockchainapi.com?a2PtQOp3ki4m8kE9yTap#api-keys"

const myFunction = async () => {
    const url = 'https://api.blockchainapi.com/third-party-apis/YAuenojAvKU53yh8BNHZ/v0.0.1/ethereum/get_nft_metadata';
    const headers = {
        "APIKeyId": "NED81CuM2gVuWHS",
        "APISecretKey": "628zdBhW69SUdjs"
    };
    const response = await axios.post(
        url,
        {
            "tokenId": "100",
            "contractAddress": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
        },
        {
            headers
        }
    );
    console.log(response.data, response.status);
}


myFunction()