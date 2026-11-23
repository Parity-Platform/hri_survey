# HRIT Toolkit

The HRIT Toolkit is an ORRI tool for organisations that plan to introduce collaborative robots or other automation and want the people affected to inform the decision. It packages the process tested in the HRIT project with five manufacturing SMEs in Greece into reusable steps, templates and data structures.

The toolkit is neutral on adoption. Its output is a documented, public record of how workers, operators, supervisors, clients and the local community perceive the change, and how that input was used.

## Intended users

- SME owners, production and HR managers preparing an automation decision
- Line supervisors and team leaders who will manage mixed human and robot teams
- Worker associations and employee representatives
- Industry associations and vocational training centres
- Regional and national policymakers working on the future of work
- Researchers studying HRI acceptance, who need comparable instruments and data

## Components

| File | Purpose |
|---|---|
| [01_synthesis_report.md](01_synthesis_report.md) | Findings from 30 interviews, 50+ surveys and 3 workshops; co-created transparency and engagement principles |
| [02_stakeholder_map_and_recruitment.md](02_stakeholder_map_and_recruitment.md) | Stakeholder map, recruitment plan, invitation texts |
| [03_information_sheet_and_consent_form.md](03_information_sheet_and_consent_form.md) | GDPR-aligned participant information sheet and consent form |
| [04_interview_guide.md](04_interview_guide.md) | Semi-structured interview guide per stakeholder group |
| [05_workshop_facilitation_guide.md](05_workshop_facilitation_guide.md) | Agenda, roles and inclusive facilitation methods for participatory workshops |
| [06_communication_guidelines.md](06_communication_guidelines.md) | Rules and message templates for communicating HRI changes, including job displacement and retraining |
| [07_supervisor_briefing_pack.md](07_supervisor_briefing_pack.md) | Briefing pack that prepares supervisors before workers are engaged |
| [08_data_and_anonymisation.md](08_data_and_anonymisation.md) | Data dictionary overview, anonymisation protocol, publication and reuse rules |
| [hrit_data_schema.json](hrit_data_schema.json) | Machine-readable schema of all four questionnaires (79 fields) |
| [participant_register_template.csv](participant_register_template.csv) | Participant register with inclusivity tracking columns |

The four questionnaires are in the repository root folders. Live dashboards are linked in the [root README](../README.md).

## The five-step method

| Step | What happens | Files | Reference duration in HRIT |
|---|---|---|---|
| 1. Map | Identify stakeholder groups, set representation targets, recruit participants, collect consent | 02, 03, register CSV | 2 months |
| 2. Survey | Run the role-based questionnaires and in-depth interviews | Questionnaire folders, 04 | 3 months, overlapping step 1 |
| 3. Visualise | Connect responses to the spreadsheet script and publish anonymised dashboards | `google_sheets_script`, 08, schema | Continuous from first response |
| 4. Co-create | Discuss results in workshops, one on the production floor and one at a neutral venue, and agree transparency principles | 05, 01 | 3 months |
| 5. Publish | Publish the synthesis, communicate the decision and explain how input was used | 01, 06, 07, 08 | 2 months |

A smaller SME can compress the cycle to about three months by running one questionnaire wave and one workshop.

## Minimum resources

- One coordinator with authority to share company information and report back to staff
- One facilitator not in the participants' line management, for example from a university, training centre or worker association
- Access to a spreadsheet and a free dashboard tool, or paper forms and a simple tally sheet
- Two to four hours of paid working time per participant for survey, interview and workshop

## Recommended order of preparation

1. Brief supervisors with [07_supervisor_briefing_pack.md](07_supervisor_briefing_pack.md) before any announcement to staff.
2. Announce the consultation with the first template in [06_communication_guidelines.md](06_communication_guidelines.md).
3. Recruit and collect consent with files 02 and 03.
4. Run the surveys and interviews, then the workshops.
5. Publish results and report back to participants within one month of the last workshop.

## Licence and attribution

Apache 2.0. Reuse, adaptation and translation are allowed, including commercial use, provided the licence and the [NOTICE](../NOTICE) are kept. Adapted questionnaires and translations can be contributed back through a pull request, so results become comparable across sectors and regions.
