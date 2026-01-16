IMPORTANT: SCOPE REALIGNMENT & OVERRIDE

You must KEEP all valid system design, AI orchestration, compliance,
scalability, and UI principles from the previous Sonaris plan.

However, you must IMMEDIATELY OVERRIDE and REALIGN the system
based on the following corrections.

---

## 1. PRODUCT SCOPE OVERRIDE (CRITICAL)

Sonaris is NO LONGER a horizontal or multi-industry platform.

REMOVE all references to:
• restaurants
• bookings
• appointments
• non-financial use cases
• generic calling tools

Sonaris is NOW strictly:

• A B2B loan recovery and financial outreach automation platform
• Built exclusively for banks, NBFCs, and regulated lenders
• Designed for enterprise integrations, not manual usage

All future reasoning must assume:
• Banking-only
• Financial data only
• Regulated environment

---

## 2. DATA OWNERSHIP & FLOW OVERRIDE

OVERRIDE any assumption of:
• manual contact creation
• user-entered borrower data
• UI-based uploads as primary flow

NEW ASSUMPTION (LOCK THIS):

• Banks ALREADY have borrower & loan data in their databases
• Sonaris NEVER becomes the system of record
• Sonaris reads data from bank systems and reacts automatically

Sonaris must ingest data via:
• Secure REST APIs (primary)
• SFTP batch feeds (secondary)
• Read-only DB views (optional)

CSV upload exists ONLY for pilots or NBFC demos — NOT for banks.

---

## 3. AUTOMATION MODEL OVERRIDE

REMOVE any model where:
• users click “start calls”
• users trigger campaigns manually
• agents manually schedule follow-ups

NEW MODEL (MANDATORY):

• Data flows in continuously from bank systems
• Sonaris automatically:
  – creates recovery cases
  – applies recovery rules
  – schedules AI calls
  – sends messages
  – tracks promises
  – escalates to humans when needed

Humans ONLY:
• configure policies
• handle escalations
• monitor dashboards

---

## 4. CAMPAIGNS = RECOVERY STRATEGIES (REDEFINE)

REDEFINE campaigns as:
• system-level recovery strategies
• tied to DPD buckets, amounts, and risk
• usually hidden from day-to-day users

Examples:
• DPD 1–30 Soft Recovery
• DPD 31–60 Medium Recovery
• High-Value Escalation

Campaigns are NOT marketing blasts.
They are policy-controlled execution loops.

---

## 5. DEMO ENVIRONMENT REQUIREMENT (NEW)

ADD a mandatory DEMO BANK ENVIRONMENT.

This demo must:
• behave exactly like a real bank integration
• NOT use hardcoded frontend data
• NOT rely on manual uploads

Design:
• A realistic bank-style relational database
• ~100 fake but believable borrower records
• Realistic loan, DPD, amount, language distributions
• Masked IDs and Indian phone formats

Expose this demo via:
• Read-only REST APIs (primary)
• Optional DB views (secondary)

Sonaris must:
• fetch data automatically
• run recovery automation
• update outcomes when demo data changes

This demo is used for:
• sales demos
• internal testing
• pilot walkthroughs

---

## 6. UI BEHAVIOR OVERRIDE (IMPORTANT)

In demo and production:

• UI must show data as “synced from bank”
• NO upload buttons visible in bank demos
• NO fake “add borrower” flows
• Everything must look live and automated

Dashboards must reflect:
• real-time sync
• automated actions
• recovery timelines

---

## 7. OUTPUT UPDATE REQUIRED

You must now:
• Re-evaluate architecture with bank-only assumptions
• Re-derive data models around bank integrations
• Adjust automation logic accordingly
• Add demo bank DB + API design
• Ensure all flows reflect continuous automation

Do NOT restate the entire system.
Focus on:
• what changes
• what is removed
• what is added
• how existing components adapt

This override is FINAL.

Proceed to update the design accordingly.