# Rezultātu pārskati — tehniskais risinājums (Uzdevums I & II)

[![CI](https://github.com/kristapskrauze/ev-test/actions/workflows/ci.yml/badge.svg)](https://github.com/kristapskrauze/ev-test/actions/workflows/ci.yml)
[![Image – GHCR](https://img.shields.io/badge/image-ghcr.io%2Fkristapskrauze%2Fev--test-blue)](#-docker-image)

Šis repo demonstrē, kā bez piekļuves produkcijas sistēmai uzbūvēt **reālistisku, reproducējamu** vidi uzdevumam:

* **I daļa:** 2 testēšanas scenāriji dokumentā
  → *`Test-Scenariji-Rezultatu-Parskati.md`*
* **II daļa:** automatizēti **Cypress** testi pret “dummy” lapu
  → *`cypress/e2e/*.cy.js`*
* **CI/CD:** GitHub Actions + Docker (GHCR)

---

## 🤔 Domāšanas gaita & pieeja

**Kāpēc “dummy” lapa, nevis produkcija?**

* **Drošība un PII:** uzdevums prasa autentificēšanos kā *Iedzīvotājs*, bet bez oficiālas testa vides tas nozīmētu sensitīvu datu ievade, vai kāda tokena pievienošana ar leilu expiry date. Tāpēc UX un filtrēšanas loģika tika **precīzi atdarināta lokāli**, neapstrādājot PII.
* **Stabilitāte:** es uzsaktu, ka interviju uzdevumiem/testiem jābūt reproducējamiem (bez ārējo servisu/SSO vai DOM izmaiņu ietekmes).
* **Mērķtiecība:** uzdevuma būtība ir **meklēšanas funkcionalitāte** (pēc “Laboratorija” un **datumiem**). “Dummy” lapa ļauj to tīri un pārskatāmi pārbaudīt.

**Ko es atveidoju:**

* Lapas skelets un filtru lauki (Laboratorija, Datums No/Līdz, papildus joma/ statuss).
* **Custom multi-select** jomu izvēlnei (native `<select multiple>` neatdarināja “dropdown” pieredzi).
* **Piekļūstamība** minimums: tastatūras atbalsts, `aria-*`, `aria-pressed`, Esc/ArrowKey navigācija.
* Semantiski **`data-testid`** selektori Cypress testiem.

**Ko parādu ar šo risinājumu:**

* Darbs ar **testēšanas scenārijiem** (prasības → testu soļi → sagaidāmie rezultāti).
* **E2E automatizācija** (Cypress) + **CI/CD** prakse (GitHub Actions, Docker, GHCR).
* Apzināti **nebalstos uz real-time auth** 

---

## 🧪 Testēšanas scenāriji (I daļa)

Dokuments: **`Test-Scenariji-Rezultatu-Parskati.md`**

1. **Filtrēšana pēc “Laboratorija”**
2. **Filtrēšana pēc datumiem (No/Līdz, iekļaujot)**

---

## 🤖 Cypress testi (II daļa)

Speci (katrs atsevišķā failā):

* **Minimālie filtri (prasītie):**
  `rezultatu-parskati.cy.js`
* **Statusa čipi (multi-select):**
  `rezultatu-parskati.status.cy.js`
* **Jomu multi-select dropdown:**
  `rezultatu-parskati.areas.cy.js`
* **Kombinētie filtri:**
  `rezultatu-parskati.combined.cy.js`
* **Tastatūra/a11y (Space/Enter/Esc/Arrow):**
  `rezultatu-parskati.a11y.cy.js`
* **Reset & empty state:**
  `rezultatu-parskati.reset-empty.cy.js`
* **Laboratorijas meklēšana (case-insentitive/atstarpes):**
  `rezultatu-parskati.lab-misc.cy.js`

**Selektoru stratēģija:** `data-testid` (piem., `filter-laboratorija`, `filter-date-no`, `filter-submit`, `results-row`, `cell-lab`) – stabila un skaidra pieeja. Reālajā sistēmā ieteiktu pievienot līdzīgus test-id (ar feature flag) vai pielāgot PageObjects esošajam DOM.

---

## ▶️ Palaišana lokāli

```bash
# serveris
npx http-server . -p 4173 -a 127.0.0.1 -c-1
# un tad atver: http://127.0.0.1:4173/index.html

# Cypress (GUI)
npx cypress open

# Headless
npx cypress run
```

> `index.html` ir repo saknē. Serveris bindots uz `127.0.0.1`, lai izvairītos no macOS network promptiem.

---

## 🐳 Docker & Docker Compose

**Vienkāršs web konteiners (nginx):**

```bash
docker build -t ev-test .
docker run --rm -p 8080:80 ev-test
# http://localhost:8080/index.html
```

**docker-compose (web + e2e ar cypress/included):**

```bash
docker compose up --build -d web
docker compose run --rm e2e
```

---

## 🔁 CI/CD (GitHub Actions + GHCR)

Workflow: `.github/workflows/ci.yml`

* **e2e job:** instalē node deps, startē lokālu serveri, palaiž Cypress.
* **docker job:** būvē un **publicē** image uz **GHCR** kā
  `ghcr.io/kristapskrauze/ev-test:latest` (+ `:sha`).

---

## 🗂️ Struktūra

```
.
├── index.html
├── Test-Scenariji-Rezultatu-Parskati.md
├── cypress
│   └── e2e
│       ├── rezultatu-parskati.cy.js
│       ├── rezultatu-parskati.status.cy.js
│       ├── rezultatu-parskati.areas.cy.js
│       ├── rezultatu-parskati.combined.cy.js
│       ├── rezultatu-parskati.a11y.cy.js
│       ├── rezultatu-parskati.reset-empty.cy.js
│       └── rezultatu-parskati.lab-misc.cy.js
├── dockerfile
├── docker-compose.yml
└── .github/workflows/ci.yml
```

---

## ⚠️ Ierobežojumi

* Šis ir **mock** – neatspoguļo reālus datus, netiek veikta autentifikācija.
* Testi validē **filtrēšanas uzvedību un selektorus**.
* Reālajā sistēmā var atšķirties statusu/jomu saraksti un datu formāti.

---

## ✅ Kopsavilkums

* I & II daļas izpildītas pilnībā (scenāriji + automatizācija).
* Demonstrēta **droša, reproducējama** testēšanas pieeja bez piekļuves testa videi.
* Nodrošināts **CI/CD** (Cypress + Docker/ GHCR), kas atspoguļo manas iemaņas CI/CD ārpus min prasībām.
