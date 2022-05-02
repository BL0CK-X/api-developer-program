const { spawnSync } = require( 'child_process' );

// `npm i child_process`


const checkCommandOutput = (output) => {
    /*
    Will return a dict if output correctly formatted. Otherwise, raise exception
    */
    
    const outputDelimiter = 'OUTPUT:'
    const splitArr = output.split(outputDelimiter);

    if (splitArr.length < 2) {
        throw Error("Error. Binary improperly working. Inspect the source code of this script to see why.")
    }
    let outputDict = splitArr[splitArr.length - 1];
    
    try {
        outputDict = JSON.parse(outputDict)
        console.log(outputDict);
        return outputDict
    } catch (error) {
        console.log(error);
        throw Error("Error. Binary improperly working. Inspect the source code of this script to see why.")
    }
}


const main = () => {

    const platform = process.platform;
    let path_to_binary;

    if (platform == 'win32') {
        path_to_binary = 'binaries/main-win.exe';
    } else if (platform == 'darwin') {
        path_to_binary = 'binaries/main-macos';
    } else if (platform == 'linux') {
        path_to_binary = 'binaries/main-linux';
    } else {
        throw Error("Unrecognized platform: " + platform);
    }

    console.log("NOTE: This file tests the binary at path `" + path_to_binary + "` but we're uploading the binary at `my-api/main`.")
    console.log("Thus, if the tests pass here but not after uploading, make sure that *both* binaries are uploaded.")

    /*
    Input Test #1
    ```
    ./test-executables/main
    ```
    Expected Output
    ```
    OUTPUT: {"data": {"error_message": "Invalid execution.", "error_code": -2}, "response_code": 400}
    ```
    */
    let result = spawnSync('./' + path_to_binary).stdout;
    result = String.fromCharCode(...result);
    let output = checkCommandOutput(result)
    if (output['response_code'] != 400) {
        throw Error("`response_code` must be 400.")
    }

    /*
    Input Test #2
    ```
    ./test-executables/main ping '{}' '{}'
    ```
    Expected Output
    ```
    OUTPUT: {"data": {}, "response_code": 200}
    ```
    */
    result = spawnSync('./' + path_to_binary, ['ping', JSON.stringify({}), JSON.stringify({})]).stdout;
    result = String.fromCharCode(...result);
    output = checkCommandOutput(result)
    if (output['response_code'] != 200) {
        throw Error("`response_code` must be 200.")
    }

    result = spawnSync('./' + path_to_binary, ['generatePublicKey', JSON.stringify({}), JSON.stringify({"startingWith": "A"})]).stdout;
        result = String.fromCharCode(...result);
        output = checkCommandOutput(result)
        if (output['response_code'] != 200) {
            throw Error("`response_code` must be 200.")
        }

    console.log("*** All Tests Passed *** \nAdd more tests here to verify your binary. We highly recommend testing your API as you develop it. If you don't, it becomes almost impossible to make changes in the future because you don't have a quick and easy way to ensure that those changes did not break anything.")
}


main()
