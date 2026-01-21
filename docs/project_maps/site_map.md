# Workforce Scheduling Platform — Routes & URL Map (LLM-Optimized)

> **Scope:** mappa completa delle **rotte** (public, auth, onboarding, app) per una piattaforma SaaS di gestione turni.  
> **Obiettivo:** definire in modo univoco **URL**, **parametri dinamici**, **aree per ruolo**, e pagine di sistema.

---

## Convenzioni

- **Public** = accessibile senza login  
- **App** = area privata dopo login  
- `:company` = slug/tenant *(es. `acme`)*  
- `:location`, `:department`, `:employeeId`, `:shiftId`, `:requestId`, `:exchangeId`, `:userId`, `:reportId` … = parametri dinamici  
- Percorsi **role-based** sotto:  
  - Admin: `/app/:company/admin/*`  
  - Manager: `/app/:company/manager/*`  
  - Supervisor: `/app/:company/supervisor/*`  
  - Employee: `/app/:company/employee/*`  

---

## 1) Public (senza login)

- **1.1** `/` – Landing  
- **1.2** `/features` – Funzionalità  
- **1.3** `/pricing` – Prezzi  
- **1.4** `/solutions` – Soluzioni per settore *(ristorazione, retail, ecc.)*  
- **1.5** `/security` – Sicurezza / GDPR / Audit  
- **1.6** `/integrations` – Integrazioni *(calendar, payroll, webhook)*  
- **1.7** `/docs` – Documentazione *(pubblica)*  
- **1.8** `/blog` – Blog  
- **1.9** `/blog/:slug` – Articolo  
- **1.10** `/contact` – Contatti / demo  
- **1.11** `/status` – Stato servizio *(opzionale)*  
- **1.12** `/legal/privacy` – Privacy policy  
- **1.13** `/legal/terms` – Termini  
- **1.14** `/legal/cookies` – Cookie policy  

---

## 2) Auth & Access

- **2.1** `/auth/login`  
- **2.2** `/auth/signup`  
- **2.3** `/auth/forgot-password`  
- **2.4** `/auth/reset-password/:token`  
- **2.5** `/auth/verify-email/:token`  
- **2.6** `/auth/2fa` – Setup/verifica 2FA  
- **2.7** `/auth/invite/:inviteToken` – Accetta invito + set password  
- **2.8** `/auth/sso/:provider` – SSO *(enterprise)*  

---

## 3) Onboarding (post-signup)

> **Goal:** portare l’utente da “account creato” a “azienda pronta” con sedi, reparti, policy e dipendenti.

- **3.1** `/onboarding` – Start *(scelta: crea azienda / unisciti tramite invito)*  
- **3.2** `/onboarding/create-company`  
- **3.3** `/onboarding/company-profile` – nome, logo, timezone, lingua  
- **3.4** `/onboarding/locations` – crea sedi  
- **3.5** `/onboarding/departments` – crea reparti per sede  
- **3.6** `/onboarding/policies` – regole base *(ore, riposi, ferie)*  
- **3.7** `/onboarding/import-employees` – import CSV / inviti  
- **3.8** `/onboarding/finish`  

---

## 4) App (area privata)

### Base consigliata

- Entry: `/app` → redirect a **ultima company** o **selettore company**  
- Multi-tenant: tutto sotto `/app/:company/*`

### 4.0 Root App

- **4.0.1** `/app` – redirect / selettore company  
- **4.0.2** `/app/select-company`  
- **4.0.3** `/app/:company` – redirect al dashboard corretto *(in base al ruolo)*  

---

## 5) Area comune (tutti i ruoli)

- **5.1** `/app/:company/notifications` – centro notifiche  
- **5.2** `/app/:company/search` – ricerca globale *(turni, dipendenti, richieste)*  
- **5.3** `/app/:company/help` – help center  
- **5.4** `/app/:company/profile` – profilo utente  
  - **5.4.1** `/app/:company/profile/account` – email, password, 2FA  
  - **5.4.2** `/app/:company/profile/preferences` – lingua, timezone personale, notifiche  
  - **5.4.3** `/app/:company/profile/sessions` – dispositivi / logout remoto  
  - **5.4.4** `/app/:company/profile/privacy` – export dati / richieste GDPR  

---

## 6) Admin (OWNER / ADMIN)

> Base: `/app/:company/admin/*`

### 6.1 Dashboard
- **6.1.1** `/app/:company/admin` – overview KPI + alert  
- **6.1.2** `/app/:company/admin/activity` – attività recente  

### 6.2 Azienda
- **6.2.1** `/app/:company/admin/company` – profilo azienda  
- **6.2.2** `/app/:company/admin/company/branding` – logo, colori *(white-label)*  
- **6.2.3** `/app/:company/admin/company/localization` – timezone/lingua  

### 6.3 Sedi
- **6.3.1** `/app/:company/admin/locations`  
- **6.3.2** `/app/:company/admin/locations/new`  
- **6.3.3** `/app/:company/admin/locations/:location`  
- **6.3.4** `/app/:company/admin/locations/:location/edit`  
- **6.3.5** `/app/:company/admin/locations/:location/opening-hours`  
- **6.3.6** `/app/:company/admin/locations/:location/closures` – chiusure eccezionali  

### 6.4 Reparti
- **6.4.1** `/app/:company/admin/departments`  
- **6.4.2** `/app/:company/admin/departments/new`  
- **6.4.3** `/app/:company/admin/departments/:department`  
- **6.4.4** `/app/:company/admin/departments/:department/edit`  

### 6.5 Utenti & Permessi
- **6.5.1** `/app/:company/admin/users`  
- **6.5.2** `/app/:company/admin/users/invite`  
- **6.5.3** `/app/:company/admin/users/import` – CSV  
- **6.5.4** `/app/:company/admin/users/:userId` – dettaglio + ruoli + assegnazioni  
- **6.5.5** `/app/:company/admin/roles` – ruoli standard  
- **6.5.6** `/app/:company/admin/permissions` – RBAC avanzato *(opzionale)*  
- **6.5.7** `/app/:company/admin/teams` – gruppi/teams *(opzionale)*  

### 6.6 Policy & Regole
- **6.6.1** `/app/:company/admin/policies`  
- **6.6.2** `/app/:company/admin/policies/contracts` – tipologie contratto  
- **6.6.3** `/app/:company/admin/policies/work-hours` – limiti ore  
- **6.6.4** `/app/:company/admin/policies/rests` – riposi minimi  
- **6.6.5** `/app/:company/admin/policies/breaks` – pause  
- **6.6.6** `/app/:company/admin/policies/absences` – ferie/permessi/malattia  
- **6.6.7** `/app/:company/admin/policies/overtime` – straordinari  
- **6.6.8** `/app/:company/admin/policies/conflicts` – warning vs blocco + override rules  

### 6.7 Integrazioni
- **6.7.1** `/app/:company/admin/integrations`  
- **6.7.2** `/app/:company/admin/integrations/calendar` – ICS/Google/Microsoft  
- **6.7.3** `/app/:company/admin/integrations/payroll` – export templates  
- **6.7.4** `/app/:company/admin/integrations/webhooks`  
- **6.7.5** `/app/:company/admin/integrations/api-keys`  

### 6.8 Audit & Sicurezza
- **6.8.1** `/app/:company/admin/audit` – audit log  
- **6.8.2** `/app/:company/admin/audit/changes` – versioning turni/richieste  
- **6.8.3** `/app/:company/admin/security` – 2FA enforcement, session policy  
- **6.8.4** `/app/:company/admin/data` – export/retention  

### 6.9 Billing (SaaS)
- **6.9.1** `/app/:company/admin/billing`  
- **6.9.2** `/app/:company/admin/billing/plan`  
- **6.9.3** `/app/:company/admin/billing/invoices`  
- **6.9.4** `/app/:company/admin/billing/payment-methods`  
- **6.9.5** `/app/:company/admin/billing/add-ons`  

---

## 7) Manager (operativo)

> Base: `/app/:company/manager/*`

### 7.1 Dashboard
- **7.1.1** `/app/:company/manager`  
- **7.1.2** `/app/:company/manager/today` – oggi/dopodomani, assenze, criticità  

### 7.2 Planner Turni
- **7.2.1** `/app/:company/manager/schedule` – vista principale *(week/month)*  
- **7.2.2** `/app/:company/manager/schedule/week/:date`  
- **7.2.3** `/app/:company/manager/schedule/month/:date`  
- **7.2.4** `/app/:company/manager/shifts/:shiftId` – dettaglio turno *(drawer/pagina)*  
- **7.2.5** `/app/:company/manager/publish` – pubblicazione periodo + notifiche  
- **7.2.6** `/app/:company/manager/templates` – shift templates  
- **7.2.7** `/app/:company/manager/templates/week-patterns` – settimana tipo  
- **7.2.8** `/app/:company/manager/conflicts` – lista conflitti / violazioni  

### 7.3 Copertura / Fabbisogno
- **7.3.1** `/app/:company/manager/coverage`  
- **7.3.2** `/app/:company/manager/coverage/requirements` – skill minime  
- **7.3.3** `/app/:company/manager/coverage/heatmap`  

### 7.4 Dipendenti
- **7.4.1** `/app/:company/manager/employees`  
- **7.4.2** `/app/:company/manager/employees/new` *(se permesso)*  
- **7.4.3** `/app/:company/manager/employees/:employeeId`  
- **7.4.4** `/app/:company/manager/employees/:employeeId/availability`  
- **7.4.5** `/app/:company/manager/employees/:employeeId/skills`  
- **7.4.6** `/app/:company/manager/employees/:employeeId/contract`  
- **7.4.7** `/app/:company/manager/employees/:employeeId/history` – turni/assenze/presenze  

### 7.5 Richieste (Ferie/Permessi/Malattia)
- **7.5.1** `/app/:company/manager/requests`  
- **7.5.2** `/app/:company/manager/requests/pending`  
- **7.5.3** `/app/:company/manager/requests/calendar` – calendario assenze team  
- **7.5.4** `/app/:company/manager/requests/:requestId` – dettaglio + approva/rifiuta  

### 7.6 Scambi Turno
- **7.6.1** `/app/:company/manager/exchanges`  
- **7.6.2** `/app/:company/manager/exchanges/pending`  
- **7.6.3** `/app/:company/manager/exchanges/board` – bacheca turni da coprire  
- **7.6.4** `/app/:company/manager/exchanges/:exchangeId`  

### 7.7 Presenze
- **7.7.1** `/app/:company/manager/attendance`  
- **7.7.2** `/app/:company/manager/attendance/today`  
- **7.7.3** `/app/:company/manager/attendance/period/:from/:to`  
- **7.7.4** `/app/:company/manager/attendance/corrections` – richieste correzione ore  

### 7.8 Report & Export
- **7.8.1** `/app/:company/manager/reports`  
- **7.8.2** `/app/:company/manager/reports/hours`  
- **7.8.3** `/app/:company/manager/reports/overtime`  
- **7.8.4** `/app/:company/manager/reports/absences`  
- **7.8.5** `/app/:company/manager/reports/coverage`  
- **7.8.6** `/app/:company/manager/reports/payroll-export`  

### 7.9 Comunicazioni
- **7.9.1** `/app/:company/manager/announcements`  
- **7.9.2** `/app/:company/manager/announcements/new`  

---

## 8) Supervisor / Capo turno (opzionale)

> Base: `/app/:company/supervisor/*`

- **8.1** `/app/:company/supervisor` – oggi  
- **8.2** `/app/:company/supervisor/today`  
- **8.3** `/app/:company/supervisor/attendance` – presenza/assente/ritardo  
- **8.4** `/app/:company/supervisor/schedule` – vista reparto *(limitata)*  
- **8.5** `/app/:company/supervisor/exchanges` – last minute *(proposte)*  

---

## 9) Dipendente

> Base: `/app/:company/employee/*`

### 9.1 Home
- **9.1.1** `/app/:company/employee` – riepilogo settimana + prossimi turni  

### 9.2 I miei turni
- **9.2.1** `/app/:company/employee/shifts`  
- **9.2.2** `/app/:company/employee/shifts/week/:date`  
- **9.2.3** `/app/:company/employee/shifts/month/:date`  
- **9.2.4** `/app/:company/employee/shifts/:shiftId`  

### 9.3 Disponibilità
- **9.3.1** `/app/:company/employee/availability`  
- **9.3.2** `/app/:company/employee/availability/weekly`  
- **9.3.3** `/app/:company/employee/availability/exceptions`  

### 9.4 Richieste
- **9.4.1** `/app/:company/employee/requests`  
- **9.4.2** `/app/:company/employee/requests/new`  
- **9.4.3** `/app/:company/employee/requests/:requestId`  

### 9.5 Scambi
- **9.5.1** `/app/:company/employee/exchanges`  
- **9.5.2** `/app/:company/employee/exchanges/new` – proponi scambio / metti in bacheca  
- **9.5.3** `/app/:company/employee/exchanges/board` – turni disponibili  
- **9.5.4** `/app/:company/employee/exchanges/:exchangeId`  

### 9.6 Presenze
- **9.6.1** `/app/:company/employee/attendance`  
- **9.6.2** `/app/:company/employee/attendance/check-in`  
- **9.6.3** `/app/:company/employee/attendance/check-out`  
- **9.6.4** `/app/:company/employee/attendance/period/:from/:to`  
- **9.6.5** `/app/:company/employee/attendance/issues/new` – segnala errore ore  

---

## 10) Pagine “di sistema” (errori & utility)

- **10.1** `/403` – accesso negato  
- **10.2** `/404` – not found  
- **10.3** `/500` – errore server  
- **10.4** `/maintenance` – manutenzione  
- **10.5** `/offline` – PWA offline fallback *(se PWA)*  

---

## Extra (consigliato): endpoint “share” e feed

- **ICS personale (tokenizzato, read-only):**  
  - `/calendar/:calendarToken.ics` – feed ICS personale

- **Export firmato (link temporanei, opzionale):**  
  - `/app/:company/manager/reports/:reportId/export/:format` – export firmato
