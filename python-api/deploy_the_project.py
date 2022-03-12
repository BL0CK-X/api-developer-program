from theblockchainapi.developer_program_resource import DeveloperProgramResource
import requests
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


def test_deployment(project_id: str, version: str, endpoint_path: str, input_dict: dict):
    print("-" * 20)
    print("Testing Deployment...")
    response = requests.post(
        url=f'https://api.blockchainapi.com/third-party-apis/{project_id}/v{version}/{endpoint_path}',
        data=json.dumps(input_dict),
        headers={
            'APIKeyId': API_KEY_ID,
            'APISecretKey': API_SECRET_KEY
        }
    )
    print(json.dumps(response.json(), indent=4))
    print("-" * 20)


def deploy(project_id: str, binary_file_path: str):
    # This function can be modified for any language.
    # Feel free to see how it works internally.
    # It first pulls the the deployment URL, which is a pre-signed S3 URL.
    # You then upload your binary to this URL.
    # Then the function repeatedly calls `get_project_deployment_status` to check whether it was successfully deployed.
    # The time to upload depends on the size of your binary.
    # The time to deploy should be about 10-20 seconds, once uploaded.
    # If it is longer or never shows as deployed, please contact us.
    RESOURCE.deploy_project(project_id, binary_file_path)


def main():
    # Insert the `project_id` generated after creating the project.
    project_id = None
    # This is the default version when creating a project. If you're using a different version, enter it here.
    version = '0.0.1'
    # Modify the path to the generated binary, if necessary.
    # binary_file_path = 'my-api/main'
    # You can also just use the path to our pre-generated binaries, if you'd like to proceed for testing purposes.
    binary_file_path = 'my-api/main'

    deploy(project_id, binary_file_path)

    stats = RESOURCE.get_project_stats(project_id)
    print("STATS\n", json.dumps(stats, indent=4))

    test_deployment(
        project_id=project_id,
        version=version,
        endpoint_path='ping',
        input_dict=dict()
    )

    test_deployment(
        project_id=project_id,
        version=version,
        # The path to the endpoint we created in `create_the_project.py`.
        endpoint_path='generate/public_key',
        input_dict={
            'starting_with': 'C'
        }
    )

    stats = RESOURCE.get_project_stats(project_id)
    print("STATS\n", json.dumps(stats, indent=4))


if __name__ == '__main__':
    main()
