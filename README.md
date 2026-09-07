# Boltin Growth Check

A free 2-minute Marketing & CRM assessment used as a lead-gen quiz for Boltin. Single self-contained HTML file (vanilla JS, no build step) - score-based quiz, ROI snapshot, and a lead-capture form with live field validation.

**Live:** https://business-growth-leak-check.vercel.app

## How it's deployed

This repo is connected to Vercel. Pushing to main redeploys automatically - no manual upload needed.

## Files

- index.html - the entire app (quiz, scoring, ROI model, lead form). This is the file Vercel serves at the root.
- google-apps-script/Code.gs - the backend lead-intake endpoint. Bound to a Google Sheet (Boltin Growth Check Leads), deployed separately as an Apps Script Web App. It appends each submitted lead as a row and emails a notification. Its deployment URL is wired into index.html as CONFIG.LEAD_WEBHOOK_URL.

## Making changes

1. Edit index.html directly (or edit a working copy and replace it).
2. Commit and push to main.
3. Vercel picks up the push and redeploys business-growth-leak-check.vercel.app automatically.

If the lead-intake logic in google-apps-script/Code.gs changes, that update has to be pasted into the Apps Script project directly (script.google.com) and redeployed there - pushing to this repo does not touch Apps Script.

_Connected to Vercel via GitHub on 2026-09-07._

_Connected to Vercel via GitHub._
