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

You can check your current node version with `node --version`.

Then, you can use that node version to modify the command below. You can use any node version you please.

Run `pkg my-api/main.js --out-path binaries -t node17-linux-x64,node17-win-x64,node17-macos-x64` to compile the binary. This will output binaries for `Linux`, `Darwin` (Mac), and `Windows` (all 64-bit). We will deploy the `Linux` binary, but test the binary that matches your machine.

You can learn more about pkg and how to use it <a href="https://github.com/vercel/pkg">here</a>.

The key bit to know here is that we just need it to be in a binary for Linux and for a 64-bit architecture. Any version of Node works.

# (4) Verify the binary.

Check out the code in `verifyTheBinary.js`.

The code is heavily commented to outline exactly how it works. It verifies the binary that matches your machine.

# (5) Deploy the binary and check the deployment.

Check out the code in `deployTheProject.js`.

The code is heavily commented to outline exactly how it works. It deploys the `Linux` binary.
