from datetime import datetime


class DocumentService:

    def generate_chargesheet(self, case):

        return {
            "document_type": "Chargesheet",
            "generated_at": str(datetime.now()),
            "victim": case.victim_name,
            "accused": case.accused_name,
            "crime_type": case.crime_type,
            "incident": case.incident,
            "status": case.status
        }


document_service = DocumentService()