# Hello World

Let's get started deploying your mini-API.

There are five steps to achieving this:

1) Create the project and endpoints via our API.
2) Write the code in your language of choice. In this example, we use Python.
3) Compile it to a binary.
4) Verify the binary.
5) Deploy the binary and check the deployment.

# (1) Create the project and endpoints via our API.

Check out the code in `createTheProject.js`.

The code is heavily commented to outline exactly how it works.

# (2) Write the code in your language of choice. In this example, we use Python.

Modify the `main.js` file in the `my-api` directory to add your own functions and endpoints.

For the purposes of the example, you do not need to modify `main.js`. It should work as is.

# (3) Compile it to a binary.

Run `pkg my-api/main.js --out-path binaries` to compile the binary. This will output binaries for `Linux`, `Darwin` (Mac), and `Windows` (all 64-bit). We will deploy the `Linux` binary, but test the binary that matches your machine.

# (4) Verify the binary.

Check out the code in `verifyTheBinary.js`.

The code is heavily commented to outline exactly how it works. It verifies the binary that matches your machine.

# (5) Deploy the binary and check the deployment.

Check out the code in `deployTheProject.js`.

The code is heavily commented to outline exactly how it works. It deploys the `Linux` binary.
