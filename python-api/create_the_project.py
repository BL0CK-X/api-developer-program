from theblockchainapi.developer_program_resource import DeveloperProgramResource, Group, Type, Specification
import json


API_KEY_ID = None
API_SECRET_KEY = None


try:
    assert API_KEY_ID is not None
    assert API_SECRET_KEY is not None
except AssertionError:
    raise Exception("Fill out your API keys!")


RESOURCE = DeveloperProgramResource(
    api_key_id=API_KEY_ID,
    api_secret_key=API_SECRET_KEY
)


def clean_up_endpoints():
    # Deletes all endpoints, but saves the projects.
    # When you delete a project, all of its associated endpoints and binaries are deleted too.
    # This is just to show that the functions `list_endpoints` and `delete_endpoint` exist.
    endpoints = RESOURCE.list_endpoints()
    for endpoint in endpoints:
        RESOURCE.delete_endpoint(
            # A unique endpoint is defined by a `project_id`, a `version`, and a `path`.
            project_id=endpoint['project_id'],
            path=endpoint['path'],
            version=endpoint['version']
        )


def clean_up():
    # Deletes all projects.
    projects = RESOURCE.list_projects()
    for project in projects:
        RESOURCE.delete_project(
            project_id=project['project_id']
        )


def main():
    # Create a project.
    # You can modify all of these values later by supplying the updated values
    # and the `project_id` to `RESOURCE.update_project`.
    project = RESOURCE.create_project(
        project_name='Wallet API',
        project_description='This API offers several functions that makes it easy to interact with wallets on Solana.',
        contact_email='my-api-support-email@gmail.com',  # Users using your API can contact you if they have any issues.
        groups=[
            # Groups are optional. You can pass an empty list.
            # Each group defines a section in the documentation to group endpoints. It does not have any other effect.
            Group(
                section_name='Solana Wallets',  # This is a section, which is a grouping of groups in the documentation.
                group_name='Wallet Generation',  # This is the group name. It is shown in the sidebar of the docs.
                group_description='These functions generate wallets in various ways.'  # This is a description
            )
        ]
    )

    project_id = project['project_id']
    print("Created the Project:\n", json.dumps(project, indent=4))
    current_version = project['current_documentation_version']
    print(f"Current Version: {current_version}")
    print(f"All available versions: {','.join(project['versions'])}")

    # The `set_endpoint` function allows you to both create an endpoint or update an endpoint later.
    updated_project = RESOURCE.set_endpoint(
        # The `project_id` under which the endpoint exists.
        project_id=project_id,
        # The readable short name that describes your endpoint. Answers: "What's the main task that this function does?"
        readable_name='Generate Public Key',
        # The path of this endpoint. This will be called at: api.blockchainapi.com/third-party-apis/{project_id}/{path}
        path='generate/public_key',
        # The price per call of this endpoint. Values from 1 to 100.
        credits_=5,
        # The description of the endpoint
        description='Generate a public key with a specific starting string.',
        # The group under which to nest the function.
        group_name='Wallet Generation',
        # The operation ID is defined in the dictionary `operation_id_to_function` in `main.py`.
        # For now, this is mostly not consumer-facing (we only use it internally to call your binary and your function).
        # However, it will also link directly to the function's documentation.
        # For example, our "Create an NFT" function has an `operation_id` of `solanaCreateNFT` and
        # is viewable at https://docs.blockchainapi.com/#operation/solanaCreateNFT.
        # In the future, we will auto-generate wrappers for your API. When we do, the `operation_id` will be the name
        # of the function.
        operation_id='generate_public_key',
        # This is shown in the sidebar of the documentation.
        summary='Generate a public key',
        # The version of the endpoint.
        version=current_version,
        input_specification=[
            # The `input_specification` is a list of specifications,
            # where each specification describes a single input parameter.
            Specification(
                description='Generates a public key starting with the `starting_with` string you specify. '
                            'Min length is 1; max length is 20.',
                name='starting_with',
                required=True,
                type_=Type.STRING
            ),
            Specification(
                description='How many times to attempt to generate a matching account before terminating the program. '
                            'Min is 1. Max is 300. Default is ',
                name='max_retries',
                required=False,
                type_=Type.NUMBER
            ),
            Specification(
                description='Whether or not the function treats the `starting_with` '
                            'as case sensitive when determining a match.',
                name='case_sensitive',
                required=False,
                type_=Type.BOOL
            )
        ],
        # Currently, `input_examples` and `output_examples` are limited to one example each.
        input_examples=[
            {
                'starting_with': 'A'
            }
        ],
        output_specification=[
            # The `output_specification` is a list of specifications,
            # where each specification describes a single output key/value pair in the returned dictionary.
            Specification(
                description='The public key of the account generated.',
                name='public_key',
                required=True,
                type_=Type.STRING
            ),
            Specification(
                description='An array of integers representing the private key of the account generated.',
                name='private_key',
                required=True,
                type_=Type.ARRAY
            )
        ],
        # Currently, `input_examples` and `output_examples` are limited to one example each.
        output_examples=[
            {
                'public_key': 'Ab7AjygsuzVGjJ2T2NWJ4XeGmf9wsagSnMJxBmEim7md',
                'private_key': [
                    4, 200, 84, 37, 243, 96, 217, 188, 116, 242, 113, 184, 162, 77, 239, 236, 184, 70, 209, 142, 172,
                    215, 25, 67, 11, 113, 153, 59, 175, 21, 159, 2
                ]
            }
        ]
    )

    print("Updated the Project with a New Endpoint:\n", json.dumps(updated_project, indent=4))

    project = RESOURCE.update_project_documentation(
        project_id=project_id,
        version=current_version
    )
    documentation_link = project['documentation_link']
    current_documentation_version = project['current_documentation_version']
    print(f"You can now view the documentation here: {documentation_link}. "
          f"Wait a few seconds before it becomes available.")
    print(f"The documentation can only represent one project version at a time. "
          f"This is represented by the value of `current_documentation_version` for the project.")
    print(f"The `current_documentation_version` is `{current_documentation_version}`.")
    print("You can set the `current_documentation_version` by setting a new version when "
          "calling `update_project_documentation`.")

    print("You can create a new project version (e.g., `0.0.2`) by calling `create_project_version`.")
    print("This will copy over all endpoints from the `current_documentation_version` to the new version.")
    print("When we call your function, we will pass the version used to your function, this way you can properly "
          "address versioning.")
    print("Each version can have its own set of endpoints.")
    print(f"NOTE: Your `project_id` is `{project_id}`. You will use this to deploy the project later.")
    # project = RESOURCE.create_project_version(
    #     project_id=project_id,
    #     version='0.0.2'
    # )
    # print("Updated the Project with a New Version:\n", json.dumps(updated_project, indent=4))


if __name__ == '__main__':
    main()
    # clean_up()
