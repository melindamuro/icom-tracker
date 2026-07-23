ICoM Annual Report History Update Package
Generated: July 23, 2026

PURPOSE
This package matches the 146 report-ready publications in the 7/23/2026 tracker export against the ICoM annual reports for 2020, 2021, 2022, 2023, and 2024.

RESULTS
- 119 current tracker records appeared in at least one annual report.
- 179 publication/report history entries were identified.
- Matches by report: FY20=2, FY21=18, FY22=45, FY23=56, FY24=58.
- Ten report-year entries did not have a corresponding record in the current report-ready tracker export. These represent eight unique publication/dataset items because one manuscript appears in three reports.

FILES
1. icom_annual_report_crosswalk.xlsx
   - Tracker Crosswalk: one row per current tracker record, with FY20-FY24 status columns.
   - Report Summary: reconciles report totals and current-tracker matches.
   - Not in Current Tracker: report entries that need to be added or intentionally excluded.
   - Codex Merge Rows: one row per annual-report history entry.

2. icom_annual_report_history_long.csv
   - Long-form merge table, one row per publication/report match.

3. icom_annual_report_history_patch.json
   - Structured patch for the tracker's annualReports field.
   - Match records by DOI first, then normalized title where a DOI is unavailable.
   - Each update has this shape:
     {
       "doi": "10.xxxx/...",
       "title": "...",
       "annualReports": [
         {
           "fiscalYear": "FY24",
           "statusAtReport": "Submitted / In review",
           "notes": "ICoM 2024 Annual Report; Appendix A, PDF pp. 39–44."
         }
       ]
     }

4. icom_report_items_not_in_tracker.csv
   - Entries found in annual reports but absent from the current report-ready tracker export.

TRACKER IMPLEMENTATION RULES
- Preserve every historical annual-report entry. A publication can have multiple entries as it progresses from submitted to accepted to published.
- Do not infer status from the current publication status. Use statusAtReport from the supplied patch.
- Use fiscal-year labels FY20 through FY24 because that is the tracker field convention.
- The 2024 report was issued in March 2025 and covers June 2023-December 2024, but its tracker history label should be FY24 / 2024 Annual Report.
- Do not automatically add unmatched report items as report-ready publications. Review them first for duplicates, datasets, superseded titles, or deliberate exclusions.
