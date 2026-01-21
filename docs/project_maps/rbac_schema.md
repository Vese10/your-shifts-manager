# RBAC Schema (Spec) — Multi-Tenant + Multi-Scope + Audit (LLM-Optimized)

> **Questo documento è una SPEC concettuale** (non codice) del modello dati e del motore autorizzazioni (RBAC) per una piattaforma di workforce scheduling.  
> **Obiettivi coperti:** multi-tenant (Company), multi-sede/reparto (Location/Department), permessi per azione (`shift.publish`…), scope granulare (company/location/department/self), override + audit, preset ruoli base + estendibilità enterprise.

---

## Table of Contents

1. [Principi del modello](#1-principi-del-modello-come-ragionare)
2. [Entità principali (core domain)](#2-entità-principali-core-domain)
3. [RBAC Schema (tabelle e campi)](#3-rbac-schema-tabelle-e-campi)
4. [Scope delle risorse operative](#4-tabelle-per-i-scope-target-opzionali-ma-utilissime)
5. [Policy Engine (evaluation)](#5-policy-engine-come-decidere-allowed)
6. [Risoluzione conflitti tra ruoli](#52-risoluzione-conflitti-tra-più-ruoli)
7. [Preset ruoli “system”](#6-preset-ruoli-system-quelli-che-metti-di-default)
8. [Permission groups (UI & management)](#7-permission-groups-per-gestirle-senza-impazzire)
9. [Audit schema](#8-audit-schema-fortemente-consigliato)
10. [Esempi concreti di assegnazione](#9-esempi-concreti-di-assegnazione-per-capire-che-funziona)
11. [Minimo indispensabile (MVP)](#10-cosa-è-davvero-indispensabile-nel-rbac-schema)

---

## 1) Principi del modello (come ragionare)

### 1.1 RBAC + Scope (RBAC “vero”)

> Il ruolo da solo non basta: serve sempre lo **scope**.

- **Role** = insieme di permessi (un “pacchetto” di capability)
- **Permission** = azione atomica _(es. `shift.create`, `request.approve`)_
- **Scope** = su quali risorse vale _(company / location / department / self)_
- **Assignment** = utente X ha ruolo Y in company Z con scope S

**Sintesi:**

> _“ALLOW + SCOPE valido”_ → autorizzazione.

### 1.2 “Self” come regola speciale

Azioni tipo `availability.setForSelf` o `shift.viewSelf` **non dovrebbero dipendere dai ruoli**.  
Sono autorizzate se (condizione di ownership):

- `resource.employeeId == currentUser.employeeId`

In pratica: **self scope** = regola di ownership, non “ruolo”.

---

## 2) Entità principali (core domain)

> Le entità del dominio devono collegarsi al RBAC tramite `companyId` e, quando utile, `locationId/departmentId/employeeId`.

- **Company**
- **Location** _(belongs to Company)_
- **Department** _(belongs to Company; opzionalmente legato a Location)_
- **User** _(account)_
- **EmployeeProfile** _(opzionale: separazione tra utente e dipendente)_
- Risorse operative: **Shift**, **Request**, **Attendance**, **Exchange**, **Announcement**
  - tutte con `companyId`
  - di solito anche `locationId` / `departmentId`
  - spesso anche `employeeId` (per ownership / self)

---

## 3) RBAC Schema (tabelle e campi)

> Tabelle e relazioni consigliate. Nomi indicativi: adattali al tuo stack (Prisma/SQL/etc.).

### 3.1 Role

**Role**

- `id`
- `companyId` _(NULL se role “global template” — vedi nota)_
- `key` _(unica per company; es: `OWNER`, `MANAGER`, `SUPERVISOR`, `EMPLOYEE`, o custom)_
- `name` _(es. “Manager Sede”)_
- `description`
- `isSystem` _(bool: true per ruoli base non eliminabili)_
- `createdAt`, `updatedAt`

**Opzione template:** ruoli “globali” (senza `companyId`) come **template** copiati alla creazione di una nuova company.

### 3.2 Permission (azione)

**Permission**

- `id`
- `key` _(unica globale; es. `shift.publish`)_
- `module` _(es. `shift`, `request`, `attendance`)_
- `description`
- `riskLevel` _(LOW|MEDIUM|HIGH — utile per audit)_
- `createdAt`

### 3.3 RolePermission (mappa ruolo → permessi)

**RolePermission**

- `roleId`
- `permissionId`
- `effect` _(ALLOW|DENY — opzionale ma utile in enterprise)_
- `createdAt`

**Nota semplificazione:** puoi partire con **solo ALLOW**.

### 3.4 ScopeAssignment (assegnazione ruolo a utente con scope)

**UserRoleAssignment**

- `id`
- `companyId`
- `userId`
- `roleId`
- `scopeType` _(COMPANY|LOCATION|DEPARTMENT|SELF)_
- `scopeId` _(nullable; se COMPANY → null; se SELF → null; se LOCATION/DEPARTMENT → id relativo)_
- `isActive` _(bool)_
- `startsAt`, `endsAt` _(opzionale: ruoli temporanei)_
- `createdAt`, `updatedAt`

**Esempi**

- Manager globale: `scopeType=COMPANY`
- Manager solo sede Bologna: `scopeType=LOCATION`, `scopeId=loc_bologna`
- Supervisor reparto cucina: `scopeType=DEPARTMENT`, `scopeId=dep_cucina`
- Employee: di solito `scopeType=SELF` + collegamento a EmployeeProfile

**Nota:** per EMPLOYEE potresti dedurre il ruolo, ma tenerlo uniforma tutto (e semplifica RBAC UI).

### 3.5 UserCompanyMembership (membership / tenant)

Serve per la domanda: _“questo utente appartiene a questa azienda?”_ anche se non ha ruoli.

**CompanyMember**

- `companyId`
- `userId`
- `status` _(ACTIVE|SUSPENDED|LEFT)_
- `defaultLocationId` _(nullable)_
- `defaultDepartmentId` _(nullable)_
- `createdAt`, `updatedAt`

### 3.6 EmployeeProfile (collega user a dipendente)

**EmployeeProfile**

- `id`
- `companyId`
- `userId` _(unique per company)_
- `locationId` _(primary)_
- `departmentId` _(primary, nullable)_
- `active`
- campi HR _(contractType, hourlyRate, ecc.)_

---

## 4) Tabelle per i “scope target” (opzionali ma utilissime)

### 4.1 ResourceScope (normalizza lo scope delle risorse)

Tutte le risorse operative dovrebbero avere sempre questi campi:

- `companyId`
- `locationId` _(nullable se non serve)_
- `departmentId` _(nullable)_
- `employeeId` _(nullable; per self-owned o assegnatario)_

**Esempi**

- **Shift**: `companyId + locationId + departmentId + employeeId (assegnato)`
- **Request**: `companyId + employeeId + (locationId/departmentId derivati dall’employee)`
- **Attendance**: `companyId + employeeId + (locationId/departmentId)`
- **Exchange**: `companyId + employeeId (proponente) + (location/department)`

**Benefit:** l’evaluation diventa “match campo → scope” senza join complessi.

---

## 5) Policy Engine (come decidere “allowed?”)

### 5.1 Passi di valutazione (ordine consigliato)

1. **Auth**: utente loggato
2. **Company membership**: esiste `CompanyMember` con `status=ACTIVE` per `companyId`
3. **Permission check**:
   - trova tutte le `UserRoleAssignment` **attive** per `(userId, companyId)`
   - risali a `RolePermission` (ALLOW/DENY) per quei ruoli
   - verifica che `permission.key` richiesta sia presente con effetto valido
4. **Scope check** _(il cuore)_:
   - `scopeType=COMPANY` → ok su tutte le risorse della company
   - `scopeType=LOCATION` → ok solo se `resource.locationId == scopeId`
   - `scopeType=DEPARTMENT` → ok solo se `resource.departmentId == scopeId`
   - `scopeType=SELF` → ok solo se `resource.employeeId == myEmployeeId`
5. **Ownership override / self-only**:
   - alcune permission sono _self-only_ per definizione _(es. `availability.setForSelf`)_
6. **Rule & Compliance (business rules, non RBAC)**:
   - conflitti, riposi, limiti ore… (motore regole)
7. **Audit**:
   - se azione è **write** o `riskLevel` è **HIGH** → log + reason (se richiesto)

> **Importante:** RBAC decide “chi può tentare l’azione”. Le regole di business decidono “l’azione è valida?”.

### 5.2 Risoluzione conflitti tra più ruoli

Se un utente ha più ruoli/assignment attivi, regole consigliate:

- Se implementi `DENY`: **DENY vince** su ALLOW (più sicuro)
- Se solo ALLOW: basta che esista **almeno un ALLOW con scope valido**

---

## 6) Preset ruoli “system” (quelli che metti di default)

Crea 4 ruoli system per company:

- **OWNER** _(scope COMPANY)_
- **MANAGER** _(scope COMPANY o LOCATION)_
- **SUPERVISOR** _(scope DEPARTMENT o LOCATION)_
- **EMPLOYEE** _(scope SELF)_

Poi ruoli custom opzionali:

- `MANAGER_HR` _(requests + employees, ma non `schedule.publish`)_
- `PAYROLL_VIEWER` _(solo report/export)_

---

## 7) Permission groups (per gestirle senza impazzire)

Non obbligatorio, ma molto comodo per UI “Admin → Permessi”.

**PermissionGroup**

- `id`
- `key` _(es. `SCHEDULING`, `REQUESTS`, `ATTENDANCE`)_
- `name`

**PermissionGroupItem**

- `groupId`
- `permissionId`

**Benefit:** mostri “gruppi” invece di 200 righe di permessi.

---

## 8) Audit schema (fortemente consigliato)

**AuditLog**

- `id`
- `companyId`
- `actorUserId`
- `actionKey` _(es. `shift.publish`)_
- `entityType` _(Shift/Request/Attendance/…)_
- `entityId` _(publicId o db id)_
- `before` _(JSON, opzionale)_
- `after` _(JSON, opzionale)_
- `metadata` _(JSON: ip, userAgent, reason, override=true, scope…)_
- `createdAt`

**Regola:** qualsiasi azione “rischiosa” deve avere `metadata.reason` **obbligatorio**.

---

## 9) Esempi concreti di assegnazione (per capire che funziona)

### Caso A: Manager di sede Bologna

- `UserRoleAssignment`: `role=MANAGER`, `scopeType=LOCATION`, `scopeId=loc_bologna`
- Permessi: `shift.*`, `request.approve`, `attendance.*`, `report.export*`
- **Risultato:** gestisce tutto ma solo su `loc_bologna`.

### Caso B: Supervisor Cucina

- `UserRoleAssignment`: `role=SUPERVISOR`, `scopeType=DEPARTMENT`, `scopeId=dep_cucina`
- Permessi: `attendance.markPresent`, `shift.viewAll`, `shift.addNotes`
- **Risultato:** vede turni cucina, segna presenze, non pubblica turni.

### Caso C: Dipendente

- `UserRoleAssignment`: `role=EMPLOYEE`, `scopeType=SELF`
- Permessi: `shift.viewSelf`, `availability.setForSelf`, `request.createSelf`, `attendance.checkInSelf`
- **Risultato:** self-only pulito.

---

## 10) Cosa è davvero “indispensabile” nel RBAC schema?

Se vuoi partire robusto senza overkill, minimo sindacale:

- **Role**
- **Permission**
- **RolePermission**
- **UserRoleAssignment** _(con `scopeType` + `scopeId`)_
- **CompanyMember**
- **AuditLog**
