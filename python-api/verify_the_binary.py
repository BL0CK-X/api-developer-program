import subprocess
import platform
import sys

# ------ This is not yet completed. ------
# The main tests for verification are already included in `how-to-compile-the-binary.md`.

if __name__ == '__main__':

    # Name of the program
    _ = sys.argv[0]
    # The path to the binary
    if len(sys.argv) != 2:
        print("USAGE: python3 verify.py path/to/binary")
        exit()

    if platform.system() == 'Windows':
        pass
    elif platform.system() in ['Linux', 'Darwin']:
        pass
    else:
        print(f"Unrecognized platform, `{platform.system()}`.")
        exit()
