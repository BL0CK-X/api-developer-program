import sys
from solana.account import Account
import json
from typing import Optional
from util import Response, ResponseCode


def generate_public_key(
    version: str,
    starting_with: str,
    max_retries: Optional[int] = 300,
    case_sensitive: Optional[bool] = False
) -> Response:

    """
    This is an example function.

    Note that it returns an instance of `Response`.

    Note that we match the `operation_id` to `generate_public_key` below in the dictionary `operation_id_to_function`.
    This is used to determine which function to call when the operation ID is passed.
    """

    # You don't need to use `version` now for this function, but you might use it later for backwards-compatibility
    # purposes as we build our mini-API.
    print(version)

    # (1) Simple error checking.
    if len(starting_with) == 0:
        return Response.get_error_response(
            error_message="`starting_with` must be of nonzero length.",
            error_code=1,
            response_code=ResponseCode.HTTP_BAD_REQUEST
        )
    elif len(starting_with) > 20:
        return Response.get_error_response(
            error_message="`starting_with` must be at most of length 20.",
            error_code=1,
            response_code=ResponseCode.HTTP_BAD_REQUEST
        )
    maximum_allowed_retries = int(1e5)
    if max_retries < 0:
        return Response.get_error_response(
            error_message="`max_retries` must be at least one.",
            error_code=1,
            response_code=ResponseCode.HTTP_BAD_REQUEST
        )
    elif max_retries > maximum_allowed_retries:
        return Response.get_error_response(
            error_message=f"`max_retries` must be at most {maximum_allowed_retries}.",
            error_code=1,
            response_code=ResponseCode.HTTP_BAD_REQUEST
        )

    # (2) The logic
    for i in range(max_retries):

        new_account = Account()
        public_key = str(new_account.public_key())

        did_find = \
            (public_key[:len(starting_with)] == starting_with) \
            if case_sensitive else \
            (public_key[:len(starting_with)].lower() == starting_with.lower())

        if did_find:
            return Response(
                data={
                    'public_key': public_key,
                    'private_key': list(new_account.secret_key())
                },
                response_code=ResponseCode.HTTP_OK
            )

    return Response.get_error_response(
        error_message=f"Unable to find a public key starting with: `{starting_with}`",
        error_code=1,
        response_code=ResponseCode.HTTP_BAD_REQUEST
    )


# ----------------------------------- DO NOT EDIT ANYTHING BELOW THIS LINE ------------------------------------
# ----------------------------------- Except    `operation_id_to_function` ------------------------------------

# NOTE: --- Do not touch or edit `ping`. We use this to verify the binary.
def ping() -> Response:
    return Response(
        data=dict(),
        response_code=ResponseCode.HTTP_OK
    )


def main() -> Response:
    # NOTE: --- To make your mini-API work, you only need to edit the dictionary `operation_id_to_function` inside the
    # `main` function. Everything else should work as is.

    # Add functions here.
    # When you're adding a function to your API, you set the `operation_id` of your endpoint.
    # Map the operation_id to the function you'd like to call.
    operation_id_to_function = {
        'generate_public_key': generate_public_key
    }
    
    operation_id_to_function_temp = dict()
    for key, value in operation_id_to_function.items():
        operation_id_to_function_temp[key.lower()] = value
    operation_id_to_function = operation_id_to_function_temp

    # The first argument (i.e., `sys.argv[0]`) is just the name of the program.
    # We must provide the other three: the `operation_id`, the `version`, and the input data..
    if len(sys.argv) != 4:
        return Response.get_error_response(
            error_message=f'Invalid execution.',
            error_code=-2,
            response_code=ResponseCode.HTTP_BAD_REQUEST
        )

    # We will always pass the `operation_id` as the second argument to the executable.
    operation_id = sys.argv[1]

    if operation_id == "ping":
        return ping()

    print(sys.argv[2])

    # The version of the API being used
    # We do not yet use this, but this will be used in order to preserve the existing format of calling the binary.
    _ = json.loads(sys.argv[2])  # `internal_usage_dict`

    # A JSON-encoded string representing a dictionary of the parameters will be passed in as the third argument.
    function_arguments_dict = json.loads(sys.argv[3])

    # Retrieve the function based on the `operation_id` received.
    try:
        func = operation_id_to_function.get(operation_id, None)
    except TypeError:
        return Response.get_error_response(
            error_message=f'Function improperly called',
            error_code=-1,
            response_code=ResponseCode.HTTP_NOT_FOUND
        )

    # If the function as not found, return an error.
    if func is None:
        return Response.get_error_response(
            error_message=f'Method with operation ID {operation_id} not found.',
            error_code=-1,
            response_code=ResponseCode.HTTP_NOT_FOUND
        )

    return func(**function_arguments_dict)


if __name__ == '__main__':
    # ----- DO NOT EDIT ------
    # We will run this here when running your executable and pass in the necessary arguments.
    result = main()
    print(f"OUTPUT: {json.dumps(result.get_dict())}")
