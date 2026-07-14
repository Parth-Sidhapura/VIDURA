class LegalService:

    def analyze_case(self, incident: str):

        incident = incident.lower()

        recommendations = []

        if "fraud" in incident or "bank" in incident:
            recommendations.append({
                "section": "BNS 318",
                "reason": "Cheating and dishonestly inducing delivery of property"
            })

        if "murder" in incident:
            recommendations.append({
                "section": "BNS 103",
                "reason": "Murder"
            })

        if "theft" in incident:
            recommendations.append({
                "section": "BNS 303",
                "reason": "Theft"
            })

        if len(recommendations) == 0:
            recommendations.append({
                "section": "Review Required",
                "reason": "No matching legal provision found."
            })

        return recommendations


legal_service = LegalService()