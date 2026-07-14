from app.ai.client import client

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Reply with only one word: Connected"
        }
    ]
)

print(response.choices[0].message.content)