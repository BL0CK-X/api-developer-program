const theblockchainapi = require('theblockchainapi');

// Install the API wrapper.
// `npm install theblockchainapi`
// node create_the_project.js

const DEFAULT_CLIENT = theblockchainapi.ApiClient.instance;

const APIKeyID = DEFAULT_CLIENT.authentications['APIKeyID'];
APIKeyID.apiKey = 'API-KEY-ID';

const APISecretKey = DEFAULT_CLIENT.authentications['APISecretKey'];
APISecretKey.apiKey = 'API-SECRET-KEY';

const PROJECT_API_INSTANCE = new theblockchainapi.ProjectApi();
const ENDPOINT_API_INSTANCE = new theblockchainapi.EndpointApi();


const cleanUp = async () => {
    const projects = await PROJECT_API_INSTANCE.listProjects().then((data) => {
        console.log('API called successfully. Returned data: ' + data);
        return data;
    }, (error) => {
        console.error(error);
        return null
    });

    console.log("projects", projects);

    for (let i = 0; i < projects.length; i++) {
        console.log(projects[i]);
        const response = await PROJECT_API_INSTANCE.deleteProject(projects[i]['project_id']).then(() => {
            console.log('API called successfully.');
            return null;
        }, (error) => {
            console.error(error);
            return null;
        });
        console.log(response);
    }
}


const main = async () => {
    // Create a project.
    // You can modify all of these values later by supplying the updated values
    // and the `project_id` to `RESOURCE.update_project`.

    const createProjectRequest = new theblockchainapi.ProjectCreateRequest();
    createProjectRequest.project_name = 'Wallet API';
    // Users using your API can contact you if they have any issues.
    createProjectRequest.project_description = 'This API offers several functions that makes it easy to interact with wallets on Solana.';
    createProjectRequest.contact_email = 'my-api-support-email@gmail.com';
    createProjectRequest.groups = [
        {
            // Groups are optional. You can pass an empty list.
            // Each group defines a section in the documentation to group endpoints. It does not have any other effect.
            section_name: 'Solana Wallets',  // This is a section, which is a grouping of groups in the documentation.
            group_name: 'Wallet Generation',  // This is the group name. It is shown in the sidebar of the docs.
            group_description: 'These functions generate wallets in various ways.'  // This is a description
        }
    ]

    opts = {
        'projectCreateRequest': createProjectRequest
    };
    let project = await PROJECT_API_INSTANCE.createProject(opts).then((data) => {
            // console.log('API called successfully. Returned data: ' + data);
            return data;
        }, (error) => {
            console.error(error);
            return null;
        }
    );
    
    const projectId = project['project_id'];
    console.log("Created the Project:\n", project);
    const currentVersion = project['current_documentation_version'];
    console.log("Current Version: " + currentVersion);
    console.log("All available versions: ", project['versions']);
    
    const endpointRequest = new theblockchainapi.Endpoint();
    // 
    endpointRequest.project_id = projectId;
    // 
    endpointRequest.readable_name = 'Generate Public Key';
     // The path of this endpoint. This will be called at: api.blockchainapi.com/third-party-apis/{project_id}/{path}
    endpointRequest.path = 'generate/public_key';
    // The price per call of this endpoint. Values from 1 to 100.
    endpointRequest.credits = 5;
    // The description of the endpoint
    endpointRequest.description = 'Generate a public key with a specific starting string.';
    // The group under which to nest the function.
    endpointRequest.group_name = 'Wallet Generation';
    // The operation ID is defined in the dictionary `operation_id_to_function` in `main.py`.
    // For now, this is mostly not consumer-facing (we only use it internally to call your binary and your function).
    // However, it will also link directly to the function's documentation.
    // For example, our "Create an NFT" function has an `operation_id` of `solanaCreateNFT` and
    // is viewable at https://docs.blockchainapi.com/#operation/solanaCreateNFT.
    // In the future, we will auto-generate wrappers for your API. When we do, the `operation_id` will be the name
    // of the function.
    endpointRequest.operation_id = 'generatePublicKey';
    // This is shown in the sidebar of the documentation.
    endpointRequest.summary = 'Generate a public key';
    // The version of the endpoint.
    endpointRequest.version = currentVersion;
    // The `input_specification` is a list of specifications,
    // where each specification describes a single input parameter.
    endpointRequest.input_specification = [
        {
            description: 'Generates a public key starting with the `starting_with` string you specify. Min length is 1; max length is 20.',
            name: 'startingWith',
            required: true,
            type: 'string'
        },
        {
            description: 'How many times to attempt to generate a matching account before terminating the program. Min is 1. Max is 300. Default is ',
            name: 'maxRetries',
            required: false,
            type: 'number'
        },
        {
            description: 'Whether or not the function treats the `starting_with` as case sensitive when determining a match.',
            name: 'caseSensitive',
            required: false,
            type: 'boolean'
        }
    ]
    // Currently, `input_examples` and `output_examples` are limited to one example each.
    endpointRequest.input_examples = [
        {
            'startingWith': 'A'
        }
    ]
    // The `output_specification` is a list of specifications,
    // where each specification describes a single output key/value pair in the returned dictionary.
    endpointRequest.output_specification = [
        {
            description: 'The public key of the account generated.',
            name: 'publicKey',
            required: true,
            type: 'object'
        },
        {
            description: 'An array of integers representing the private key of the account generated.',
            name: 'privateKey',
            required: true,
            type: 'array'
        }
    ]
     // Currently, `input_examples` and `output_examples` are limited to one example each.
    endpointRequest.output_examples = [
        {
            'publicKey': 'Ab7AjygsuzVGjJ2T2NWJ4XeGmf9wsagSnMJxBmEim7md',
            'privateKey': [
                4, 200, 84, 37, 243, 96, 217, 188, 116, 242, 113, 184, 162, 77, 239, 236, 184, 70, 209, 142, 172,
                215, 25, 67, 11, 113, 153, 59, 175, 21, 159, 2
            ]
        }
    ]

    opts = {
        'endpoint': endpointRequest
    };

    // The `setEndpoint` function allows you to both create an endpoint or update an endpoint later.
    const updatedProject = await ENDPOINT_API_INSTANCE.setEndpoint(opts).then((data) => {
            // console.log('API called successfully. Returned data: ' + data);
            return data;
        }, (error) => {
            console.error(error);
            return null;
        }
    );

    console.log("Updated the Project with a New Endpoint...");
    
    project = await PROJECT_API_INSTANCE.updateProjectDocumentation(projectId, currentVersion).then((data) => {
        // console.log('API called successfully. Returned data: ' + data);
        return data;
    }, (error) => {
        console.error(error);
        return null;
    });

    console.log(project);

    const documentationLink = "https://docs.blockchainapi.com/third-party-apis/" + projectId;
    const currentDocumentationVersion = project['current_documentation_version'];

    console.log("You can now view the documentation here: " + documentationLink + ". Wait a few seconds before it becomes available.")
    console.log("The documentation can only represent one project version at a time. This is represented by the value of `current_documentation_version` for the project.")
    console.log("The `current_documentation_version` is `" + currentDocumentationVersion + "`.")
    console.log("You can set the `current_documentation_version` by setting a new version when calling `update_project_documentation`.")

    console.log("You can create a new project version (e.g., `0.0.2`) by calling `create_project_version`.")
    console.log("This will copy over all endpoints from the `current_documentation_version` to the new version.")
    console.log("When we call your function, we will pass the version used to your function, this way you can properly address versioning.")
    console.log("Each version can have its own set of endpoints.")
    console.log("NOTE: Your `project_id` is `" + projectId + "`. You will use this to deploy the project later.")
}


main();
// cleanUp();
