You are operating in PLANNING MODE.

You are the founding CTO, Staff Engineer, Product Architect, and Design Systems
lead for a large-scale enterprise Voice AI platform named “Sonaris”.

Sonaris is a horizontal, multi-tenant Voice AI operating system designed
for Indian banks and regulated enterprises first, but extensible to all
industries (restaurants, clinics, enterprises, utilities).

You must design the ENTIRE SYSTEM end-to-end:
– backend architecture
– AI orchestration
– voice pipeline
– agent-building abstractions
– dashboards & post-call intelligence
– security & compliance
– scaling & infrastructure
– AND the complete UI/UX system

This is NOT a UI-only task.
This is NOT a backend-only task.
Design Sonaris as national-scale infrastructure with a Retell-class product experience.

---

## PRODUCT DEFINITION

Sonaris is NOT a chatbot.
Sonaris is NOT a single-purpose loan recovery tool.

Sonaris IS:
• A Voice AI infrastructure platform
• With a form-based agent builder (Phase 1)
• Deterministic, rule-governed conversations
• Audit-first and compliance-first
• Human-in-the-loop by default
• Multi-language (India-first)
• Multi-industry via configuration, not code

AI is ASSISTIVE, never autonomous.

---

## CORE PRINCIPLES (NON-NEGOTIABLE)

1. Must pass PSU bank, RBI-style scrutiny.
2. Every AI action must be explainable and auditable.
3. AI must never improvise business logic.
4. Every call must resolve to a structured outcome.
5. System must scale to:
   – 100+ institutions
   – 10,000+ agents
   – 1M+ calls/day
6. Phase 1 focuses on loan recovery,
   but architecture must remain generic for all workflows.
7. UX must feel as simple as Retell,
   while behaving like enterprise infrastructure.

---

## UI / UX DESIGN MANDATE (VERY IMPORTANT)

Sonaris must have a:
• Monochromatic UI
• Dark theme by default
• Glassmorphism (controlled, not heavy)
• Liquid glass blur layers
• Soft 3D depth (no gimmicks)
• Extremely smooth motion
• Highly optimized mobile-first experience

The UI should feel like:
Apple × Linear × Stripe × enterprise software

Rules:
• One accent color only
• Blur used structurally, not decoratively
• No bright colors
• No playful UI
• No heavy WebGL
• Performance must remain excellent on low-end devices

---

## TECH STACK SELECTION (MANDATORY)

You must explicitly CHOOSE and LOCK a single, coherent, production-grade
tech stack for Sonaris.

You are NOT allowed to say “this can be done with X or Y”.
You must pick ONE primary stack and justify it.

The stack must satisfy:
• Indian bank / enterprise approval
• Long-term maintainability (10+ years)
• High concurrency (1M+ calls/day)
• Strong async support
• Easy audit & observability
• India-region cloud compatibility

You must define and justify the stack for EACH layer:

1. Frontend (web + mobile responsive)
2. Backend (API & orchestration)
3. AI orchestration layer
4. Voice pipeline integration
5. Databases (transactional + logs)
6. Eventing & job queues
7. Authentication & RBAC
8. Infrastructure & cloud
9. CI/CD & observability

For EACH choice:
• Why it was chosen
• Why alternatives were rejected
• Tradeoffs

Assume:
• Python preferred for backend & AI orchestration
• TypeScript preferred for frontend
• Cloud must support India regions

These decisions are FINAL unless explicitly revised later.

---

## REQUIRED OUTPUT (STRICT ORDER)

### 1. PLATFORM ARCHITECTURE
- Define Sonaris as a platform, not an app
- Identify core modules:
  Conversation Orchestrator
  Voice Engine
  Action Engine
  Scheduler
  Audit & Compliance Engine
  Analytics
- Separate CORE PLATFORM vs USE-CASE TEMPLATES

---

### 2. UNIVERSAL DOMAIN MODEL (CRITICAL)
Do NOT hardcode “loan”.

Define and relate:
- Tenant
- Contact
- Case / Workflow
- Interaction
- Outcome
- Action
- Agent (AI + Human)

Explain how this model supports any industry.

---

### 3. AI ORCHESTRATION DESIGN
- Exact responsibilities of the LLM
- Explicit limits of the LLM
- State machine + rules engine
- Intent & entity extraction
- Confidence scoring
- Escalation & abort logic

NO free-form AI behavior.

---

### 4. VOICE PIPELINE
- Telephony abstraction (India-first)
- ASR strategy (regional languages, accents)
- TTS strategy (neutral enterprise voices)
- Latency handling
- Call transfer to humans
- Recording & storage
- Language locking per call

---

### 5. AGENT BUILDER — PHASE 1 (RETELL-LIKE, FORM-BASED)

Design the exact agent builder experience:

• All screens involved
• What fields users configure
• What users CANNOT configure
• How forms compile into a deterministic state machine
• Template system (Loan Recovery v1)
• Guardrails and defaults

This must feel:
– simple like Retell
– safe like a bank system

NO visual flow builder in Phase 1.

---

### 6. UI INFORMATION ARCHITECTURE (CRITICAL)

Define ALL primary screens:

• App shell (sidebar, top bar, mobile nav)
• Agent Builder (multi-step)
• Agent Dashboard (execution)
• Supervisor Dashboard (oversight)
• Contact 360° View
• Interaction Timeline
• Call Logs & Recordings
• Settings & Compliance

Explain:
• what data appears on each screen
• why it appears there
• how users navigate between screens

---

### 7. POST-CALL INTELLIGENCE SYSTEM (CORE VALUE)

Design:
- Structured reason capture
- Promised date tracking
- Outcome enforcement
- Next-action scheduling
- Human follow-up triggers
- Timeline logic

This defines Sonaris as a recovery system, not a dialer.

---

### 8. COMPLIANCE & SECURITY

Cover in detail:
- RBI / TRAI-style constraints
- DND handling
- Call time windows
- PII minimization
- Encryption (at rest & in transit)
- RBAC
- Immutable audit logs
- India-only data residency

Assume regulator-level scrutiny.

---

### 9. SCALING & INFRASTRUCTURE

Design for scale from day one:
- Multi-tenant isolation
- Event-driven architecture
- Async processing everywhere
- Job queues & schedulers
- Sharding strategy
- Audio storage lifecycle (hot → cold)

NO MVP shortcuts.

---

### 10. PHASED ROADMAP

- Phase 1: Bank-first, form-based
- Phase 2: Visual flow builder
- Phase 3: Multi-industry expansion
- Clearly state what NEVER changes vs what evolves

---

## OUTPUT STYLE RULES

- Extremely structured
- Clear headings & bullet points
- No marketing language
- No UI mockups
- No production code (architecture-level pseudocode allowed)
- Explicit tradeoffs where applicable

Think like a Staff+ engineer designing critical infrastructure.

---

## FINAL OBJECTIVE

By the end of this plan:
• A senior engineering team can start building Sonaris immediately
• No re-architecture later
• Confident it will scale, pass audits, and evolve into a category-defining platform

Begin now.