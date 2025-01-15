from copy import deepcopy
import requests
import logging

logger = logging.getLogger(__name__)

from openai.types.shared_params.function_definition import FunctionDefinition, FunctionParameters

class Toolbox:
    endpoint = "http://localhost:8080"

    def __init__(self):
        self.tools = [] 
       
    def add_tool_by_name(self, name: str, folder: str):
        try:
            response = requests.get(f"{self.endpoint}/tool_description?name={name}&folder={folder}")
            response.raise_for_status()
            tool_description = response.json()
            tool_description['name'] = f"remote_tool-{folder}-{name}"
            tool = FunctionDefinition(**tool_description)
            self.__add_tool(tool)
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching tool description: {str(e)}")
            raise

    def all_tools(self) -> list[dict]:
        return [{"type": "function", "function": deepcopy(tool)} for tool in self.tools]
    
    def execute_tool(self, tool_call) -> str:
        logger.info(f"Executing tool call: {tool_call}")
        try:
            response = requests.post(f"{self.endpoint}/tool_call", json=tool_call.to_dict())
            response.raise_for_status()
            result = response.text
            logger.info(f"Tool execution successful. Result: {result}")
            return result
        except requests.exceptions.RequestException as e:
            logger.error(f"Error executing tool call: {str(e)}")
            raise
 
    def __add_tool(self, tool: FunctionDefinition):
        print(f"Adding tool: {tool}")
        print(f"Tool type: {type(tool)}")
        if tool["name"] not in self.tools:
            self.tools.append(tool)
