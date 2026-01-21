# Project Maps — Canonical Docs (Priority Order)

Questa cartella contiene la SPEC ufficiale del prodotto: è la source of truth.
Priorità 1: product_map.md — visione, confini e obiettivi del prodotto.
Priorità 2: feature_map.md — elenco feature e dove devono vivere nel prodotto.
Priorità 3: site_map.md — sitemap/navigazione, pagine e percorsi utente.
Priorità 4: rbac_schema.md — modello RBAC + scope (company/location/department/self) e regole di valutazione.
Priorità 5: action_permission_map.md — permessi atomici per azione (es. shift.publish, request.approve).
Priorità 6: route_permission_map.md — protezione di route/UI e mapping route → permission/scope.
In caso di conflitto: RBAC/permessi seguono rbac_schema.md; navigazione segue site_map.md; feature seguono feature_map.md.
Se una nuova feature/route/permesso non è mappata qui, aggiorna prima questi file o proponi l’update insieme all’implementazione.
