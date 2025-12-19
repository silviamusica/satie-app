# 📋 Piano di Riorganizzazione App Satie

## 🎯 Obiettivo
Trasformare la struttura dell'app da 7 sezioni vecchie a 7 sezioni nuove, riutilizzando i contenuti esistenti.

---

## 📊 Mappatura Vecchie → Nuove Sezioni

### ✅ SEZIONI GIÀ COMPLETATE

#### 1. **Benvenuto** (NUOVA - COMPLETA ✅)
- Hero con titolo
- Panoramica "Cosa scoprirai" con 6 card cliccabili
- "Perché questo brano?"
- CTA "Inizia il viaggio"

#### 2. **Parigi 1888** (NUOVA - COMPLETA ✅)
- La Belle Époque
- Montmartre (Chat Noir, Auberge du Clou)
- Il clima artistico: Simbolismo
- Contrasto con Wagner

#### 3. **Erik Satie** (NUOVA - COMPLETA ✅)
- Il giovane ribelle
- Il pianista di Montmartre
- Timeline biografica espandibile (1866-1925)
- Curiosità e carattere

---

## 🔄 CONTENUTI DA RIORGANIZZARE

### 📦 Vecchie Sezioni e loro Contenuti

#### **IndiceSection**
- ❌ **ELIMINA**: Non serve più, sostituita da BenvenutoSection
- Il vecchio array `indiceBlocks` può essere eliminato

---

#### **IntroduzioneSection**
**Contenuti disponibili:**
- Timeline dettagliata vita di Satie (1866-1925) con immagini contestuali
- Modal biografico completo
- Curiosità su Satie

**Dove andranno:**
- ✅ **GIÀ UTILIZZATO** in `SatieSection` - la timeline è già presente!

---

#### **AnalysisSection**
**Contenuti disponibili:**
- `analysisCards` (linea 374) - analisi operativa (tempo, suono, pedale)
- Immagini tecniche (spartito annotato, posizione mani)
- **Box "Curiosità per intenditori":**
  - Il segreto armonico: la nota Fa#
  - "Esoterik Satie" e ossessione per numero 3
  - Gymnopédies vs Gnossiennes

**Dove andranno:**
- ➡️ **Sezione "Il Brano"** (in costruzione)
  - Analisi operativa → sottosezione "Come suonarlo"
  - Curiosità Fa# → sottosezione "Linguaggio musicale"
  - Gymnopédies vs Gnossiennes → sottosezione "Nascita/Contesto"

---

#### **InterpretersSection**
**Contenuti disponibili:**
- Piano solo:
  - Khatia Buniatishvili (YouTube)
  - Aldo Ciccolini (YouTube)
- Orchestrazioni Debussy:
  - Versione classica
  - hr-Sinfonieorchester

**Dove andranno:**
- ➡️ **Sezione "Eredità"** (in costruzione)
  - Sottosezione "I contemporanei" → Orchestrazioni Debussy
  - Sottosezione "Eredi del Novecento" → Link agli interpreti moderni
- ➡️ **Sezione "Fonti"** → Ascolti consigliati

---

#### **GlossarySection**
**Contenuti disponibili:**
- `glossaryData` (presumibilmente prima della riga 2456)
- Categorie: Tecnica, Contesto, Estetica
- Immagini: diteggiatura, accordi settima, mappa Montmartre, Puvis de Chavannes

**Dove andranno:**
- ➡️ **Sezione "Impara"** (già esiste, da riorganizzare)
  - Mantenere come sottosezione "Glossario completo"
  - Integrare con quiz interattivo esistente

---

## 🔨 PIANO DI IMPLEMENTAZIONE

### **FASE 1: Implementare "Il Brano"** 📝

**Struttura proposta:**

```
Il Brano
├── 1. La Nascita (1888)
│   ├── Contesto compositivo
│   ├── Primo ascolto al Chat Noir
│   ├── Pubblicazione
│   └── Gymnopédies vs Gnossiennes (da AnalysisSection)
│
├── 2. Linguaggio Musicale
│   ├── Forma e struttura (A-B-A)
│   ├── Il segreto del Fa# (da AnalysisSection - curiosità)
│   ├── Armonie sospese (settime maggiori)
│   ├── Ritmo ostinato
│   └── "Lent et douloureux"
│
└── 3. Come Suonarlo
    ├── Analisi operativa (da analysisCards)
    ├── Tempo e rubato
    ├── Uso del pedale
    ├── Diteggiatura e tecnica
    └── Immagini tecniche (spartito annotato, posizione mani)
```

**Contenuti da recuperare:**
- ✅ `analysisCards` (linea 374)
- ✅ Box "Il segreto armonico: Fa#" da AnalysisSection
- ✅ Box "Gymnopédies vs Gnossiennes" da AnalysisSection
- ✅ Immagini tecniche da AnalysisSection

---

### **FASE 2: Implementare "Eredità"** 🌟

**Struttura proposta:**

```
Eredità
├── 1. I Contemporanei (1890-1925)
│   ├── Debussy orchestra le Gymnopédies (1896-1897)
│   ├── Ravel e gli impressionisti
│   └── Link orchestrazioni Debussy (da InterpretersSection)
│
├── 2. Eredi del Novecento
│   ├── John Cage e la musica aleatoria
│   ├── Minimalismo (Glass, Reich)
│   ├── Ambient music (Brian Eno)
│   └── Interpreti moderni (da InterpretersSection)
│
└── 3. Cultura Pop
    ├── Cinema e TV
    ├── Pubblicità
    └── Videogiochi
```

**Contenuti da recuperare:**
- ✅ `interpretersData` da InterpretersSection
- 📝 Nuovi contenuti da scrivere (minimalismo, ambient, cultura pop)

---

### **FASE 3: Riorganizzare "Impara"** 🎓

**Struttura attuale da verificare:**
- Quiz interattivo (già presente)
- Glossario (da GlossarySection)

**Azione:**
- ✅ Mantenere quiz esistente
- ✅ Integrare GlossarySection come sottosezione
- ✅ Aggiungere risorse per approfondire

---

### **FASE 4: Riorganizzare "Fonti"** 📚

**Struttura attuale da verificare:**
- `sourcesData` (spartiti, registrazioni, approfondimenti)

**Azione:**
- ✅ Mantenere struttura esistente
- ✅ Aggiungere link da InterpretersSection (ascolti consigliati)
- ✅ Aggiungere riferimenti bibliografici

---

### **FASE 5: Pulizia** 🧹

**Da eliminare:**
- ❌ `IndiceSection` (sostituita da Benvenuto)
- ❌ `IntroduzioneSection` (contenuti già in Satie)
- ❌ `AnalysisSection` (contenuti redistribuiti in Brano)
- ❌ `InterpretersSection` (contenuti redistribuiti in Eredità/Fonti)
- ❌ `GlossarySection` (spostato in Impara)
- ❌ Array `indiceBlocks` (non più necessario)

---

## ✅ CHECKLIST FINALE

- [ ] Implementare BranoSection completa
- [ ] Implementare EreditaSection completa
- [ ] Verificare ImparaSection integra GlossarySection
- [ ] Verificare FontiSection integra interpretersData
- [ ] Eliminare vecchie sezioni
- [ ] Testare navigazione completa
- [ ] Verificare tutte le immagini siano presenti
- [ ] Verificare tutti i link funzionino

---

## 📝 Note Importanti

1. **Timeline Satie**: Già presente in `SatieSection`, non serve duplicarla
2. **Curiosità "Esoterik Satie"**: Già presente in `SatieSection` (da verificare)
3. **analysisCards**: Trovare esatta posizione nel file (linea 374)
4. **glossaryData**: Trovare esatta posizione nel file (prima di linea 2456)
5. **sourcesData**: Già utilizzato in FontiSection (verificare completezza)

---

## 🎯 Prossimo Step Immediato

**Iniziare con FASE 1: Implementare "Il Brano"**
- Leggere `analysisCards` (linea 374)
- Leggere box curiosità da AnalysisSection (linee 2188-2248)
- Scrivere BranoSection completa riutilizzando questi contenuti
