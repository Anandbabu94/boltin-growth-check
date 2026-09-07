# Boltin Growth Check

The Boltin marketing site: a landing page plus a free 2-minute Marketing and CRM assessment used as a lead-gen quiz. Two self-contained HTML files (vanilla JS, no build step), no framework, no bundler.

Live site: https://business-growth-leak-check.vercel.app
Growth Check quiz: https://business-growth-leak-check.vercel.app/growth-check

## How it's deployed

This repo is connected to Vercel. Pushing to main redeploys automatically, no manual upload needed. vercel.json enables clean URLs so /growth-check serves growth-check.html without the .html extension or any redirect.

## Files

index.html is the landing page (marketing copy, services, proof, FAQ). This is what Vercel serves at the root. Its Take the Growth Check button links to /growth-check.

growth-check.html is the quiz app (questions, scoring, ROI model, lead-capture form with live field validation). Served at /growth-check.

google-apps-script/Code.gs is the backend lead-intake endpoint. Bound to a Google Sheet (Boltin Growth Check Leads), deployed separately as an Apps Script Web App. It appends each submitted lead as a row and emails a notification. Its deployment URL is wired into growth-check.html as CONFIG.LEAD_WEBHOOK_URL.

vercel.json is the deployment config (clean URLs, no trailing slash).

## Making changes

Edit index.html (landing page) or growth-check.html (quiz) directly, or edit a working copy and replace it. Commit and push to main. Vercel picks up the push and redeploys business-growth-leak-check.vercel.app automatically.

If the lead-intake logic in google-apps-script/Code.gs changes, that update has to be pasted into the Apps Script project directly at script.google.com and redeployed there. Pushing to this repo does not touch Apps Script.
Page_Down
