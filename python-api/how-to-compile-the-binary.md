# How to compile your Python program to a binary

Side Note: Node.js is **far** easier to compile. For comparison, just see the `how-to-compile-the-binary.md` in the `node-js-api` folder.

This will show how to compile your Python program to a binary.

These instructions all assume that your working directory is `my-api`.

## (1) Test running the Python program

Before compiling, ensure that the Python runs as expected by running the program with the appropriate input.

### Mac (Darwin) and Linux
```
python3.7 main.py ping '{}' '{}'
python3.7 main.py generate_public_key '{}' '{"starting_with": "a", "version": "0.0.1"}'
```

### Windows
```
py main.py ping '{}' '{}'
py main.py getNFTCollection '{}' '{\"mint_address\": \"FSMZ11aPzwddJVNFcaaqNsYRZzj2jajgNUTqHTmuzmsT\", \"version\": \"0.0.1\"}'
py main.py generate_public_key '{}' '{\"starting_with\": \"a\", \"version\": \"0.0.1\"}'
```

## (2) Install the necessary packages

First, ensure that a version of Python3.7 is installed. 

You can use any version you please, although the instructions have not been tested with other versions.

### Mac (Darwin)

1) Install Nuitka.

```
pip3 install zstandard
python3.7 -m pip install -U nuitka
```

### Linux

```
sudo pip3 install zstandard
sudo python3.7 -m pip install -U nuitka
sudo apt install python3-dev
sudo apt install patchelf
sudo apt-get install libpython3.7-dev
```

### Windows

```
py -m pip install nuitka
```

## (3) Compile it to an executable with Nuitka

This preserves your IP (we can't see your code) and ensures a predictable runtime.

NOTE: Assume raw strings (such as private keys or other secret keys) can still be read in the executable. In
the future, we will encrypt your file so that even such strings are secure.

NOTE: Make sure all needed packages are installed. For this example, the only dependency is `solana`,
which you can install with `pip3 install solana` on Mac/Linux and `py -m pip install solana` on Windows.

### Mac (Darwin)

`python3.7 -m nuitka -o main --standalone main.py --remove-output --onefile`

### Linux (Debian/Ubuntu)

`sudo python3.7 -m nuitka -o main --standalone main.py --remove-output --onefile`

If you receive errors such as "No module founded named `Solana`" and aren't sure why you're getting it, note that
all packages must be installed with `sudo` in order to be detected when compiling with `sudo`. Thus, try re-installing
`solana` (or whatever package) with `sudo pip3 install solana`. You might also need to ensure that it was installed with
the right version of Python, e.g., You had Python3.8, you installed Python3.7 to compile it with Nukita, but now
you need to install packages explicitly with Python3.7 because the default is Python3.8,
`sudo python3.7 -m pip install solana`.

### Windows

Note: Make sure you're using the version of Python that you expect. To check, run `py --version`.

`py -m nuitka --follow-imports main.py --standalone --remove-output --onefile`

## (4) Test the executable

We have also already prepared the executables so you don't have to build to test running them.

See the `test-executables` folder in the main directory of this repository.

Once the executable is running as expected, you can move on to the next step, "Verify the binary".

### Mac (Darwin)

Input Test #1
```
./test-executables/main-mac
```
Expected Output
```
OUTPUT: {"data": {"error_message": "Invalid execution.", "error_code": -2}, "response_code": 400}
```

Input Test #2
```
./test-executables/main-mac ping '{}' '{}'
```
Expected Output
```
OUTPUT: {"data": {}, "response_code": 200}
```

Input Test #3
```
./test-executables/main-mac generate_public_key '{}' '{"starting_with": "a", "version": "0.0.1"}'
```
Expected Output
```
{}
0.0.1
OUTPUT: {"data": {"public_key": "A3aPJtwCxCdjm4fxFYPicWv7WKDphzpWf53rfaN2ztEr", "private_key": [108, 40, 205, 178, 40, 8, 112, 129, 89, 138, 192, 223, 116, 244, 252, 174, 194, 186, 120, 186, 116, 85, 40, 54, 69, 165, 197, 197, 99, 238, 66, 168]}, "response_code": 200}
```

### Linux

Input Test #1
```
./test-executables/main-linux
```
Expected Output
```
OUTPUT: {"data": {"error_message": "Invalid execution.", "error_code": -2}, "response_code": 400}
```

Input Test #2
```
./test-executables/main-linux ping '{}' '{}'
```
Expected Output
```
OUTPUT: {"data": {}, "response_code": 200}
```

Input Test #3
```
./test-executables/main-linux generate_public_key '{}' '{"starting_with": "a", "version": "0.0.1"}'
```
Expected Output
```
{}
0.0.1
OUTPUT: {"data": {"public_key": "AJvUngNzD3WaPeJGZfFWDffNwhffH3EkSTjUPZc9ejNx", "private_key": [205, 193, 178, 253, 139, 111, 183, 165, 111, 174, 117, 112, 36, 106, 227, 94, 174, 99, 50, 216, 34, 74, 242, 75, 81, 34, 123, 247, 156, 16, 45, 255]}, "response_code": 200}
```

### Windows

Input Test #1
```
./test-executables/main-windows.exe
```
Expected Output
```
OUTPUT: "{\"data\": {\"error_message\": \"Invalid execution.\", \"error_code\": -2}, \"response_code\": 400}"
```

Input Test #2
```
./test-executables/main-windows.exe ping '{}' '{}'
```
Expected Output
```
OUTPUT: "{\"data\": {}, \"response_code\": 200}"
```

Input Test #3
```
./test-executables/main-windows.exe generate_public_key '{}' '{\"starting_with\": \"a\", \"version\": \"0.0.1\"}'
```
Expected Output
```
{}
0.0.1
OUTPUT: "{\"data\": {\"public_key\": \"Aj88g8H1tBkjfT4oRrLTSMfdzfUj59UXMn3o1t6Tb4TJ\", \"private_key\": [171, 209, 239, 38, 65, 163, 118, 122, 203, 249, 2, 99, 239, 191, 238, 65, 15, 8, 211, 41, 201, 28, 51, 39, 50, 102, 76, 57, 43, 233, 123, 173]}, \"response_code\": 200}"
```