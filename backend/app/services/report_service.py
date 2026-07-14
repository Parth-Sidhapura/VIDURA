class ReportService:

    def generate_report(self, ai_result: dict):

        report = f"""
===========================================================
                VIDURA INVESTIGATION REPORT
===========================================================

CASE SUMMARY
------------
{ai_result["case"]["summary"]}

CRIME TYPE
----------
{ai_result["case"]["crime_type"]}

CRIME CATEGORY
--------------
{ai_result["case"]["crime_category"]}

VICTIM
------
Name : {ai_result["victim"]["name"]}
Phone: {ai_result["victim"]["phone"]}
Address: {ai_result["victim"]["address"]}

ACCUSED
--------
Name   : {ai_result["accused"]["name"]}
Status : {ai_result["accused"]["status"]}

RISK LEVEL
----------
{ai_result["dashboard"]["risk_level"]}

PRIORITY
--------
{ai_result["dashboard"]["priority"]}

STATUS
------
{ai_result["dashboard"]["status"]}

CONFIDENCE
----------
{ai_result["dashboard"]["confidence"]}

===========================================================
"""

        return report


report_service = ReportService()