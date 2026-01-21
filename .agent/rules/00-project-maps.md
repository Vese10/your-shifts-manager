---
trigger: always_on
---

# Always-on Project Maps (source of truth)

Questi file in /project_maps sono la “spec” canonica del prodotto.
ENTRY POINT: leggi sempre prima docs/project_maps/README.md (priorità e regole di conflitto).

## Quando devi consultarli

Quando implementi nuove feature, refactor, nuove route, API, ruoli o permessi, DEVI consultare le mappe.

## Documenti canonici

- docs/project_maps/README.md (priorità e regole)
- docs/project_maps/product_map.md
- docs/project_maps/feature_map.md
- docs/project_maps/site_map.md
- docs/project_maps/rbac_schema.md
- docs/project_maps/action_permission_map.md
- docs/project_maps/route_permission_map.md

## Regola generale

1. Prima di proporre modifiche architetturali/di dominio, verifica se la feature è già prevista e dove “vive” nella mappa.
2. Ogni modifica che tocca autorizzazioni DEVE essere coerente con rbac_schema.md + action_permission_map.md + route_permission_map.md.
3. Se la richiesta è in conflitto con le mappe: evidenzia il conflitto e proponi (A) update delle mappe oppure (B) implementazione compatibile.

## Output atteso quando lavori su feature/permessi

Includi sempre:

- Impatto su sitemap (UI/route)
- Permessi/azioni coinvolte (nuove o riuso)
- Ruoli e scope (company/location/department/self)
- Eventuali aggiornamenti necessari ai file in /docs/project_maps

## Eccezioni (per non sprecare contesto)

Per fix piccoli (UI/copy/CSS) puoi consultare solo i doc pertinenti (spesso site_map.md) o nessuno se puro styling.
