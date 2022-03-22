const solanaWeb3 = require('@solana/web3.js');
const { Response, ResponseCode } = require('./util.js')

    
const generatePublicKey = ({version, startingWith, maxRetries = 300, caseSensitive = false}) => {

    /*
    This is an example function.

    Note that it returns an instance of `Response`.

    Note that we match the `operation_id` to `generate_public_key` below in the dictionary `operation_id_to_function`.
    This is used to determine which function to call when the operation ID is passed.
    */

    // You don't need to use `version` now for this function, but you might use it later for backwards-compatibility
    // purposes as we build our mini-API.
    console.log(version);

    // (1) Simple error checking.
    if (startingWith.length == 0) {
        return Response.getErrorResponse(
            errorMessage="`starting_with` must be of nonzero length.",
            errorCode=1,
            responseCode=ResponseCode.HTTP_BAD_REQUEST
        );
    } else if (startingWith.length > 5) {
        return Response.getErrorResponse(
            errorMessage="`starting_with` must be at most of length 5.",
            errorCode=1,
            responseCode=ResponseCode.HTTP_BAD_REQUEST
        );
    }
    let maximumAllowedRetries = Number(1e6);
    if (maxRetries < 0) {
        return Response.getErrorResponse(
            errorMessage="`max_retries` must be at least one.",
            errorCode=1,
            responseCode=ResponseCode.HTTP_BAD_REQUEST
        );
    } else if (maxRetries > maximumAllowedRetries) {
        return Response.getErrorResponse(
            errorMessage="`max_retries` must be at most " + String(maximumAllowedRetries) + ".",
            errorCode=1,
            responseCode=ResponseCode.HTTP_BAD_REQUEST
        )
    }

    // (2) The logic
    for (let i = 0; i < maxRetries; i++) {

        let newKeypair = new solanaWeb3.Keypair();
        let publicKey = String(newKeypair.publicKey);

        console.log(publicKey, "publicKey");
        
        let didFind = false;
        if (caseSensitive) {
            if (publicKey.slice(0, startingWith.length) == startingWith) {
                didFind = true;
            }
        } else {
            if (publicKey.slice(0, startingWith.length).toLowerCase() == startingWith.toLowerCase()) {
                didFind = true;
            }
        }
        

        if (didFind) {
            const values = new Array();
            for (var key in newKeypair.secretKey) {
                values.push(newKeypair.secretKey[key]);
            }
            return new Response(
                {
                    'public_key': publicKey,
                    'private_key': values
                },
                ResponseCode.HTTP_OK
            )
        }
    }

    return Response.getErrorResponse(
        errorMessage="Unable to find a public key starting with: `" + startingWith + "`.",
        errorCode=-1,
        responseCode=ResponseCode.HTTP_BAD_REQUEST
    )
}


// ----------------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE ------------------------------------
// ----------------------------------- Except    `operation_id_to_function` ------------------------------------

    // NOTE: --- Do not touch or edit `ping`. We use this to verify the binary.
const ping = () => {
    return new Response(
        {},
        ResponseCode.HTTP_OK
    );
}


const main = () => {
    // NOTE: --- To make your mini-API work, you only need to edit the dictionary `operation_id_to_function` inside the
    // `main` function. Everything else should work as is.

    // Add functions here.
    // When you're adding a function to your API, you set the `operation_id` of your endpoint.
    // Map the operation_id to the function you'd like to call.
    const operationIdToFunction = {
        'generatePublicKey': generatePublicKey
    };

    console.log(process.argv.length);

    // The first argument (i.e., `sys.argv[0]`) is just the name of the program.
    // We must provide the other three: the `operation_id`, the `version`, and the input data..
    if (process.argv.length != 5) {
        return Response.getErrorResponse(
            errorMessage="Invalid execution.",
            errorCode=-2,
            responseCode=ResponseCode.HTTP_BAD_REQUEST
        );
    }
    
    // We will always pass the `operation_id` as the second argument to the executable.
    const operationId = process.argv[2];

    if (operationId === "ping") {
        return ping();
    }

    console.log(process.argv[2]);

    // The version of the API being used
    // We do not yet use this, but this will be used in order to preserve the existing format of calling the binary.
    // const internalUsageDict = JSON.parse(process.argv[3]);

    // A JSON-encoded string representing a dictionary of the parameters will be passed in as the third argument.
    const functionArgumentsDict = JSON.parse(process.argv[4]);

    // Retrieve the function based on the `operationId` received.
    const func = operationIdToFunction[operationId];

    // If the function as not found, return an error.
    if (func === null || func === undefined) {
        return Response.getErrorResponse(
            errorMessage="Method with operation ID " + operationId + " not found.",
            errorCode=-1,
            responseCode=ResponseCode.HTTP_NOT_FOUND
        );
    }

    return func(functionArgumentsDict)
}


// ----- DO NOT EDIT ------
// We will run this here when running your executable and pass in the necessary arguments.
const result = main();
console.log("OUTPUT: " + JSON.stringify(result.getDict()));
