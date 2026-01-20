# Workforce Scheduling Platform — Route Permission Matrix & Guard Rules (LLM-Optimized)

> **Scope:** matrice permessi per route (macro e dettagli), regole di **scope** per evitare accessi indebiti, naming stabile degli ID in URL, e “middleware mental model” (logica di guard, non codice).

---

## 1) Route Permission Matrix (per macro-sezioni)

### Legenda
- ✅ = full (read/write)  
- 👁️ = read-only  
- ❌ = no access  
- 🔒 = accesso limitato *(solo propria sede/reparto / solo “self”)*  

### Macro-sezioni (base routes)

| Sezione / Base route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/*` *(common: profile, notifications, help)* | ✅ | ✅ | ✅ | ✅ |
| `/app/:company/admin/*` | ✅ | ❌ *(o 👁️ su alcuni report, opzionale)* | ❌ | ❌ |
| `/app/:company/manager/*` | ✅ *(opzionale)* | ✅ | 🔒 *(solo parte)* | ❌ |
| `/app/:company/supervisor/*` | ✅ *(opzionale)* | ✅ *(opzionale)* | ✅ | ❌ |
| `/app/:company/employee/*` | ✅ *(impersonate / support)* | 👁️ *(opzionale)* | 👁️ *(solo team/oggi, opzionale)* | ✅ |

### Nota prodotto (supporto “serio”)
- Abilita **impersonation** solo per **OWNER/ADMIN**, **sempre con audit log** (chi impersona chi, quando, per cosa).

---

## 2) Matrix dettagliata per route principali

### 2.1 Common (tutti)

| Route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/notifications` | ✅ | ✅ | ✅ | ✅ |
| `/app/:company/profile/*` | ✅ | ✅ | ✅ | ✅ |
| `/app/:company/search` | ✅ | ✅ | 🔒 *(solo scope)* | 🔒 *(solo self)* |
| `/app/:company/help` | ✅ | ✅ | ✅ | ✅ |

### 2.2 Admin

| Route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/admin/company` | ✅ | ❌ | ❌ | ❌ |
| `/app/:company/admin/locations/*` | ✅ | ❌ *(o 👁️)* | ❌ | ❌ |
| `/app/:company/admin/departments/*` | ✅ | ❌ *(o 👁️)* | ❌ | ❌ |
| `/app/:company/admin/users/*` | ✅ | ❌ *(o 🔒: invito solo staff del suo reparto)* | ❌ | ❌ |
| `/app/:company/admin/policies/*` | ✅ | 👁️ *(vedi regole applicate)* | ❌ | ❌ |
| `/app/:company/admin/integrations/*` | ✅ | ❌ | ❌ | ❌ |
| `/app/:company/admin/audit/*` | ✅ | ❌ *(o 👁️ limitato)* | ❌ | ❌ |
| `/app/:company/admin/billing/*` | ✅ | ❌ | ❌ | ❌ |

### 2.3 Manager

| Route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/manager` | ✅ | ✅ | ❌ | ❌ |
| `/app/:company/manager/schedule/*` | ✅ | ✅ | 👁️ *(o 🔒: edit solo giornata)* | ❌ |
| `/app/:company/manager/shifts/:shiftId` | ✅ | ✅ | 👁️ *(solo scope)* | ❌ |
| `/app/:company/manager/publish` | ✅ | ✅ | ❌ | ❌ |
| `/app/:company/manager/templates/*` | ✅ | ✅ | ❌ | ❌ |
| `/app/:company/manager/conflicts` | ✅ | ✅ | 👁️ *(solo scope)* | ❌ |
| `/app/:company/manager/coverage/*` | ✅ | ✅ | 👁️ *(solo scope)* | ❌ |
| `/app/:company/manager/employees/*` | ✅ | ✅ | 👁️ *(solo team)* | ❌ |
| `/app/:company/manager/requests/*` | ✅ | ✅ | 👁️ *(opzionale: solo “oggi”)* | ❌ |
| `/app/:company/manager/exchanges/*` | ✅ | ✅ | 👁️ *(solo scope)* | ❌ |
| `/app/:company/manager/attendance/*` | ✅ | ✅ | 🔒 *(solo oggi / reparto)* | ❌ |
| `/app/:company/manager/reports/*` | ✅ | ✅ | 👁️ *(solo subset)* | ❌ |
| `/app/:company/manager/announcements/*` | ✅ | ✅ | ✅ *(solo crea per reparto, opzionale)* | ❌ |

### 2.4 Supervisor (opzionale)

| Route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/supervisor/today` | ✅ | ✅ | ✅ | ❌ |
| `/app/:company/supervisor/attendance` | ✅ | ✅ | ✅ | ❌ |
| `/app/:company/supervisor/schedule` | ✅ | ✅ | ✅ *(scope)* | ❌ |
| `/app/:company/supervisor/exchanges` | ✅ | ✅ | ✅ *(last-minute)* | ❌ |

### 2.5 Employee

| Route | OWNER/ADMIN | MANAGER | SUPERVISOR | EMPLOYEE |
|---|---:|---:|---:|---:|
| `/app/:company/employee/shifts/*` | ✅ | 👁️ *(opzionale)* | ❌ | ✅ |
| `/app/:company/employee/availability/*` | ✅ | 👁️ *(opzionale)* | ❌ | ✅ |
| `/app/:company/employee/requests/*` | ✅ | 👁️ *(opzionale)* | ❌ | ✅ |
| `/app/:company/employee/exchanges/*` | ✅ | 👁️ *(opzionale)* | ❌ | ✅ |
| `/app/:company/employee/attendance/*` | ✅ | 👁️ *(opzionale)* | ❌ | ✅ |

---

## 3) Scope rules (la parte che evita “buchi”)

> Oltre al ruolo, applica sempre regole di **scope** (tenant + contesto) per prevenire accessi orizzontali.

### 3.1 Company scope
- L’utente deve appartenere a `:company` (**membership** sul tenant).

### 3.2 Location / Department scope
- **Manager** può essere:
  - **global manager** *(vede tutto nella company)*
  - **manager di sede/reparto** *(scoped a location/department)*  
- **Supervisor**: sempre scoped a **sede/reparto**.

### 3.3 Self scope (dipendente)
Il dipendente vede/modifica solo:
- proprie **disponibilità**
- proprie **richieste**
- propri **turni**
- proprie **presenze**

### 3.4 Suggerimento pratico (data model)
Per ogni record *(shift/request/attendance/exchange…)* salva sempre:
- `companyId`
- `locationId` *(nullable se non serve)*
- `departmentId` *(nullable)*
- `employeeId` *(se applicabile)*

---

## 4) Naming degli identificatori in URL (puliti e stabili)

### 4.1 Consiglio “best of both worlds”
- Internamente usa `id` *(UUID/CUID)* per relazioni DB.  
- In URL usa **slug** quando ha senso ed è stabile; altrimenti usa **publicId**.

### 4.1.1 Pattern consigliato
- `companySlug` *(es. `acme`)*  
- `locationSlug` *(es. `bologna-centro`)*  
- `departmentSlug` *(es. `cucina`)*  
- `employeePublicId` *(es. `emp_8f3k…`)*  
- `shiftPublicId` *(es. `sh_4t2…`)*  
- `requestPublicId` *(es. `req_…`)*  
- `exchangePublicId` *(es. `ex_…`)*  

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

1. **Auth guard** *(utente loggato)*  
2. **Company guard** *(membership su company)*  
3. **Role guard** *(RBAC: ruolo e permessi granulari)*  
4. **Scope guard** *(location/department/self)*  
5. **Audit** *(se azione è write o override regole)*  
