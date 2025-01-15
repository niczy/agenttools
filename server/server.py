from fastapi import FastAPI, HTTPException
import uvicorn
from pydantic import BaseModel
import json
import logging
import os
import argparse

from llm_sandbox import SandboxSession

# Configure logging to output debug and info
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

class ToolCall(BaseModel):
    id: str
    type: str
    function: dict

def parse_tool_args(args: dict) -> str:
    """Parse tool arguments into a string for function call.
    
    Args:
        args: Dictionary of argument names and values
        
    Returns:
        String of formatted arguments for function call
    """
    arg_parts = []
    for k, v in args.items():
        if v is None:
            arg_parts.append(f"{k}=None")
        elif isinstance(v, str):
            arg_parts.append(f"{k}='{v}'")
        elif isinstance(v, (int, float, bool)):
            arg_parts.append(f"{k}={v}")
        elif isinstance(v, (list, dict)):
            arg_parts.append(f"{k}={json.dumps(v)}")
        else:
            raise ValueError(f"Unsupported argument type for {k}: {type(v)}")
            
    return ", ".join(arg_parts)

@app.get("/tool_description")
async def get_tool_description(name: str, folder: str):
    """Endpoint to get the tool description from a JSON file."""
    logger.info(f"Received request for tool description: name={name}, folder={folder}")
    try:
        with open(f"{tools_path}/{folder}/{name}.json", "r") as f:
            tool_description = json.load(f)
        logger.info(f"Successfully retrieved tool description for: name={name}, folder={folder}")
        return tool_description
    except FileNotFoundError:
        logger.error(f"Tool description file not found: {tools_path}/{folder}/{name}.json")
        raise HTTPException(status_code=404, detail="Tool description file not found")
    except Exception as e:
        logger.error(f"Error reading tool description file: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/tool_call")
async def handle_tool_call(tool_call: ToolCall):
    # Print out the tool call parameters
    logger.info(f"Tool call call: {tool_call}")
    name = tool_call.function['name']

    # Split name by first two '-' 
    parts = name.split('-', 2)
    tool_type = parts[0]
    tool_owner = parts[1]
    tool_name = parts[2] if len(parts) > 2 else ''
    
    logger.info(f"Tool type: {tool_type}")
    logger.info(f"Tool owner: {tool_owner}")
    logger.info(f"Tool name: {tool_name}")
    # For now just return a mock weather response
    # Read the tool implementation file as string
    try:
        with open(f"{tools_path}/{tool_owner}/{tool_name}.py", "r") as f:
            tool_code = f.read()
    except Exception as e:
        logger.error(f"Error reading tool file: {str(e)}")
        return json.dumps({"error": f"Failed to read tool file: {str(e)}"})
     
    # Parse the function arguments from JSON string
    args = json.loads(tool_call.function["arguments"])
    
    # Generate function call with parsed arguments
    args_str = parse_tool_args(args)
    call_code = f"\nresult = {tool_name}({args_str})\nprint(result)"
    
    # Append the call code to the tool implementation
    tool_code += call_code

    logger.info(f"Tool code to execute:\n{tool_code}")

    try:
        with SandboxSession(lang='python') as session:
            result = session.run(tool_code)
            logger.info(f"Sandbox execution result: {result}")
            return result
    except Exception as e:
        logger.error(f"Error executing sandbox: {str(e)}")
        return '{"error": "Failed to execute sandbox"}'

def main():
    parser = argparse.ArgumentParser(description="Run the FastAPI server with specified tools path.")
    parser.add_argument('--tools_path', type=str, required=True, help='Specify the tools root folder')
    args = parser.parse_args()

    global tools_path
    tools_path = args.tools_path

    uvicorn.run(app, host="127.0.0.1", port=3001)

if __name__ == "__main__":
    main()
