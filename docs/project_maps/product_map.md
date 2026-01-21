# Workforce Scheduling Platform — IA, Moduli, UX & Flows (LLM-Optimized)

> **Obiettivo:** documentare **macro-moduli**, **navigazione globale**, **information architecture per ruolo**, **schermate core**, **flow principali** e **dipendenze tra moduli** per una piattaforma di gestione turni (multi-tenant, multi-sede, multi-reparto).  
> **Formato:** Markdown “pulito” e gerarchico, adatto a indicizzazione / RAG / LLM parsing.

## Table of Contents
1. [Moduli del prodotto (macro-aree)](#1-moduli-del-prodotto-macro-aree)
2. [Navigazione globale (layout “serio”)](#2-navigazione-globale-layout-serio)
3. [Information Architecture per ruolo](#3-information-architecture-per-ruolo)
   - [A) OWNER / ADMIN](#a-owner--admin-super-admin-aziendale)
   - [B) MANAGER](#b-manager-operativo-pianificazione)
   - [C) SUPERVISOR / CAPO TURNO](#c-supervisor--capo-turno-limitato-ma-potente)
   - [D) DIPENDENTE](#d-dipendente-mobile-first)
4. [Schermate core (quelle che definiscono il prodotto)](#4-schermate-core-quelle-che-definiscono-il-prodotto)
5. [Flow principali (da disegnare in UX)](#5-flow-principali-da-disegnare-in-ux-1-per-riga)
6. [Dipendenze tra moduli (ordine logico)](#6-dipendenze-tra-moduli-per-capire-lordine-logico)

---

## 1) Moduli del prodotto (macro-aree)

> **Nota:** i moduli sono “feature buckets” (macro-aree) utili per roadmap, navigation, ownership e pricing.

- **Auth & Access**
- **Company Setup** *(tenant, sedi, reparti, policy)*
- **People (HR light)** *(dipendenti, skill, contratti, disponibilità)*
- **Scheduling** *(turni, template, pubblicazione, copertura, conflitti)*
- **Requests** *(ferie/permessi/malattia, approvazioni)*
- **Shift Exchange** *(scambi / bacheca turni)*
- **Time & Attendance** *(presenze, timbrature, consuntivi)*
- **Reporting & Export** *(ore, assenze, copertura, payroll)*
- **Communication** *(bacheca, notifiche, conferme lettura)*
- **Integrations** *(calendari, payroll, webhook/API)*
- **Audit & Compliance** *(log, versioning, override)*
- **Billing (SaaS)** *(piani, limiti, pagamenti — se venduto a canone)*

---

## 2) Navigazione globale (layout “serio”)

### 2.1 Struttura UI

**Top bar**
- Selettore **Company** *(se multi-tenant)*
- Selettore **Sede/Reparto**
- **Ricerca**
- **Campanella notifiche**
- **Profilo** (account, sicurezza, logout)

**Sidebar**
- Cambia in base al **ruolo**
- Contiene macro-sezioni + shortcut operative

**Centro**
- Vista principale: **planner**, tabelle, form, report

**Drawer / Modal**
- Dettagli rapidi (es. **turno**, **richiesta**, **dipendente**)  
- Azioni “quick” senza perdere contesto

### 2.2 Regola d’oro UX

Tutto ciò che è **operativo** deve essere:
- **a 1 click dal planner** *(turni, richieste, assenze, scoperture)*
- con **azioni rapide**: approva, sposta, sostituisci, pubblica

---

## 3) Information Architecture per ruolo

> **Formato:** sidebar → sezioni → sottopagine.  
> **Scopo:** definire menù, routing, permessi e responsabilità.

### A) OWNER / ADMIN (super-admin aziendale)

#### Sidebar Admin

##### Dashboard Admin
- **1.1** Overview KPI: ore pianificate, ore consuntivate, richieste pendenti, scoperture, violazioni regole  
- **1.2** Stato integrazioni / notifiche / errori import

##### Azienda
- **2.1** Profilo azienda *(nome, logo, timezone, lingua)*  
- **2.2** Sedi *(lista + CRUD)*  
- **2.3** Reparti *(per sede)*  
- **2.4** Orari di apertura *(stagionali + eccezioni)*  
- **2.5** Festività / chiusure

##### Permessi & Ruoli
- **3.1** Ruoli standard *(Owner/Manager/Supervisor/Employee)*  
- **3.2** Permessi granulari (RBAC) *(spinta enterprise)*  
- **3.3** Regole visibilità per sede/reparto

##### Policy & Regole
- **4.1** Contratti & tipologie  
- **4.2** Limiti ore / riposi / pause  
- **4.3** Ferie & permessi *(maturazione, residui, policy)*  
- **4.4** Straordinari *(soglie, approvazione)*  
- **4.5** Regole conflitti *(warning vs blocco)*

##### Integrazioni
- **5.1** Calendari *(ICS / Google / Microsoft)*  
- **5.2** Payroll export *(template)*  
- **5.3** Webhook / API keys  
- **5.4** Canali notifiche *(email/SMS/WhatsApp/Telegram)*

##### Audit & Sicurezza
- **6.1** Log attività *(turni, richieste, presenze, utenti)*  
- **6.2** Versioning turni  
- **6.3** Sessioni / dispositivi / 2FA  
- **6.4** GDPR export / cancellazione

##### Billing (se SaaS)
- **7.1** Piano & limiti *(utenti/sedi)*  
- **7.2** Fatture / pagamenti  
- **7.3** Add-on *(presenze, integrazioni, AI planner)*

---

### B) MANAGER (operativo, pianificazione)

#### Sidebar Manager

##### Dashboard Operativa
- **1.1** Oggi/Domani: chi lavora, assenti, ritardi  
- **1.2** Richieste da approvare  
- **1.3** Scoperture e criticità  
- **1.4** Violazioni regole *(riposi, ore)*

##### Planner Turni
- **2.1** Vista settimana / mese  
- **2.2** Drag & drop turni  
- **2.3** Filtri: sede, reparto, ruolo/skill, stato *(bozza/pubblicato)*  
- **2.4** Azioni rapide:
  - crea turno  
  - assegna dipendente  
  - duplica  
  - sposta  
  - cancella  
  - pubblica periodo

##### Copertura (Fabbisogno)
- **3.1** Definisci fabbisogno per fascia oraria *(sede + reparto)*  
- **3.2** Heatmap scoperture / overstaff  
- **3.3** Requisiti skill minimi *(es. 1 barista)*  
- **3.4** Suggerimenti assegnazione *(anche senza AI)*

##### Dipendenti
- **4.1** Lista dipendenti *(filtri per skill/sede/reparto/stato)*  
- **4.2** Profilo dipendente:
  - anagrafica  
  - sedi/reparti abilitati  
  - skill/ruoli  
  - contratto & monte ore  
  - disponibilità *(ricorrente + eccezioni)*  
  - storico turni / assenze  
- **4.3** Import / creazione utente *(se permesso)*

##### Richieste (Ferie/Permessi/Malattia)
- **5.1** Inbox richieste pendenti  
- **5.2** Calendario assenze team  
- **5.3** Approva / rifiuta con commento  
- **5.4** Inserimento manuale assenza  
- **5.5** Allegati *(certificato)*

##### Scambi Turno
- **6.1** Richieste scambio in arrivo  
- **6.2** Validazione regole *(auto) + approvazione*  
- **6.3** Bacheca turni “da coprire” *(chi lo prende)*

##### Presenze
- **7.1** Oggi: check-in/out, assenti, ritardi  
- **7.2** Correzioni ore *(approva)*  
- **7.3** Straordinari *(approva)*

##### Report & Export
- **8.1** Ore pianificate vs consuntivate  
- **8.2** Straordinari  
- **8.3** Assenze  
- **8.4** Export payroll *(CSV/Excel/PDF)*

##### Comunicazioni
- **9.1** Bacheca annunci *(per sede/reparto)*  
- **9.2** Conferma lettura turni *(opzionale)*  
- **9.3** Messaggi su cambi turno

---

### C) SUPERVISOR / CAPO TURNO (limitato ma potente)

#### Sidebar Supervisor

##### Oggi
- **1.1** Team in turno + note operative  
- **1.2** Assenti / ritardi

##### Presenze
- **2.1** Segna presente/assente  
- **2.2** Segnala ritardo / note

##### Turni *(sola lettura o limit editing)*
- **3.1** Vista settimana reparto

##### Scambi Last Minute
- **4.1** Proposta sostituzioni → manager

---

### D) DIPENDENTE (mobile-first)

#### Sidebar Dipendente

##### I Miei Turni
- **1.1** Calendario personale *(settimana/mese)*  
- **1.2** Dettaglio turno *(sede, reparto, ruolo, note)*  
- **1.3** Aggiungi a calendario *(ICS)*  
- **1.4** Notifiche modifiche turno  
- **1.5** “Confermo lettura” / “Confermo presenza” *(se attivo)*

##### Disponibilità
- **2.1** Disponibilità ricorrente *(settimana tipo)*  
- **2.2** Eccezioni *(date specifiche)*  
- **2.3** Preferenze *(no notti, preferisco mattina)*

##### Richieste
- **3.1** Nuova richiesta ferie  
- **3.2** Nuovo permesso *(ore/giorno)*  
- **3.3** Malattia *(segnalazione + allegato)*  
- **3.4** Stato richieste + storico

##### Scambi Turno
- **4.1** Proponi scambio *(scegli collega)*  
- **4.2** Metti turno in bacheca  
- **4.3** Accetta / rifiuta scambio  
- **4.4** Storico

##### Presenze
- **5.1** Check-in/out  
- **5.2** Le mie ore *(consuntivo)*  
- **5.3** Segnala errore ore *(ticket)*

##### Profilo & Impostazioni
- **6.1** Dati personali  
- **6.2** Preferenze notifiche  
- **6.3** Privacy / export dati

---

## 4) Schermate “core” (quelle che definiscono il prodotto)

> **Core screens:** quelle che “vendono” il prodotto e concentrano valore operativo.

### 4.1 Planner Turni (il cuore)
- Timeline settimana/mese  
- Drag & drop  
- Stato: bozza / pubblicato  
- Conflitti evidenziati live  
- Drawer dettaglio turno

### 4.2 Employee Directory + Profilo Dipendente
- Skill, sedi, disponibilità, contratto, storico

### 4.3 Requests Inbox
- Lista pendenti + calendario assenze team

### 4.4 Coverage / Fabbisogno
- Grafico/heatmap + alert scoperture

### 4.5 Time & Attendance
- Presenze giornaliere + correzioni + straordinari

### 4.6 Report Center
- Filtri + export + template payroll

---

## 5) Flow principali (da disegnare in UX, 1 per riga)

### 5.1 Manager

- **Crea piano turni:** definisci fabbisogno → usa template → assegna → risolvi conflitti → salva bozza → pubblica → notifica  
- **Gestisci richiesta ferie:** ricevi richiesta → verifica copertura → approva/rifiuta → aggiorna calendario assenze → notifica  
- **Gestisci malattia last minute:** segnalazione → marca assenza → trova sostituto *(bacheca/scambio)* → aggiorna turni → notifica  
- **Scambio turno:** proposta dipendente → validazione regole → approvazione → swap effettivo → audit log  
- **Consuntivo/paghe:** chiudi periodo → verifica ore e straordinari → approva correzioni → export payroll  

### 5.2 Dipendente

- **Imposta disponibilità:** settimana tipo → eccezioni → preferenze  
- **Richiedi ferie:** range date → note → invio → tracking stato  
- **Check-in/out:** timbra → eventuale segnalazione errore  

---

## 6) Dipendenze tra moduli (per capire l’ordine “logico”)

> **Scopo:** definire l’ordine di sviluppo (MVP → Pro) e le dipendenze funzionali.

- **Scheduling** dipende da: **Company Setup** + **People** + **Policy & Rules**  
- **Requests** dipende da: **People** + **Scheduling** *(impatti su copertura)*  
- **Exchange** dipende da: **Scheduling** + **Rules**  
- **Attendance** dipende da: **Scheduling** *(+ opzionale HR policy)*  
- **Reporting** dipende da: **Scheduling** + **Requests** + **Attendance**  
- **Integrations** dipende da: **Calendari/Export** + **Audit** *(affidabilità e tracciabilità)*  
