import os
import platform
import json


ACCEPTED_PLATFORMS = ['Windows', 'Darwin', 'Linux']
ARCHITECTURES_SUPPORTED = ['x86_64']


if __name__ == '__main__':

    # Verifies that the OS is supported.
    if platform.system() not in ACCEPTED_PLATFORMS:
        raise Exception(
            "We do not currently support your operating system: ",
            f"{platform.system()}.",
            f"We support the following: {','.join(ACCEPTED_PLATFORMS)}"
        )
    else:
        print("Valid operating system... Continuing.")

    # Verifies that the architecture is supported.
    if platform.machine() not in ARCHITECTURES_SUPPORTED:
        raise Exception(
            "We do not currently support your architecture: ",
            f"{platform.machine()}.",
            f"We support the following: {','.join(ARCHITECTURES_SUPPORTED)}"
        )
    else:
        print("Valid architecture... Continuing.")

    output = os.popen("python3.7 -m nuitka -o main --standalone main.py --remove-output --onefile").read()
    if 'Successfully created' in output:
        print("Successfully compiled.")
    else:
        raise Exception("Unknown error. Please see output and ask us for help if needed.\n\n", "-" * 20, output)

    print("Testing", "\n" + "-" * 50)
    output = os.popen("./main ping '{}'").read()
    try:
        output_dict = json.loads(output.split("OUTPUT:")[-1])
    except json.JSONDecoder:
        raise Exception(
            "Error decoding the JSON. Did you edit the part of `main.py` "
            f"that was not supposed to be edited?. Output was: {output}"
        )

    print("Output: ", output_dict)

    if output_dict.get('response_code', 200) == 200:
        print("TEST PASSED")
    else:
        raise Exception(f"Unknown response code in `output_dict`: {output_dict}")

    # TODO:- Call `deploy` function for API
