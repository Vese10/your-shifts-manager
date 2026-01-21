# Workforce Scheduling Platform — Route Permission Matrix & Guard Rules (LLM-Optimized)

> **Scope:** matrice permessi per route (macro e dettagli), regole di **scope** per evitare accessi indebiti, naming stabile degli ID in URL, e “middleware mental model” (logica di guard, non codice).

---

## 1) Route Permission Matrix (per macro-sezioni)

### Legenda

- ✅ = full (read/write)
- 👁️ = read-only
- ❌ = no access
- 🔒 = accesso limitato _(solo propria sede/reparto / solo “self”)_

### Macro-sezioni (base routes)

| Sezione / Base route                                       |                  OWNER/ADMIN |                                 MANAGER |                       SUPERVISOR | EMPLOYEE |
| ---------------------------------------------------------- | ---------------------------: | --------------------------------------: | -------------------------------: | -------: |
| `/app/:company/*` _(common: profile, notifications, help)_ |                           ✅ |                                      ✅ |                               ✅ |       ✅ |
| `/app/:company/admin/*`                                    |                           ✅ | ❌ _(o 👁️ su alcuni report, opzionale)_ |                               ❌ |       ❌ |
| `/app/:company/manager/*`                                  |             ✅ _(opzionale)_ |                                      ✅ |                🔒 _(solo parte)_ |       ❌ |
| `/app/:company/supervisor/*`                               |             ✅ _(opzionale)_ |                        ✅ _(opzionale)_ |                               ✅ |       ❌ |
| `/app/:company/employee/*`                                 | ✅ _(impersonate / support)_ |                        👁️ _(opzionale)_ | 👁️ _(solo team/oggi, opzionale)_ |       ✅ |

### Nota prodotto (supporto “serio”)

- Abilita **impersonation** solo per **OWNER/ADMIN**, **sempre con audit log** (chi impersona chi, quando, per cosa).

---

## 2) Matrix dettagliata per route principali

### 2.1 Common (tutti)

| Route                         | OWNER/ADMIN | MANAGER |        SUPERVISOR |         EMPLOYEE |
| ----------------------------- | ----------: | ------: | ----------------: | ---------------: |
| `/app/:company/notifications` |          ✅ |      ✅ |                ✅ |               ✅ |
| `/app/:company/profile/*`     |          ✅ |      ✅ |                ✅ |               ✅ |
| `/app/:company/search`        |          ✅ |      ✅ | 🔒 _(solo scope)_ | 🔒 _(solo self)_ |
| `/app/:company/help`          |          ✅ |      ✅ |                ✅ |               ✅ |

### 2.2 Admin

| Route                                | OWNER/ADMIN |                                        MANAGER | SUPERVISOR | EMPLOYEE |
| ------------------------------------ | ----------: | ---------------------------------------------: | ---------: | -------: |
| `/app/:company/admin/company`        |          ✅ |                                             ❌ |         ❌ |       ❌ |
| `/app/:company/admin/locations/*`    |          ✅ |                                    ❌ _(o 👁️)_ |         ❌ |       ❌ |
| `/app/:company/admin/departments/*`  |          ✅ |                                    ❌ _(o 👁️)_ |         ❌ |       ❌ |
| `/app/:company/admin/users/*`        |          ✅ | ❌ _(o 🔒: invito solo staff del suo reparto)_ |         ❌ |       ❌ |
| `/app/:company/admin/policies/*`     |          ✅ |                   👁️ _(vedi regole applicate)_ |         ❌ |       ❌ |
| `/app/:company/admin/integrations/*` |          ✅ |                                             ❌ |         ❌ |       ❌ |
| `/app/:company/admin/audit/*`        |          ✅ |                           ❌ _(o 👁️ limitato)_ |         ❌ |       ❌ |
| `/app/:company/admin/billing/*`      |          ✅ |                                             ❌ |         ❌ |       ❌ |

### 2.3 Manager

| Route                                   | OWNER/ADMIN | MANAGER |                              SUPERVISOR | EMPLOYEE |
| --------------------------------------- | ----------: | ------: | --------------------------------------: | -------: |
| `/app/:company/manager`                 |          ✅ |      ✅ |                                      ❌ |       ❌ |
| `/app/:company/manager/schedule/*`      |          ✅ |      ✅ |         👁️ _(o 🔒: edit solo giornata)_ |       ❌ |
| `/app/:company/manager/shifts/:shiftId` |          ✅ |      ✅ |                       👁️ _(solo scope)_ |       ❌ |
| `/app/:company/manager/publish`         |          ✅ |      ✅ |                                      ❌ |       ❌ |
| `/app/:company/manager/templates/*`     |          ✅ |      ✅ |                                      ❌ |       ❌ |
| `/app/:company/manager/conflicts`       |          ✅ |      ✅ |                       👁️ _(solo scope)_ |       ❌ |
| `/app/:company/manager/coverage/*`      |          ✅ |      ✅ |                       👁️ _(solo scope)_ |       ❌ |
| `/app/:company/manager/employees/*`     |          ✅ |      ✅ |                        👁️ _(solo team)_ |       ❌ |
| `/app/:company/manager/requests/*`      |          ✅ |      ✅ |           👁️ _(opzionale: solo “oggi”)_ |       ❌ |
| `/app/:company/manager/exchanges/*`     |          ✅ |      ✅ |                       👁️ _(solo scope)_ |       ❌ |
| `/app/:company/manager/attendance/*`    |          ✅ |      ✅ |              🔒 _(solo oggi / reparto)_ |       ❌ |
| `/app/:company/manager/reports/*`       |          ✅ |      ✅ |                      👁️ _(solo subset)_ |       ❌ |
| `/app/:company/manager/announcements/*` |          ✅ |      ✅ | ✅ _(solo crea per reparto, opzionale)_ |       ❌ |

### 2.4 Supervisor (opzionale)

| Route                                 | OWNER/ADMIN | MANAGER |         SUPERVISOR | EMPLOYEE |
| ------------------------------------- | ----------: | ------: | -----------------: | -------: |
| `/app/:company/supervisor/today`      |          ✅ |      ✅ |                 ✅ |       ❌ |
| `/app/:company/supervisor/attendance` |          ✅ |      ✅ |                 ✅ |       ❌ |
| `/app/:company/supervisor/schedule`   |          ✅ |      ✅ |       ✅ _(scope)_ |       ❌ |
| `/app/:company/supervisor/exchanges`  |          ✅ |      ✅ | ✅ _(last-minute)_ |       ❌ |

### 2.5 Employee

| Route                                   | OWNER/ADMIN |          MANAGER | SUPERVISOR | EMPLOYEE |
| --------------------------------------- | ----------: | ---------------: | ---------: | -------: |
| `/app/:company/employee/shifts/*`       |          ✅ | 👁️ _(opzionale)_ |         ❌ |       ✅ |
| `/app/:company/employee/availability/*` |          ✅ | 👁️ _(opzionale)_ |         ❌ |       ✅ |
| `/app/:company/employee/requests/*`     |          ✅ | 👁️ _(opzionale)_ |         ❌ |       ✅ |
| `/app/:company/employee/exchanges/*`    |          ✅ | 👁️ _(opzionale)_ |         ❌ |       ✅ |
| `/app/:company/employee/attendance/*`   |          ✅ | 👁️ _(opzionale)_ |         ❌ |       ✅ |

---

## 3) Scope rules (la parte che evita “buchi”)

> Oltre al ruolo, applica sempre regole di **scope** (tenant + contesto) per prevenire accessi orizzontali.

### 3.1 Company scope

- L’utente deve appartenere a `:company` (**membership** sul tenant).

### 3.2 Location / Department scope

- **Manager** può essere:
  - **global manager** _(vede tutto nella company)_
  - **manager di sede/reparto** _(scoped a location/department)_
- **Supervisor**: sempre scoped a **sede/reparto**.

### 3.3 Self scope (dipendente)

Il dipendente vede/modifica solo:

- proprie **disponibilità**
- proprie **richieste**
- propri **turni**
- proprie **presenze**

### 3.4 Suggerimento pratico (data model)

Per ogni record _(shift/request/attendance/exchange…)_ salva sempre:

- `companyId`
- `locationId` _(nullable se non serve)_
- `departmentId` _(nullable)_
- `employeeId` _(se applicabile)_

---

## 4) Naming degli identificatori in URL (puliti e stabili)

### 4.1 Consiglio “best of both worlds”

- Internamente usa `id` _(UUID/CUID)_ per relazioni DB.
- In URL usa **slug** quando ha senso ed è stabile; altrimenti usa **publicId**.

### 4.1.1 Pattern consigliato

- `companySlug` _(es. `acme`)_
- `locationSlug` _(es. `bologna-centro`)_
- `departmentSlug` _(es. `cucina`)_
- `employeePublicId` _(es. `emp_8f3k…`)_
- `shiftPublicId` _(es. `sh_4t2…`)_
- `requestPublicId` _(es. `req_…`)\_
- `exchangePublicId` _(es. `ex_…`)\_

**Nota:** per entità “operative” (turni/richieste/scambi) è preferibile **publicId** (non slug):

- evita collisioni
- non soffre rename
- non richiede “unicità semantica”

### 4.2 Route params standard

- `:company` → `companySlug`
- `:location` → `locationSlug`
- `:department` → `departmentSlug`
- `:employeeId` → `employeePublicId`
- `:shiftId` → `shiftPublicId`
- `:requestId` → `requestPublicId`

### 4.3 Querystring (filtri) — coerenza ovunque

- `?location=:locationSlug`
- `&department=:departmentSlug`
- `&from=YYYY-MM-DD&to=YYYY-MM-DD`
- `&status=pending|approved|rejected`
- `&view=week|month`
- `&q=searchterm`

---

## 5) Middleware / guard mentale (non codice, solo logica)

Per ogni route privata applica questa catena:

1. **Auth guard** _(utente loggato)_
2. **Company guard** _(membership su company)_
3. **Role guard** _(RBAC: ruolo e permessi granulari)_
4. **Scope guard** _(location/department/self)_
5. **Audit** _(se azione è write o override regole)_
