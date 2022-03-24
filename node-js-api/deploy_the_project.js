const theblockchainapi = require('theblockchainapi');
const axios = require('axios').default;
var FormData = require('form-data');
const { createReadStream } = require("fs");
const request = require('request');

// Install the API wrapper.
// `npm install theblockchainapi request form-data fs axios`
// node create_the_project.js

const DEFAULT_CLIENT = theblockchainapi.ApiClient.instance;

const APIKeyID = DEFAULT_CLIENT.authentications['APIKeyID'];
APIKeyID.apiKey = 'API-KEY-ID';

const APISecretKey = DEFAULT_CLIENT.authentications['APISecretKey'];
APISecretKey.apiKey = 'API-SECRET-KEY';

const PROJECT_API_INSTANCE = new theblockchainapi.ProjectApi();
const ENDPOINT_API_INSTANCE = new theblockchainapi.EndpointApi();

const HEADERS = {
    'APIKeyId': API_KEY_ID,
    'APISecretKey': API_SECRET_KEY
};


const delay = ms => new Promise(res => setTimeout(res, ms));


const testDeployment = async (projectId, version, endpointPath, inputDict) => {
    console.log("--------------------------------------------------------");
    console.log("Testing Deployment...");
    const url = 'https://api.blockchainapi.com/third-party-apis/' + projectId + '/v' + version + '/' + endpointPath;
    
    // const body = JSON.stringify(input_dict);

    const response = await axios.post(
        url,
        inputDict, 
        { 
            headers: HEADERS 
        }
    );

    console.log(response.data, response.status);
    console.log("--------------------------------------------------------");
}


const deploy = async (projectId, binaryFilePath) => {
    // This function can be modified for any language.
    // Feel free to see how it works internally.
    // It first pulls the the deployment URL, which is a pre-signed S3 URL.
    // You then upload your binary to this URL.
    // Then the function repeatedly calls `get_project_deployment_status` to check whether it was successfully deployed.
    // The time to upload depends on the size of your binary.
    // The time to deploy should be about 10-20 seconds, once uploaded.
    // If it is longer or never shows as deployed, please contact us.
    let url = "https://api.blockchainapi.com/v1/project/" + projectId + "/deploy/url";
    
    const response = await axios.post(
        url,
        {
            // 'platform': 'Linux/aarch64'
            'platform': 'Linux'
        }, 
        { 
            headers: HEADERS 
        }
    );

    const result = response.data;
    
    const fields = result['fields']
    url = result['url']

    const form = new FormData();

    Object.entries(fields).forEach(([field, value]) => {
        form.append(field, value);
    });
    form.append("file", createReadStream(binaryFilePath));

    console.log("Uploading...")

    let uploadPromise = new Promise((resolve, _) => {
        setTimeout( function() {
            form.submit(
                url, 
                (
                    (_, res) => {
                        console.log("Done!")
                        resolve({
                            statusCode: res.statusCode,
                            statusMessage: res.statusMessage
                        })
                    }
                )
            );
        }, 25000)
    })

    const res = await uploadPromise;

    if (res.statusCode == 204) {
        console.log("Upload successful. Now monitoring for successful deployment...")
    } else {
        throw Error("Upload failed... Please report this issue to our team so we can help.\n\n" + res)
    }

    let status;
    // Check status
    while (true) {

        const statusResponse = await axios.post(
            "https://api.blockchainapi.com/v1/project/" + projectId + "/deploy/status",
            {}, 
            { 
                headers: HEADERS 
            }
        );
        status = statusResponse.data;

        if ('error_message' in status) {
            throw Error(status['error_message'])
        }

        console.log(status['status'])
        if (status['status_code'] == 1) {
            break
        } else {
            console.log("Checking... ")
            await delay(5000);
        }

    }
    return status
}


const getStats = async (projectId) => {

    const statsResponse = await axios.get(
        "https://api.blockchainapi.com/v1/project/" + projectId + "/stats",
        { 
            headers: HEADERS 
        }
    );

    return statsResponse.data;
}


const main = async () => {
    // Insert the `project_id` generated after creating the project.
    const projectId = '3uB19klqeLtdqTiNyPMH'; // null;
    // This is the default version when creating a project. If you're using a different version, enter it here.
    const version = '0.0.1';
    // Modify the path to the generated binary, if necessary.
    // binary_file_path = 'my-api/main'
    // You can also just use the path to our pre-generated binaries, if you'd like to proceed for testing purposes.
    const binaryFilePath = 'binaries/main-linux';

    await deploy(projectId, binaryFilePath);

    let stats = getStats(projectId);
    console.log("STATS\n",  JSON.stringify(stats, null, 4));

    testDeployment(
        projectId,
        version,
        'ping',
        {}
    );

    testDeployment(
        projectId,
        version,
        // The path to the endpoint we created in `create_the_project.py`.
        'generate/public_key',
        {
            'startingWith': 'C'
        }
    );
    
    stats = getStats(projectId);
    console.log("STATS\n", JSON.stringify(stats, null, 4));
}


main()
