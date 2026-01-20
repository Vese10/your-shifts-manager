# Workforce Scheduling Platform — Feature Map (LLM-Optimized)

> **Scope:** elenco funzionalità e requisiti per una piattaforma di gestione turni (multi-azienda / multi-sede), organizzati per **concetti trasversali** e per **ruolo**.

## Table of Contents
- [0. Concetti trasversali (valgono per tutti)](#0-concetti-trasversali-valgono-per-tutti)
  - [0.1 Account & Sicurezza](#01-account--sicurezza)
  - [0.2 Notifiche](#02-notifiche)
  - [0.3 Calendari & Export](#03-calendari--export)
  - [0.4 Motore regole & conflitti (core)](#04-motore-regole--conflitti-core)
  - [0.5 Storico & Audit](#05-storico--audit)
  - [0.6 Multi-azienda / Multi-sede / Multi-reparto](#06-multi-azienda--multi-sede--multi-reparto)
- [1. Ruolo: OWNER / ADMIN (super-admin aziendale)](#1-ruolo-owner--admin-super-admin-aziendale)
- [2. Ruolo: MANAGER (pianificazione e gestione operativa)](#2-ruolo-manager-pianificazione-e-gestione-operativa)
- [3. Ruolo: SUPERVISOR / CAPO TURNO (opzionale)](#3-ruolo-supervisor--capo-turno-opzionale)
- [4. Ruolo: DIPENDENTE (mobile-first)](#4-ruolo-dipendente-mobile-first)
- [5. Funzionalità Enterprise / Pro (estensioni)](#5-funzionalità-enterprise--pro-estensioni)

---

## 0. Concetti trasversali (valgono per tutti)

### 0.1 Account & Sicurezza

- **0.1.1** Login / Sign-up / Invito  
- **0.1.2** Recupero password / cambio password  
- **0.1.3** 2FA (TOTP / Email OTP)  
- **0.1.4** Sessioni / dispositivi / logout remoto  
- **0.1.5** SSO (Google/Microsoft) *(extra enterprise)*  

### 0.2 Notifiche

- **0.2.1** Canali: email / push (PWA) / SMS / WhatsApp / Telegram *(configurabili)*  
- **0.2.2** Centro notifiche in-app  
- **0.2.3** Preferenze notifiche per evento  
- **0.2.4** Reminder automatici  
  - inizio turno  
  - scadenza richieste  
  - turni pubblicati  

### 0.3 Calendari & Export

- **0.3.1** Feed calendario personale (ICS)  
- **0.3.2** Sync Google Calendar / Apple Calendar *(via ICS o OAuth)*  
- **0.3.3** Export CSV / XLSX / PDF *(dove applicabile)*  

### 0.4 Motore regole & conflitti (core)

> **Obiettivo:** validazione in tempo reale + risoluzione guidata dei conflitti.

- **0.4.1** Overlap turni  
- **0.4.2** Riposo minimo tra turni  
- **0.4.3** Limite ore giornaliere / settimanali / mensili  
- **0.4.4** Vincoli contrattuali *(part-time, full-time, apprendistato, ecc.)*  
- **0.4.5** Vincoli skill/ruolo *(es. “serve 1 barista”)*  
- **0.4.6** Vincoli sede/reparto  
- **0.4.7** Warning vs blocco *(configurabile)*  
- **0.4.8** Log di conflitti risolti / ignorati  

### 0.5 Storico & Audit

- **0.5.1** Log modifiche su turni/richieste *(chi, cosa, quando)*  
- **0.5.2** Versioning turni *(prima/dopo)*  
- **0.5.3** Commenti e note interne *(thread)*  

### 0.6 Multi-azienda / Multi-sede / Multi-reparto

- **0.6.1** Company (tenant)  
- **0.6.2** Sedi (Location)  
- **0.6.3** Reparti (Department)  
- **0.6.4** Dipendenti assegnati a sede primaria + sedi secondarie  
- **0.6.5** Visibilità e permessi per sede/reparto  

---

## 1. Ruolo: OWNER / ADMIN (super-admin aziendale)

### 1.1 Setup azienda

- **1.1.1** Dati azienda *(nome, logo, timezone, lingua)*  
- **1.1.2** Sedi (CRUD) + indirizzi  
- **1.1.3** Reparti per sede (CRUD)  
- **1.1.4** Orari di apertura per sede *(regole stagionali/periodi speciali)*  
- **1.1.5** Festività aziendali / chiusure eccezionali  

### 1.2 Gestione utenti & permessi

- **1.2.1** Invita utenti *(email link)*  
- **1.2.2** Ruoli: Owner/Admin, Manager, Supervisor, Employee  
- **1.2.3** Gruppi permessi (RBAC) personalizzabili *(livello Pro)*  
- **1.2.4** Assegnazione utenti a sede/reparto  
- **1.2.5** Stato utente *(attivo, sospeso, terminato)*  
- **1.2.6** Import massivo dipendenti *(CSV)*  

### 1.3 Contratti, paghe e regole lavoro

- **1.3.1** Tipi contratto *(full/part/temp)* + regole  
- **1.3.2** Monte ore settimanale/mensile  
- **1.3.3** Straordinari *(soglie, maggiorazioni)*  
- **1.3.4** Pause *(obbligatorie, durata, policy)*  
- **1.3.5** Parametri ferie/permessi *(maturazione, residui, scadenze)*  
- **1.3.6** Policy malattia *(opzionale, “HR-heavy”)*  

### 1.4 Piani di copertura (fabbisogno)

- **1.4.1** Fabbisogno per fascia oraria *(per sede + reparto)*  
- **1.4.2** Requisiti minimi skill *(es. 1 senior + 1 cassa)*  
- **1.4.3** Alert automatici per scoperture  

### 1.5 Integrazioni & sistemi esterni

- **1.5.1** Calendari (Google/Microsoft) per sincronizzazione turni  
- **1.5.2** Payroll export *(formati personalizzati)*  
- **1.5.3** Webhook *(integrazione con altri gestionali)*  
- **1.5.4** API Key per integrazioni  

### 1.6 Amministrazione e controllo

- **1.6.1** Audit avanzato  
- **1.6.2** Backup/export dati *(GDPR)*  
- **1.6.3** Data retention / cancellazione account  
- **1.6.4** Billing *(se SaaS: piano, fatture, metodi pagamento)*  

---

## 2. Ruolo: MANAGER (pianificazione e gestione operativa)

### 2.1 Dashboard operativa

- **2.1.1** Turni oggi/domani + criticità  
- **2.1.2** Slot scoperti / overstaffing  
- **2.1.3** Richieste in attesa *(ferie/permessi/scambi)*  
- **2.1.4** Assenze oggi *(malattia, permessi)*  

### 2.2 Gestione dipendenti

- **2.2.1** Anagrafica dipendente *(contatti, note, emergenza)*  
- **2.2.2** Assegnazione sede/reparto  
- **2.2.3** Skill/ruoli del dipendente *(barista/cassa/cucina)*  
- **2.2.4** Disponibilità ricorrenti *(giorni/orari)*  
- **2.2.5** Eccezioni *(es. non disponibile il 24/01)*  
- **2.2.6** Documenti *(opzionale: certificati, contratti)*  

### 2.3 Pianificazione turni (cuore del prodotto)

- **2.3.1** Vista calendario *(settimanale/mensile)*  
- **2.3.2** Drag & drop turni  
- **2.3.3** Creazione turno singolo *(inizio/fine, sede, reparto, ruolo richiesto)*  
- **2.3.4** Turni multipli / batch *(es. crea 10 turni insieme)*  
- **2.3.5** Turni ricorrenti *(es. ogni lun/mer…)*  
- **2.3.6** Template turni *(mattina/pomeriggio/notte)*  
- **2.3.7** Settimana tipo *(clonazione)*  
- **2.3.8** Assegnazione manuale + auto-suggerimenti *(in base a disponibilità/skill)*  
- **2.3.9** Note turno *(brief, mansioni, obiettivi)*  
- **2.3.10** Stato turno: bozza / pubblicato / modificato  

### 2.4 Controllo conflitti & compliance

- **2.4.1** Evidenzia conflitti in realtime  
- **2.4.2** Risoluzione guidata *(suggerisci alternative)*  
- **2.4.3** Override con motivazione *(log)*  
- **2.4.4** Report violazioni regole *(ore, riposi, ecc.)*  

### 2.5 Gestione ferie / permessi / malattia

- **2.5.1** Calendario assenze team  
- **2.5.2** Approvazione richieste *(approva/rifiuta/commenta)*  
- **2.5.3** Inserimento manuale assenze *(backoffice)*  
- **2.5.4** Allegati *(es. certificato malattia)*  
- **2.5.5** Politiche: “non approvabile se crea scopertura critica”  

### 2.6 Scambio turni (workflow completo)

- **2.6.1** Dipendente propone scambio → manager notifica  
- **2.6.2** Validazione automatica regole  
- **2.6.3** Approvazione manager *(o auto-approvazione)*  
- **2.6.4** Storico scambi  

### 2.7 Pubblicazione & comunicazione

- **2.7.1** Pubblica turni per periodo *(settimana/mese)*  
- **2.7.2** Notifica “turni pubblicati”  
- **2.7.3** Notifica modifica turno *(con conferma lettura)*  
- **2.7.4** Bacheca comunicazioni *(messaggi a team/sede/reparto)*  

### 2.8 Presenze & consuntivazione

- **2.8.1** Conferma presenza *(manager)*  
- **2.8.2** Check-in/out dipendente (PWA) *(opzionale avanzato: geofence)*  
- **2.8.3** Ore pianificate vs ore effettive  
- **2.8.4** Gestione straordinari e approvazione  

### 2.9 Report

- **2.9.1** Ore per dipendente / sede / reparto  
- **2.9.2** Straordinari  
- **2.9.3** Assenze e tassi  
- **2.9.4** Copertura vs fabbisogno  
- **2.9.5** Export payroll *(CSV)*  

---

## 3. Ruolo: SUPERVISOR / CAPO TURNO (opzionale)

### 3.1 Vista turni della giornata

- **3.1.1** Chi c’è oggi / chi manca  
- **3.1.2** Task e note operative  

### 3.2 Presenze

- **3.2.1** Segna presente/assente  
- **3.2.2** Segnala ritardo  
- **3.2.3** Note a fine turno  

### 3.3 Richieste “micro”

- **3.3.1** Scambi last-minute *(proposta → manager)*  

---

## 4. Ruolo: DIPENDENTE (mobile-first)

### 4.1 I miei turni

- **4.1.1** Calendario personale  
- **4.1.2** Dettagli turno *(orario, sede, reparto, ruolo, note)*  
- **4.1.3** Aggiungi a calendario *(ICS)*  
- **4.1.4** Notifica modifiche turno  
- **4.1.5** Conferma lettura / conferma presenza *(se attivo)*  

### 4.2 Disponibilità

- **4.2.1** Disponibilità ricorrente *(settimana tipo)*  
- **4.2.2** Eccezioni *(date specifiche non disponibile)*  
- **4.2.3** Preferenze *(preferisco mattina / evito notte)*  

### 4.3 Richieste

- **4.3.1** Richiesta ferie *(range date, note)*  
- **4.3.2** Richiesta permesso *(ore/giorno)*  
- **4.3.3** Segnalazione malattia *(con allegato)*  
- **4.3.4** Stato richieste + storico  
- **4.3.5** Annulla richiesta *(se non ancora approvata)*  

### 4.4 Scambio turni

- **4.4.1** Proponi scambio con collega  
- **4.4.2** Offri turno “a bacheca” *(chi lo prende)*  
- **4.4.3** Accetta/rifiuta scambio  
- **4.4.4** Stato e storico scambi  

### 4.5 Presenze *(se abilitato)*

- **4.5.1** Check-in / Check-out  
- **4.5.2** Visualizza ore effettive  
- **4.5.3** Segnala errore ore *(ticket al manager)*  

### 4.6 Profilo

- **4.6.1** Dati personali  
- **4.6.2** Documenti caricati  
- **4.6.3** Preferenze notifiche  
- **4.6.4** Privacy / export dati  

---

## 5. Funzionalità Enterprise / Pro (estensioni)

### 5.1 AI & automazioni intelligenti

- **5.1.1** Autoplanning: compila turni in base a fabbisogno, skill, vincoli  
- **5.1.2** Suggerimenti sostituzioni automatiche in caso di malattia  
- **5.1.3** Previsione fabbisogno *(storico + stagionalità)*  

### 5.2 Integrazioni avanzate

- **5.2.1** Microsoft 365 / Google Workspace *(SSO + calendari)*  
- **5.2.2** Payroll provider-specific  
- **5.2.3** Integrazione timbratore / hardware  

### 5.3 Governance

- **5.3.1** Approvals multi-livello  
- **5.3.2** Ruoli custom per sede/reparto  
- **5.3.3** Audit compliance avanzato  
