JSON_SCHEMA = """
Return ONLY this JSON.

{

"dashboard":{

"risk_level":"",

"priority":"",

"severity":"",

"status":"",

"confidence":"",

"crime_category":""

},

"case":{

"summary":"",

"crime_type":"",

"estimated_loss":"Unknown"

},

"victim":{

"name":"",

"phone":"",

"address":"Unknown"

},

"accused":{

"name":"Unknown",

"status":"Unknown"

},

"legal_analysis":{

"recommended_bns":[],

"recommended_bnss":[],

"recommended_bsa":[],

"legal_confidence":"",

"reasoning":"",

"verification_required":true

},

"timeline":[],

"evidence_required":[],

"missing_information":[],

"next_best_actions":[],

"compliance_alerts":[],

"investigation_report":{

"incident_summary":"Write a detailed paragraph of at least 120 words.",

"preliminary_findings":"Write a professional paragraph.",

"risk_assessment":"Explain why this case has this risk level.",

"recommended_actions":"Provide at least five detailed investigation steps.",

"officer_recommendation":"Provide a professional concluding recommendation."

},

"chargesheet_draft":{

"case_background":"",

"facts":"",

"applicable_laws":"",

"evidence_summary":"",

"recommendation":""

},

"document_status":{

"fir":"Pending",

"chargesheet":"Draft",

"case_diary":"Pending",

"notice":"Pending"

}

}
"""