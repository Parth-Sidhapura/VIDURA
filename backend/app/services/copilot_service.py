class CopilotService:

    def suggest_next_action(self, crime_type: str):

        crime = crime_type.lower()

        if "cyber" in crime:
            return {
                "next_action": [
                    "Freeze suspect bank account",
                    "Collect bank transaction logs",
                    "Request IP logs",
                    "Preserve digital evidence",
                    "Issue notice to payment gateway"
                ]
            }

        elif "murder" in crime:
            return {
                "next_action": [
                    "Secure crime scene",
                    "Record witness statements",
                    "Collect forensic evidence",
                    "Conduct postmortem",
                    "Prepare seizure memo"
                ]
            }

        elif "theft" in crime:
            return {
                "next_action": [
                    "Collect CCTV footage",
                    "Record complainant statement",
                    "Inspect crime scene",
                    "Prepare evidence list"
                ]
            }

        else:
            return {
                "next_action": [
                    "Officer review required."
                ]
            }


copilot_service = CopilotService()