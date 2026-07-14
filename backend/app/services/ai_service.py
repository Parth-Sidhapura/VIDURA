import json

from app.ai.client import client
from app.ai.system_prompt import SYSTEM_PROMPT
from app.ai.schema import JSON_SCHEMA


class AIService:

    def analyze_case(self, case_data: dict):

        prompt = f"""
{JSON_SCHEMA}

Case Details:

{json.dumps(case_data, indent=2)}

Instructions:

1. Analyze the complete incident carefully.
2. Fill EVERY field in the JSON schema.
3. Never remove any JSON key.
4. If information is unavailable, write "Unknown".
5. Never fabricate facts.
6. Prefer Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).
7. Never recommend IPC or CrPC unless explicitly required for a historical case.
8. If unsure about any legal section, return:
   "Officer Legal Verification Required"
9. Return ONLY valid JSON.
10. Do not use markdown.
11. Do not wrap JSON inside ```json blocks.
"""

        try:

            response = client.chat.completions.create(

                model="llama-3.3-70b-versatile",

                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                temperature=0.1,

                # response_format={
                #     "type": "json_object"
                # }

            )

            content = response.choices[0].message.content.strip()

            # Remove markdown if model accidentally returns it
            if content.startswith("```"):
                content = content.replace("```json", "")
                content = content.replace("```", "").strip()

            return json.loads(content)

        except Exception as e:
            print("="*60)
            print("AI ERROR")
            print(type(e))
            print(e)
            print("="*60)
            raise          


ai_service = AIService()