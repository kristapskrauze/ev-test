# Testēšanas scenāriji — “Rezultātu pārskati”
(eVeselība > Laboratorisko izmeklējumu rezultāti > Rezultātu pārskati)

## Priekšnosacījumi
- Lietotājs autorizējas portālā kā **Iedzīvotājs**.
- Sistēmā ir pieejami vismaz daži pārskati ar atšķirīgiem:
  - **Laboratorija**: piem., “E. Gulbja laboratorija”, “CENTRĀLĀ LABORATORIJA, SIA”, “NMS laboratorija” u.c.
  - **Datumi**: vairākās dienās (lai var pārbaudīt datumu intervālu).
- Testa datu drošība: ja jāpievieno personas dati, **aizstāt ar mainīgajiem** (piem., `CYPRESS_PK`, `CYPRESS_USER`, `CYPRESS_PASS`).

---

## Scenārijs 1 — Filtrēšana pēc lauka “Laboratorija”
**Mērķis:** Pārbaudīt, ka meklēšana pēc laboratorijas nosaukuma (jebkura pilna/daļēja sakritība) atgriež tikai atbilstošus ierakstus.

**Soļi:**
1. Atvērt sadaļu **Rezultātu pārskati**.
2. Ievadīt laukā **Laboratorija** tekstu, piem.: `gulbja`.
3. Nospiež **Atlasīt** (vai Enter).
4. Novērot atgrieztos ierakstus.

**Sagaidāmais rezultāts:**
- Sarakstā redzami tikai tie pārskati, kuru **Laboratorija** satur “Gulbja” (case insesitive).
- Netiek parādīti pārskati no citām laboratorijām.
- Poga **Notīrīt** atgriež pilnu sarakstu.

**Papildu gadījumi:**
- Tukša ievade -> atgriež pilnu sarakstu.
- Ievade ar mazajiem/lielajiem burtiem -> rezultāts nemainās.
- Ievade ar papildus atstarpēm sākumā/beigās -> rezultāts nemainās.

---

## Scenārijs 2 — Filtrēšana pēc datumu laukiem
**Mērķis:** Pārbaudīt, ka meklēšana pēc perioda **No/Līdz** strādā **inclusive** (beigu vērtība tiek iekļauta).

**Soļi:**
1. Atvērt sadaļu **Rezultātu pārskati**.
2. Laukā **Datumu periods** ievadīt `No`: `01.10.2025`, `Līdz`: `03.10.2025`.
3. Nospiež **Atlasīt** (vai Enter).
4. Novērot atgrieztos ierakstus.

**Sagaidāmais rezultāts:**
- Sarakstā redzami tikai tie pārskati, kuru datums ir **no 01.10.2025 līdz 03.10.2025 (ieskaitot)**.
- Datumi ārpus intervāla netiek parādīti.
- **Notīrīt** atjauno pilnu sarakstu.

**Papildu gadījumi:**
- Ievadīts tikai `No` vai tikai `Līdz` -> filtrs attiecīgi pielieto apakšējo/augšējo robežu.
- Nekorekta forma (piem., `1.10.25`) -> validācija / nestrādā, līdz nav korekts `dd.mm.gggg`.

---

## Piezīmes
- Ja saskarne satur arī **statusa čipus** un **daudzkārtējo jomu izvēli**, tie neietilpst pamatprasībās(1,2), bet tos var izmantot **papildu** testos.
- Automatizācijai (Cypress) izmantot `data-testid` selectorus:
  - `filter-laboratorija`, `filter-date-no`, `filter-date-lidz`, `filter-submit`, `filter-reset`,
  - rezultātu rindām: `results-row`, laboratorijas šūnai: `cell-lab`.
