# Workforce Scheduling Platform — Action Permission Matrix (LLM-Optimized)

> **Scope:** matrice permessi per **azioni** (action keys) con scope (company/location/department/self/assigned), ruoli, note di audit e preset pronti all’uso.  
> **Uso tipico:** RBAC + policy enforcement lato API/DB (non UI-only).

---

## Convenzioni

- **Action key:** `modulo.azione` *(es. `shift.publish`)*  
- **Scope:** `company | location | department | self | assigned`  
- **Ruoli:** `OWNER/ADMIN`, `MANAGER`, `SUPERVISOR`, `EMPLOYEE`  
- Dove leggi **“✅ scoped”** significa: permesso **solo entro il proprio scope** *(sede/reparto assegnato)*.

### Legenda veloce (in questo documento)
- ✅ = consentito (read/write o esecuzione)  
- 👁️ = read-only / view-only  
- ❌ = negato  
- ✅ scoped = consentito ma limitato a scope (location/department/self/assigned)

---

## 1) AUTH / ACCOUNT

- **1.1** `auth.login` – tutti *(public)*  
- **1.2** `auth.signup` – tutti *(public)*  
- **1.3** `auth.logout` – tutti  
- **1.4** `account.updateProfile` – tutti *(self)*  
- **1.5** `account.changePassword` – tutti *(self)*  
- **1.6** `account.manage2FA` – tutti *(self)*  
- **1.7** `account.viewSessions` – tutti *(self)*  
- **1.8** `account.revokeSession` – tutti *(self)*  
- **1.9** `support.impersonateUser` – ✅ **OWNER/ADMIN** *(audit obbligatorio)*  

---

## 2) COMPANY & STRUCTURE (Setup)

### Company
- **2.1** `company.view` – ✅ **OWNER/ADMIN**, 👁️ **MANAGER** *(company)*  
- **2.2** `company.update` – ✅ **OWNER/ADMIN**  
- **2.3** `company.manageBranding` – ✅ **OWNER/ADMIN**  
- **2.4** `company.manageLocalization` – ✅ **OWNER/ADMIN**  

### Location
- **2.5** `location.create` – ✅ **OWNER/ADMIN**  
- **2.6** `location.update` – ✅ **OWNER/ADMIN**  
- **2.7** `location.delete` – ✅ **OWNER/ADMIN**  
- **2.8** `location.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  

### Department
- **2.9** `department.create` – ✅ **OWNER/ADMIN**  
- **2.10** `department.update` – ✅ **OWNER/ADMIN**  
- **2.11** `department.delete` – ✅ **OWNER/ADMIN**  
- **2.12** `department.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  

### Calendari di apertura e chiusure
- **2.13** `openingHours.manage` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped se delegato)*  
- **2.14** `closures.manage` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped)*  
- **2.15** `holidays.manage` – ✅ **OWNER/ADMIN**  

---

## 3) USERS / ROLES / PERMISSIONS

### Users
- **3.1** `user.invite` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped)*  
- **3.2** `user.importCSV` – ✅ **OWNER/ADMIN**  
- **3.3** `user.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **3.4** `user.update` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER su campi limitati)*  
- **3.5** `user.deactivate` – ✅ **OWNER/ADMIN**  
- **3.6** `user.reactivate` – ✅ **OWNER/ADMIN**  
- **3.7** `user.delete` – ✅ **OWNER/ADMIN** *(attenzione GDPR: spesso “soft delete”)*  

### Roles / RBAC
- **3.8** `role.assign` – ✅ **OWNER/ADMIN**  
- **3.9** `role.view` – ✅ **OWNER/ADMIN**, 👁️ **MANAGER**  
- **3.10** `permission.manageRBAC` – ✅ **OWNER/ADMIN** *(RBAC avanzato)*  

### Assignments / Teams
- **3.11** `assignment.setScope` *(sede/reparto per utente)* – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped)*  
- **3.12** `team.manage` *(gruppi/team)* – ✅ **OWNER/ADMIN**  

---

## 4) EMPLOYEE PROFILE (HR light)

- **4.1** `employee.create` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale)*  
- **4.2** `employee.update` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **4.3** `employee.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **4.4** `employee.terminate` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale)*  

- **4.5** `employee.manageSkills` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **4.6** `employee.manageContract` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped)*  
- **4.7** `employee.manageHourlyRate` – ✅ **OWNER/ADMIN** *(sensibile)*  
- **4.8** `employee.manageNotesInternal` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR** *(opzionale)*  

---

## 5) AVAILABILITY (Disponibilità)

- **5.1** `availability.viewAll` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR** *(opzionale)*  
- **5.2** `availability.setForSelf` – ✅ **EMPLOYEE** *(self)*  
- **5.3** `availability.setForEmployee` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale: correzioni)*  
- **5.4** `availability.createExceptionSelf` – ✅ **EMPLOYEE** *(self)*  
- **5.5** `availability.createExceptionForEmployee` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **5.6** `availability.lock` *(blocca modifica per periodo)* – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale)*  

---

## 6) POLICIES / RULES (Compliance engine)

- **6.1** `policy.view` – ✅ **OWNER/ADMIN**, 👁️ **MANAGER**  
- **6.2** `policy.update` – ✅ **OWNER/ADMIN**  
- **6.3** `policy.override` *(ignore conflict / force assign)* – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ❌ **SUPERVISOR**, ❌ **EMPLOYEE**  
- **6.4** `policy.setWarningsVsBlocks` – ✅ **OWNER/ADMIN**  
- **6.5** `policy.manageOvertimeRules` – ✅ **OWNER/ADMIN**  
- **6.6** `policy.manageAbsenceRules` – ✅ **OWNER/ADMIN**  

**Nota:** `policy.override` deve generare **audit + motivo obbligatorio**.

---

## 7) SCHEDULING / SHIFTS

### 7.1 Turni (CRUD)
- **7.1.1** `shift.create` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.1.2** `shift.update` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.1.3** `shift.delete` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.1.4** `shift.viewAll` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **7.1.5** `shift.viewSelf` – ✅ **EMPLOYEE** *(self)*  

### 7.2 Assegnazione
- **7.2.1** `shift.assignEmployee` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.2.2** `shift.unassignEmployee` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.2.3** `shift.reassignEmployee` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.2.4** `shift.bulkAssign` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

### 7.3 Template & pianificazione
- **7.3.1** `shiftTemplate.manage` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.3.2** `weekPattern.manage` *(settimana tipo)* – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.3.3** `schedule.clonePeriod` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

### 7.4 Stato e pubblicazione
- **7.4.1** `schedule.saveDraft` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.4.2** `schedule.publish` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **7.4.3** `schedule.unpublish` – ✅ **OWNER/ADMIN** *(opzionale: MANAGER scoped)*  
- **7.4.4** `schedule.lockPeriod` *(chiudi e blocca modifiche)* – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale)*  
- **7.4.5** `schedule.notifyEmployees` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

### 7.5 Note e comunicazione sul turno
- **7.5.1** `shift.addNotes` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR** *(opzionale)*  
- **7.5.2** `shift.viewNotes` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**, ✅ **EMPLOYEE** *(self)*  

---

## 8) COVERAGE / REQUIREMENTS (Fabbisogno)

- **8.1** `coverage.manageRequirements` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **8.2** `coverage.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR** *(opzionale)*  
- **8.3** `coverage.resolveUnderstaffing` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **8.4** `coverage.setSkillMinimums` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

---

## 9) REQUESTS (Ferie / Permessi / Malattia)

### 9.1 Creazione e gestione (dipendente)
- **9.1.1** `request.createSelf` – ✅ **EMPLOYEE** *(self)*  
- **9.1.2** `request.updateSelf` – ✅ **EMPLOYEE** *(self, solo se pending)*  
- **9.1.3** `request.cancelSelf` – ✅ **EMPLOYEE** *(self, solo se pending)*  
- **9.1.4** `request.viewSelf` – ✅ **EMPLOYEE** *(self)*  

### 9.2 Approvazioni (manager/admin)
- **9.2.1** `request.viewAll` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **9.2.2** `request.approve` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **9.2.3** `request.reject` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **9.2.4** `request.comment` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **9.2.5** `request.insertManualAbsence` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **9.2.6** `request.attachDocument` – ✅ **EMPLOYEE** *(self upload)* + ✅ scoped **MANAGER/ADMIN** *(view)*  

### 9.3 Policy impact
- **9.3.1** `request.blockIfCriticalCoverage` – *(non è un permesso, è una regola)*  
- **9.3.2** `request.overrideCoverageRule` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(audit)*  

---

## 10) SHIFT EXCHANGE (Scambi turno)

### 10.1 Dipendente
- **10.1** `exchange.propose` – ✅ **EMPLOYEE** *(self)*  
- **10.2** `exchange.accept` – ✅ **EMPLOYEE** *(self, se destinatario)*  
- **10.3** `exchange.reject` – ✅ **EMPLOYEE** *(self, se destinatario)*  
- **10.4** `exchange.cancel` – ✅ **EMPLOYEE** *(self, se proponente, finché pending)*  
- **10.5** `exchange.postToBoard` – ✅ **EMPLOYEE** *(self)*  
- **10.6** `exchange.takeFromBoard` – ✅ **EMPLOYEE** *(self) + validazioni*  

### 10.2 Manager/Admin
- **10.7** `exchange.viewAll` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **10.8** `exchange.approve` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **10.9** `exchange.rejectByManager` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **10.10** `exchange.autoApprove` – *(flag di policy: se true il sistema approva)*  

---

## 11) TIME & ATTENDANCE (Presenze / Timbrature)

### 11.1 Timbrature
- **11.1.1** `attendance.checkInSelf` – ✅ **EMPLOYEE** *(self)*  
- **11.1.2** `attendance.checkOutSelf` – ✅ **EMPLOYEE** *(self)*  
- **11.1.3** `attendance.viewSelf` – ✅ **EMPLOYEE** *(self)*  

- **11.1.4** `attendance.viewAll` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **11.1.5** `attendance.markPresent` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **11.1.6** `attendance.markAbsent` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  
- **11.1.7** `attendance.markLate` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR**  

### 11.2 Correzioni e straordinari
- **11.2.1** `attendance.requestCorrectionSelf` – ✅ **EMPLOYEE** *(self)*  
- **11.2.2** `attendance.approveCorrection` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **11.2.3** `attendance.editManual` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(audit)*  
- **11.2.4** `overtime.approve` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **11.2.5** `overtime.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, 👁️ **EMPLOYEE** *(self)*  

---

## 12) REPORTING / EXPORT

- **12.1** `report.view` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, 👁️ scoped **SUPERVISOR** *(subset)*  
- **12.2** `report.exportCSV` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **12.3** `report.exportXLSX` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **12.4** `report.exportPDF` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **12.5** `payroll.export` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **12.6** `analytics.viewCompanyKPI` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

---

## 13) COMMUNICATION (Bacheca & notifiche operative)

- **13.1** `announcement.create` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**, ✅ scoped **SUPERVISOR** *(opzionale)*  
- **13.2** `announcement.update` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **13.3** `announcement.delete` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  
- **13.4** `announcement.view` – ✅ **tutti** *(con scope)*  

- **13.5** `notification.managePreferencesSelf` – ✅ **tutti** *(self)*  
- **13.6** `notification.sendManual` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(messaggio manuale a team)*  
- **13.7** `readReceipt.confirmShiftSeen` – ✅ **EMPLOYEE** *(self)*  
- **13.8** `readReceipt.viewTeam` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER**  

---

## 14) INTEGRATIONS / API

- **14.1** `integration.calendar.enable` – ✅ **OWNER/ADMIN**  
- **14.2** `integration.calendar.configure` – ✅ **OWNER/ADMIN**  
- **14.3** `integration.ics.issueToken` – ✅ **OWNER/ADMIN**, ✅ scoped **MANAGER** *(opzionale)*, ✅ **EMPLOYEE** *(self token)*  

- **14.4** `integration.payroll.configureTemplate` – ✅ **OWNER/ADMIN**  
- **14.5** `integration.webhook.manage` – ✅ **OWNER/ADMIN**  
- **14.6** `integration.apiKey.manage` – ✅ **OWNER/ADMIN**  

---

## 15) AUDIT / DATA / COMPLIANCE

- **15.1** `audit.view` – ✅ **OWNER/ADMIN**  
- **15.2** `audit.export` – ✅ **OWNER/ADMIN**  
- **15.3** `data.exportCompany` – ✅ **OWNER/ADMIN**  
- **15.4** `data.retention.configure` – ✅ **OWNER/ADMIN**  
- **15.5** `gdpr.deleteUser` – ✅ **OWNER/ADMIN** *(con workflow)*  

---

## 16) “Preset” di permessi (pronti all’uso)

> Utili per partire senza RBAC custom, mantenendo coerenza di prodotto.

- **OWNER/ADMIN:** tutto  
- **MANAGER:** tutto operativo su scheduling/requests/exchanges/attendance/reports nel proprio scope + **nessun** accesso billing/integrations globali  
- **SUPERVISOR:** oggi + presenze + note + lettura planner nel proprio scope  
- **EMPLOYEE:** self *(turni/availability/requests/exchanges/attendance)* + bacheca  

---

## 17) Azioni che DEVONO avere audit obbligatorio (firma “enterprise”)

- `policy.override`  
- `attendance.editManual`  
- `schedule.unpublish`  
- `schedule.lockPeriod` *(+ sblocco periodo)*  
- `user.deactivate` / `user.delete`  
- `support.impersonateUser`  
- `request.overrideCoverageRule`  
