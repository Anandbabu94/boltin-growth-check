/**
 * Boltin Growth Check -- lead intake endpoint.
  *
   * Bound to a Google Sheet. Deployed as a Web App (Execute as: Me,
    * Access: Anyone), this receives each Growth Check submission,
     * appends it as a row to the "Leads" sheet, and emails a notification.
      *
       * The quiz posts to this URL with mode:'no-cors' and Content-Type
        * text/plain (to avoid a CORS preflight), so the JSON body always
         * arrives in e.postData.contents regardless of the declared type.
          */

const NOTIFY_EMAIL = 'anandbabu94@gmail.com';
const SHEET_NAME = 'Leads';

const HEADERS = [
    'Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Website',
    'Growth Health Score', 'Marketing Visibility %', 'Pipeline & CRM Health %',
    'Monthly Budget', 'Currency', 'Industry', 'Leads Reported',
    'Consent', 'Raw Answers (JSON)'
  ];

function getLeadsSheet_() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
          sheet = ss.insertSheet(SHEET_NAME);
        }
    if (sheet.getLastRow() === 0) {
          sheet.appendRow(HEADERS);
          sheet.setFrozenRows(1);
          sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
        }
    return sheet;
  }

function doPost(e) {
    try {
          const data = JSON.parse(e.postData.contents);
          const scores = data.scores || {};
          const adv = data.advanced || {};

          const sheet = getLeadsSheet_();
          sheet.appendRow([
                  new Date(),
                  data.name || '',
                  data.email || '',
                  data.phone || '',
                  data.company || '',
                  data.website || '',
                  scores.overall != null ? scores.overall : '',
                  scores.mktPct != null ? scores.mktPct : '',
                  scores.crmPct != null ? scores.crmPct : '',
                  adv.budget != null ? adv.budget : '',
                  adv.currency || '',
                  adv.industry || '',
                  adv.leads != null ? adv.leads : '',
                  data.consent ? 'Yes' : 'No',
                  JSON.stringify(data.answers || [])
                ]);

          sendNotification_(data, scores, adv);

          return ContentService.createTextOutput(JSON.stringify({ ok: true }))
            .setMimeType(ContentService.MimeType.JSON);
        } catch (err) {
          return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
            .setMimeType(ContentService.MimeType.JSON);
        }
  }

function doGet(e) {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, msg: 'Boltin Growth Check lead endpoint is live.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

function sendNotification_(data, scores, adv) {
    const subject = 'New Growth Check lead: ' + (data.name || 'Unknown');
    const body = [
          'New lead submitted via the Growth Check quiz.',
          '',
          'Name: ' + (data.name || ''),
          'Email: ' + (data.email || ''),
          'Phone: ' + (data.phone || 'not provided'),
          'Company: ' + (data.company || 'not provided'),
          'Website: ' + (data.website || 'not provided'),
          '',
          'Growth Health Score: ' + (scores.overall != null ? scores.overall : 'n/a') + '/100',
          'Marketing Visibility: ' + (scores.mktPct != null ? scores.mktPct : 'n/a') + '%',
          'Pipeline & CRM Health: ' + (scores.crmPct != null ? scores.crmPct : 'n/a') + '%',
          '',
          'Monthly budget: ' + (adv.budget != null ? adv.budget + ' ' + (adv.currency || '') : 'not provided'),
          'Industry: ' + (adv.industry || 'not provided'),
          'Leads reported: ' + (adv.leads != null ? adv.leads : 'not provided'),
          '',
          'Consent to contact: ' + (data.consent ? 'Yes' : 'No'),
          'Submitted at: ' + (data.submittedAt || new Date().toISOString())
        ].join('\n');

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
  }
