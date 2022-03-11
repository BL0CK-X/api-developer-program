from theblockchainapi.developer_program_resource import DeveloperProgramResource, Group, Type, Specification
import json




try:
    assert API_KEY_ID is not None
    assert API_SECRET_KEY is not None
except AssertionError:
    raise Exception("Fill out your API keys!")


RESOURCE = DeveloperProgramResource(
    api_key_id=API_KEY_ID,
    api_secret_key=API_SECRET_KEY
)
