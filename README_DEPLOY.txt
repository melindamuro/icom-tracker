ICoM Publication Tracker - Internal full static export

Generated: 2026-07-20

Audience: PNNL/admin/PI use on a controlled internal site

This package contains full tracker data, including manuscript/project-team records. Host it only where access is controlled.

FILES TO DEPLOY

Upload the contents of this folder, preserving the folder structure:

- index.html
- styles.css
- app.js
- workbook-records.js
- inbox-records.js
- drupal-records.js
- assets/

OPENING THE TRACKER

- Public view: index.html?view=public
- PI view: index.html?view=pi
- Admin view: index.html?view=admin

For the public-safe package, all URLs will remain in public mode even if someone changes the query string.

PI PROGRAM-AREA PDF REPORTS

1. Open the PI or Admin view.
2. Go to Reports.
3. Choose Report program area, such as RGMA, MSD, ESMD, or CC.
4. Choose any other filters, such as fiscal year or role.
5. Click PDF list.

The PDF list contains only records matching that report program area and includes clickable DOI/publisher links where available.

IMPORTANT NOTE ABOUT STATIC HOSTING

A static export has no server-side authentication. It can hide controls in the interface, but it cannot securely protect private data if that data is included in JavaScript files. Use the public-safe package for external sharing and the internal full package only behind an access-controlled location.
