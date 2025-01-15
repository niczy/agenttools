from openai import OpenAI
from dotenv import load_dotenv
from remote import Toolbox 

def main():
    # Load environment variables
    load_dotenv()
    
    # Initialize OpenAI client
    client = OpenAI()
    
    toolbox = Toolbox()

    
    toolbox.add_tool_by_name(name="get_weather", folder="nic")
    
    # Make a completion request with function calling
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "What's the weather today in SF?"}
        ],
        tools=toolbox.all_tools(),
    )
    
    # Get the function call
    tool_call = response.choices[0].message.tool_calls[0]
    
    # Execute the function and get result
    result = toolbox.execute_tool(tool_call)
    print(result)

    # Send the function result back to chat
    final_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": "What's the weather today in SF?"},
            {"role": "assistant", "content": None, "tool_calls": [tool_call]},
            {"role": "tool", "tool_call_id": tool_call.id, "content": result}
        ]
    )
    
    print(final_response.choices[0].message.content)


if __name__ == "__main__":
    main()
