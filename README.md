# Cambridge English: Advanced (CAE) — Unit 1: Happiness & Success
### Interactive Digital Presentation & Workbook Web Application

A state-of-the-art interactive web presentation and digital workbook converting the 5 textbook pages (Pages 14–18) into a modern classroom slide deck and self-study platform.

---

## Key Features

### 1. Dual Mode System
- **Classroom Presentation Mode**:
  - Fullscreen slide deck (15 dedicated slides).
  - Smooth slide transitions, navigation dock, slide drawer, and keyboard controls.
  - Interactive click-to-reveal answers, auto-grading, and hint tooltips.
- **Interactive Digital Workbook Mode**:
  - Continuous vertical layout mirroring the textbook's structure.
  - Interactive inputs, inline audio controls, and real-time exercise feedback.

### 2. Teacher / Presenter Controls
- **Teacher Answer Key (`K` shortcut)**: Toggle one-click reveal of all correct answers, grammar rules, and model responses.
- **Cambridge Speaking Countdown Timer (`T` shortcut)**:
  - 1-minute (Candidate Part 2 turn) and 2-minute (Collaborative) presets.
  - Animated SVG circular progress ring with audio warning and buzzer.
- **Synthesized Audio Engine**:
  - Native browser **Web Speech API** text-to-speech for all 5 listening speakers, the Google news broadcast, useful phrases, and reading article passages.
  - **Web Audio API** synthesized sound effects (correct answer chime, incorrect boop, timer alert).

### 3. Complete Curriculum Coverage (Pages 14–18)
- **Page 14: Listening & Speaking**:
  - Part 4 Multiple Matching: Warmup prompt, Strategy Point, 5 speaker extracts, Task 1 (Professions A–H) and Task 2 (Topics A–H) with auto-checker and auditory clues.
  - Part 2 Sentence Completion: Radio news report about Google, 8 gap-fill sentences with live validation, hints, and discussion prompts.
- **Page 15: Speaking & Everyday English**:
  - Part 2 Photo Compare & Speculate: 3 Achievement photos and 3 Celebration photos with high-resolution visual cards.
  - Useful Language Bank: 14 phrases for comparing and speculating with click-to-listen pronunciation.
  - Interactive Speech Constructor: Build candidate responses using sentence starters.
  - Everyday English: Responding to News with 5 interactive dialogue scenarios (*Typical!*, *Alright for some.*, *Poor you!*, *Good for her.*, *Lucky you.*).
- **Pages 16 & 17: Reading (Life's good! Why do we feel so bad?)**:
  - Full 9-paragraph article reader with line references (ll. 1–86).
  - Interactive vocabulary explorer: Click highlighted words (*beaming*, *incivility*, *ingrates*, *affluent*, *elimination*, *massively*, *prosaic*) for instant definition cards.
  - 7 Cambridge Exam Multiple Choice questions with immediate scoring and distractor explanations.
  - Synonyms for "miserable" reveal cards and interactive Class Happiness Survey widget.
- **Page 18: Use of English (Gerunds & Infinitives)**:
  - Ex 1: Sentence rewriting with gerund subjects.
  - Ex 2: 14 Dependent Prepositions with gerund collocations.
  - Ex 3: Phrasal verbs matching & rewriting (*take up*, *give up*, *block out*, *count on*, *make up for*, *run through*).
  - Ex 4: 8 Cambridge verb complementation exam sentences.
  - Ex 5: "To Success" 6 Golden Rules manifesto.
- **Slide 15: Mastery Dashboard**:
  - Skill score breakdown (Listening, Speaking, Reading, Use of English).
  - Printable Certificate of Achievement.

---

## How to Run

### Direct Browser Opening:
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Local Web Server:
The server is currently running at:
```
http://localhost:8080/index.html
```
Or start one anytime with:
```powershell
python -m http.server 8080
```

---

## Academic Design System (Cambridge University Press Standard)

- **Typography**: 
  - `Lora`: Prestigious editorial serif used for academic headlines, article text, and quotes.
  - `Plus Jakarta Sans`: Modern, legible typeface for UI labels, instructions, and interactive options.
  - `JetBrains Mono`: Clean monospace for line numbers, page tags, and exam keys.
- **Palette**:
  - Oxford Navy (`#0a2540`): Primary university brand color.
  - Cambridge Crimson (`#a6192e`): Headings accent, exam callouts, line references.
  - University Gold (`#c59b27`): Academic crest and highlights.
  - Textbook Amber (`#d97706`): Authentic exercise badge numbers.
  - Warm Cream (`#fdfcf6`): Cambridge Strategy Point callout boxes.
  - Editorial Paper (`#ffffff` / `#f8fafc`): Crisp, high-contrast readable canvases.
- **Purity & Polish**:
  - Light mode default for maximum readability and authentic print fidelity.
  - 100% emoji-free typography.
  - No synthetic AI tropes (no glowing neon gradients, no blurry radial background blobs, no floating translucent pill docks).
  - Grounded bottom presenter dock with dedicated page counters and navigation.
---

## Keyboard Shortcuts
- `→` / `Space` / `Page Down`: Next Slide
- `←` / `Page Up`: Previous Slide
- `F`: Toggle Fullscreen Presentation
- `K`: Toggle Teacher Answer Key Mode (ON/OFF)
- `T`: Open Speaking Exam Countdown Timer
