import subprocess
import platform
import sys
import json


def check_command_output(output) -> dict:
    """
    Will return a dict if output correctly formatted. Otherwise, raise exception
    """
    output_delimiter = 'OUTPUT:'
    if len(output.split(output_delimiter)) != 2:
        raise Exception("Error. Binary improperly working. Inspect the source code of this script to see why.")
    output_dict = output.split('OUTPUT:')[-1]
    try:
        output_dict = json.loads(output_dict)
        return output_dict
    except json.decoder.JSONDecodeError:
        raise Exception("Error. Binary improperly working. Inspect the source code of this script to see why.")


def main():

    # Name of the program
    _ = sys.argv[0]
    # The path to the binary
    if len(sys.argv) != 2:
        print("USAGE: python3 verify.py path/to/binary")
        exit()

    path_to_binary = sys.argv[1]

    if platform.system() in ['Windows', 'Linux', 'Darwin']:
        """
        Input Test #1
        ```
        ./test-executables/main
        ```
        Expected Output
        ```
        OUTPUT: {"data": {"error_message": "Invalid execution.", "error_code": -2}, "response_code": 400}
        ```
        """
        result = subprocess.run(
            [
                f'./{path_to_binary}'
            ],
            capture_output=True
        )
        output = check_command_output(result.stdout.decode())
        if output['response_code'] != 400:
            raise Exception("`response_code` must be 400.")

        """
        Input Test #2
        ```
        ./test-executables/main ping '{}' '{}'
        ```
        Expected Output
        ```
        OUTPUT: {"data": {}, "response_code": 200}
        ```
        """
        result = subprocess.run(
            [
                f'./{path_to_binary}',
                'ping',
                "'{}'",
                "'{}'"
            ],
            capture_output=True
        )
        output = check_command_output(result.stdout.decode())
        if output['response_code'] != 200:
            raise Exception("`response_code` must be 400.")

        print("*** All Tests Passed *** \nAdd more tests here to verify your binary. "
              "We highly recommend testing your API as you develop it. "
              "If you don't, it becomes almost impossible to make changes in the future because you don't have a "
              "quick and easy way to ensure that those changes did not break anything.")
    else:
        print(f"Unrecognized platform, `{platform.system()}`.")
        exit()


if __name__ == '__main__':
    main()
