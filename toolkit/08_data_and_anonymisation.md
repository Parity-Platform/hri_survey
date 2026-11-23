# Data, anonymisation and publication

This document describes the HRIT data model, the anonymisation protocol applied before analysis and publication, and the rules for reuse.

## 1. Data sources

| Source | Format | Storage during the study | Published form |
|---|---|---|---|
| Four web questionnaires | JSON submitted to Google Apps Script, one row per response in Google Sheets | Access-restricted spreadsheets, one per questionnaire | Aggregated Looker Studio dashboards; anonymised exports |
| Interviews | Audio (with consent) and transcripts | Encrypted storage at the coordinator; audio deleted after transcription | Anonymised quotes and themes in the synthesis report |
| Workshops | Notes, flip charts, dot votes, attendance and speaking-time sheets | Coordinator | Workshop reports merged into the synthesis report |

## 2. Data model

The complete field list is in [hrit_data_schema.json](hrit_data_schema.json). It covers 79 fields across the four questionnaires and records for each field: key, question text, type, answer options or Likert labels, whether it is required, display conditions and whether it is published.

| Questionnaire | `app_source` | Sections |
|---|---|---|
| Manual Worker | `hri_manual_worker_survey` | General information; Safety and perceptions; Workload and stress; Training and confidence |
| Operator | `hri_operator_survey` | General information; Usability and interface; Cognitive load; Failures and recovery; Psychological impact and trust |
| Supervisor | `hri_manager_survey` | General information; Reasons for adoption; Impact after integration; Final evaluation |
| Future Impact | `hri_future_impact_survey` | General information; Drivers for automation; Readiness and concerns |

Likert items are stored as integers 1 to 5, where 1 is the first label listed in the schema. Multi-select answers are stored as comma separated text.

## 3. Anonymisation protocol

Applied before any analysis export or publication:

1. **Remove direct identifiers.** Delete the optional `email` field and any names, phone numbers or company names entered in free text.
2. **Coarsen time.** Replace `timestamp` with year and month.
3. **Screen free text.** Read every free-text answer; remove references to named individuals, specific machines or events that could identify a person.
4. **Protect small groups.** Do not report any combination of department, country, experience band or size of operation with fewer than five responses; merge categories or suppress the cell.
5. **Separate consent records.** Keep signed consent forms and participant registers apart from response data, with access limited to the coordinator.
6. **Document.** Record each anonymisation step and the date in a processing log.

## 4. Publication

- Aggregated results are published in public dashboards that require no login.
- Anonymised response tables can be exported from the spreadsheets as CSV, with the published fields only, and added to this repository or an open repository with a persistent identifier.
- Interview and workshop material is published only as anonymised themes and quotes, with participant consent.

## 5. Reuse

- The schema, questionnaires and scripts are reusable under Apache 2.0.
- Organisations that reuse the questionnaires are encouraged to keep field keys unchanged, so that results can be compared and merged across sites, sectors and countries.
- New fields should be added with new keys rather than by changing the meaning of existing ones.

## 6. Retention

| Data | Retention |
|---|---|
| Audio recordings | Deleted after transcription check |
| Raw survey responses with email | Deleted at project end; anonymised copy kept |
| Consent forms | Kept for the period required by the funding agreement, then deleted |
| Anonymised data and reports | Kept and published without time limit |
