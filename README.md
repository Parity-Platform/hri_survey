# HRIT: Human Robot Interaction Transparency

Open toolkit for transparent stakeholder engagement on collaborative robotics in small manufacturing SMEs.

HRIT applies the Open and Responsible Research and Innovation (ORRI) approach to document how manual workers, operators, supervisors, SME clients and members of the public perceive Human-Robot Interaction (HRI) before adoption decisions are made. The project does not promote or reject robotics. It provides open, reusable evidence and tools so that the people affected can inform the decision.

| | |
|---|---|
| Consortium | Parity Platform P.C. (coordinator, Greece); University of Patras (Greece) |
| Programme | REINFORCING 5th Open Call, 3rd ORRI Incubator, topic "Responsible Digitalisation" |
| Duration | November 2025 to October 2026 |
| Evidence base | 5 manufacturing SMEs, 30 in-depth interviews, 50+ survey responses, 3 participatory workshops with 45+ participants |
| Licence | Apache 2.0 (see [LICENSE](LICENSE) and [NOTICE](NOTICE)) |

## Repository contents

| Path | Content |
|---|---|
| [toolkit/](toolkit/) | The HRIT Toolkit: method, synthesis report, engagement templates, communication guidelines, supervisor briefing pack, data schema and anonymisation protocol |
| `Manual Worker HRI Survey/` | Web questionnaire for production line workers who work, or may soon work, alongside collaborative robots |
| `Operator HRI Interaction Survey/` | Web questionnaire for technical operators and engineers who interact directly with the robot |
| `Supervisor HRI Interaction Survey/` | Web questionnaire for line supervisors and managers of teams working with robots |
| `Future Impact HRI Supervisor/` | Web questionnaire on medium and long term effects of HRI on workforce, training and competitiveness |
| `google_sheets_script` | Google Apps Script that writes each submission into the analysis spreadsheet |
| `LinksforLookerandSheets.xlsx` | Index that links each questionnaire to its spreadsheet and dashboard |

## Live results

Anonymised, aggregated results are public and require no login:

- Manual Worker survey dashboard: https://lookerstudio.google.com/reporting/f489fdd2-0b74-4a31-a414-2e7914e1dd18
- Supervisor survey dashboard: https://lookerstudio.google.com/reporting/e43095b6-9351-407a-8b6e-81f03903d8bf

## How to use the toolkit

Non-technical users start with [toolkit/README.md](toolkit/README.md). It describes the five-step HRIT method (Map, Survey, Visualise, Co-create, Publish) and points to the template for each step. Questionnaires can be reused as web surveys or printed on paper.

## Running a questionnaire as a web survey

Each questionnaire folder is a React and Vite application. Node.js 18 or later is required.

```bash
cd "Manual Worker HRI Survey"
npm install
npm run dev      # local test server on port 3000
npm run build    # static build in dist/ for any web host
```

To collect responses in an own spreadsheet:

1. Create a Google Sheet. In row 1, enter the field keys of the chosen questionnaire as column headers (see [toolkit/hrit_data_schema.json](toolkit/hrit_data_schema.json)), plus `timestamp` and `app_source`.
2. Open Extensions > Apps Script, paste the content of `google_sheets_script` and deploy it as a Web app.
3. Replace the endpoint URL in the questionnaire's `App.tsx` with the URL of the new deployment.
4. Connect Looker Studio, or any BI tool, to the sheet to publish dashboards.

The script includes a honeypot field against bots and a one-minute rate limit per payload. Remove the optional `email` column before sharing any export, as described in [toolkit/08_data_and_anonymisation.md](toolkit/08_data_and_anonymisation.md).

## How to cite

Parity Platform P.C. and University of Patras (2026). *HRIT Toolkit: Human Robot Interaction Transparency*. REINFORCING ORRI Incubator. https://github.com/Parity-Platform/hri_survey

## Funding

Funded by the European Union through the REINFORCING project (Horizon Europe, Grant Agreement No. 101094435), 3rd ORRI Incubator, sub-grant REINFORCING-I3_4. Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union or the REA. Neither the European Union nor the granting authority can be held responsible for them.
