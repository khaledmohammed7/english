/**
 * Cambridge English: Advanced - Unit 1: Happiness & Success
 * Interactive Presentation & Workbook Application Logic
 * (Light Mode Default • Clean Academic UI • Emoji-Free)
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS & SFX ENGINE (Web Audio API) ---
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.15); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    playIncorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }

    playBuzzer() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc.start(now + i * 0.08);
        osc.stop(now + 1.2);
      });
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  }

  // --- TEXT-TO-SPEECH CONTROLLER (Web Speech API) ---
  class SpeechController {
    constructor() {
      this.synth = window.speechSynthesis;
      this.voices = [];
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.initVoices();
    }

    initVoices() {
      if (!this.synth) return;
      const load = () => {
        this.voices = this.synth.getVoices();
      };
      load();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = load;
      }
    }

    speak(text, options = {}) {
      if (!this.synth) {
        alert("Text-to-Speech is not supported in this browser.");
        return;
      }
      this.stop();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;

      const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
      if (options.voiceIndex !== undefined && enVoices[options.voiceIndex]) {
        utterance.voice = enVoices[options.voiceIndex];
      } else if (enVoices.length > 0) {
        const ukVoice = enVoices.find(v => v.lang === 'en-GB' || v.name.includes('Natural') || v.name.includes('UK'));
        utterance.voice = ukVoice || enVoices[0];
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (options.onStart) options.onStart();
      };
      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    }

    stop() {
      if (this.synth && this.synth.speaking) {
        this.synth.cancel();
      }
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  // --- SPEAKING EXAM COUNTDOWN TIMER ---
  class ExamTimer {
    constructor(soundEngine) {
      this.sfx = soundEngine;
      this.duration = 60;
      this.timeLeft = 60;
      this.interval = null;
      this.isRunning = false;
      this.displayEl = document.getElementById('timer-display');
      this.circleEl = document.getElementById('timer-progress-ring');
      this.statusBadge = document.getElementById('timer-status');
    }

    setDuration(seconds) {
      this.reset();
      this.duration = seconds;
      this.timeLeft = seconds;
      this.updateDisplay();
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.sfx.playClick();
      if (this.statusBadge) {
        this.statusBadge.textContent = "Speaking Time Active";
        this.statusBadge.className = "timer-status active";
      }
      this.interval = setInterval(() => {
        this.timeLeft--;
        this.updateDisplay();

        if (this.timeLeft === 10) {
          this.sfx.playClick();
        }

        if (this.timeLeft <= 0) {
          this.pause();
          this.timeLeft = 0;
          this.updateDisplay();
          this.sfx.playBuzzer();
          if (this.statusBadge) {
            this.statusBadge.textContent = "Time Expired";
            this.statusBadge.className = "timer-status ended";
          }
        }
      }, 1000);
    }

    pause() {
      if (!this.isRunning) return;
      this.isRunning = false;
      clearInterval(this.interval);
      if (this.statusBadge && this.timeLeft > 0) {
        this.statusBadge.textContent = "Paused";
        this.statusBadge.className = "timer-status paused";
      }
    }

    reset() {
      this.pause();
      this.timeLeft = this.duration;
      this.updateDisplay();
      if (this.statusBadge) {
        this.statusBadge.textContent = `Ready (${this.duration}s)`;
        this.statusBadge.className = "timer-status";
      }
    }

    updateDisplay() {
      const mins = Math.floor(this.timeLeft / 60);
      const secs = this.timeLeft % 60;
      const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      if (this.displayEl) {
        this.displayEl.textContent = formatted;
      }
      if (this.circleEl) {
        const perimeter = 2 * Math.PI * 45;
        const offset = perimeter - (this.timeLeft / this.duration) * perimeter;
        this.circleEl.style.strokeDashoffset = offset;
      }
    }
  }

  // --- MAIN APPLICATION STATE & CONTROLLER ---
  class AppController {
    constructor() {
      this.data = COURSE_DATA;
      this.sfx = new SoundEngine();
      this.tts = new SpeechController();
      this.timer = new ExamTimer(this.sfx);

      this.currentSlide = 1;
      this.totalSlides = 15;
      this.isTeacherMode = false;
      // Default to Light Mode as requested
      this.currentTheme = localStorage.getItem('cambridge_theme') || 'light';
      this.viewMode = 'presentation';

      this.studentState = {
        listeningPart4Task1: {},
        listeningPart4Task2: {},
        listeningPart2Gaps: {},
        readingMC: {},
        synonymsMiserable: ["", "", ""],
        everydayEnglish: {},
        useOfEnglish1a: {},
        useOfEnglish2a: {},
        useOfEnglish3a: {},
        useOfEnglish3b: {},
        useOfEnglish4: {},
        useOfEnglish5: {},
        checked: {}
      };

      this.loadSavedState();
    }

    init() {
      this.applyTheme(this.currentTheme);
      this.bindGlobalEvents();
      this.renderSlideOverview();
      this.renderCurrentSlide();
      this.renderWorkbook();
      this.updateProgressBar();
      this.timer.updateDisplay();
    }

    loadSavedState() {
      try {
        const saved = localStorage.getItem('cambridge_unit1_state');
        if (saved) {
          this.studentState = Object.assign(this.studentState, JSON.parse(saved));
          if (!this.studentState.checked) {
            this.studentState.checked = {};
          }
        }
      } catch (e) {
        console.error("State loading error:", e);
      }
    }

    updateView() {
      if (this.viewMode === 'presentation') {
        this.renderCurrentSlide();
      } else {
        const bookContainer = document.getElementById('workbook-container');
        const scrollPos = bookContainer ? bookContainer.scrollTop : 0;
        const winScrollPos = window.scrollY;
        this.renderWorkbook();
        if (bookContainer && scrollPos) bookContainer.scrollTop = scrollPos;
        if (winScrollPos) window.scrollTo(0, winScrollPos);
      }
    }

    saveState() {
      try {
        localStorage.setItem('cambridge_unit1_state', JSON.stringify(this.studentState));
      } catch (e) {
        console.error("State save error:", e);
      }
      this.updateScoreboard();
    }

    applyTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('cambridge_theme', theme);
      const icon = document.getElementById('theme-toggle-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      }
    }

    toggleTheme() {
      this.sfx.playClick();
      const next = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(next);
    }

    toggleTeacherMode() {
      this.sfx.playClick();
      this.isTeacherMode = !this.isTeacherMode;
      document.body.classList.toggle('teacher-mode-active', this.isTeacherMode);
      const btn = document.getElementById('teacher-mode-btn');
      if (btn) {
        btn.classList.toggle('active', this.isTeacherMode);
        btn.querySelector('.btn-label').textContent = this.isTeacherMode ? "Teacher Key: ON" : "Teacher Key: OFF";
      }
      if (this.viewMode === 'presentation') {
        this.renderCurrentSlide();
      } else {
        this.renderWorkbook();
      }
    }

    switchView(mode) {
      this.sfx.playClick();
      this.viewMode = mode;
      const presContainer = document.getElementById('presentation-container');
      const bookContainer = document.getElementById('workbook-container');
      const presBtn = document.getElementById('view-pres-btn');
      const bookBtn = document.getElementById('view-book-btn');

      if (mode === 'presentation') {
        presContainer.classList.remove('hidden');
        bookContainer.classList.add('hidden');
        presBtn.classList.add('active');
        bookBtn.classList.remove('active');
        this.renderCurrentSlide();
      } else {
        presContainer.classList.add('hidden');
        bookContainer.classList.remove('hidden');
        presBtn.classList.remove('active');
        bookBtn.classList.add('active');
        this.renderWorkbook();
      }
    }

    goToSlide(slideIndex) {
      if (slideIndex < 1 || slideIndex > this.totalSlides) return;
      this.tts.stop();
      this.sfx.playClick();
      this.currentSlide = slideIndex;
      this.renderCurrentSlide();
      this.updateProgressBar();
      const container = document.getElementById('slide-viewport');
      if (container) container.scrollTop = 0;
    }

    nextSlide() {
      if (this.currentSlide < this.totalSlides) {
        this.goToSlide(this.currentSlide + 1);
      }
    }

    prevSlide() {
      if (this.currentSlide > 1) {
        this.goToSlide(this.currentSlide - 1);
      }
    }

    updateProgressBar() {
      const progressEl = document.getElementById('slide-progress-bar');
      const counterEl = document.getElementById('slide-counter');
      if (progressEl) {
        const pct = ((this.currentSlide - 1) / (this.totalSlides - 1)) * 100;
        progressEl.style.width = `${pct}%`;
      }
      if (counterEl) {
        counterEl.textContent = `Slide ${this.currentSlide.toString().padStart(2, '0')} / ${this.totalSlides.toString().padStart(2, '0')}`;
      }
      document.querySelectorAll('.drawer-item').forEach(item => {
        const num = parseInt(item.getAttribute('data-slide'), 10);
        item.classList.toggle('active', num === this.currentSlide);
      });
    }

    bindGlobalEvents() {
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === 'f' || e.key === 'F') {
          this.toggleFullscreen();
        } else if (e.key === 'k' || e.key === 'K') {
          this.toggleTeacherMode();
        } else if (e.key === 't' || e.key === 'T') {
          this.toggleTimerModal();
        }
      });

      document.getElementById('theme-toggle-btn')?.addEventListener('click', () => this.toggleTheme());
      document.getElementById('teacher-mode-btn')?.addEventListener('click', () => this.toggleTeacherMode());
      document.getElementById('sfx-toggle-btn')?.addEventListener('click', () => {
        const enabled = this.sfx.toggle();
        const icon = document.getElementById('sfx-icon');
        if (icon) icon.textContent = enabled ? 'SFX: ON' : 'SFX: OFF';
      });
      document.getElementById('fullscreen-btn')?.addEventListener('click', () => this.toggleFullscreen());
      document.getElementById('view-pres-btn')?.addEventListener('click', () => this.switchView('presentation'));
      document.getElementById('view-book-btn')?.addEventListener('click', () => this.switchView('workbook'));

      document.getElementById('prev-slide-btn')?.addEventListener('click', () => this.prevSlide());
      document.getElementById('next-slide-btn')?.addEventListener('click', () => this.nextSlide());

      document.getElementById('slide-drawer-toggle')?.addEventListener('click', () => {
        document.getElementById('slide-drawer')?.classList.toggle('open');
      });
      document.getElementById('drawer-close-btn')?.addEventListener('click', () => {
        document.getElementById('slide-drawer')?.classList.remove('open');
      });

      document.getElementById('timer-start-btn')?.addEventListener('click', () => this.timer.start());
      document.getElementById('timer-pause-btn')?.addEventListener('click', () => this.timer.pause());
      document.getElementById('timer-reset-btn')?.addEventListener('click', () => this.timer.reset());
      document.getElementById('timer-preset-60')?.addEventListener('click', () => this.timer.setDuration(60));
      document.getElementById('timer-preset-120')?.addEventListener('click', () => this.timer.setDuration(120));
      document.getElementById('timer-modal-toggle')?.addEventListener('click', () => this.toggleTimerModal());
      document.getElementById('timer-modal-close')?.addEventListener('click', () => this.toggleTimerModal());

      window.addEventListener('beforeunload', () => this.tts.stop());
    }

    toggleFullscreen() {
      this.sfx.playClick();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn("Fullscreen request error:", err);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    toggleTimerModal() {
      this.sfx.playClick();
      const modal = document.getElementById('timer-modal');
      modal?.classList.toggle('open');
    }

    renderSlideOverview() {
      const list = document.getElementById('drawer-slides-list');
      if (!list) return;

      const slideTitles = [
        { num: 1, title: "Course Welcome & Unit Roadmap", tag: "Overview" },
        { num: 2, title: "Listening Part 4: Multiple Matching", tag: "Listening" },
        { num: 3, title: "Listening Part 2: The Google Phenomenon", tag: "Listening" },
        { num: 4, title: "Speaking Part 2: Achievements (Photo Compare)", tag: "Speaking" },
        { num: 5, title: "Speaking Part 2: Celebrations (Photo Speculate)", tag: "Speaking" },
        { num: 6, title: "Speaking: Peer Assessment & Everyday English", tag: "Speaking" },
        { num: 7, title: "Reading Part 3: 'Life's Good! Why So Bad?'", tag: "Reading" },
        { num: 8, title: "Reading Part 3: 7 Exam Comprehension Questions", tag: "Reading" },
        { num: 9, title: "Reading Part 3: Vocabulary & Discussion Workshop", tag: "Reading" },
        { num: 10, title: "Use of English: Gerunds as Subjects (Ex 1)", tag: "Grammar" },
        { num: 11, title: "Use of English: Prepositions with Gerunds (Ex 2)", tag: "Grammar" },
        { num: 12, title: "Use of English: Phrasal Verbs in Action (Ex 3)", tag: "Grammar" },
        { num: 13, title: "Use of English: Verb Complementation (Ex 4)", tag: "Grammar" },
        { num: 14, title: "Use of English: 'To Success' 6 Rules (Ex 5)", tag: "Grammar" },
        { num: 15, title: "Unit Mastery Dashboard & Certificate", tag: "Summary" }
      ];

      list.innerHTML = slideTitles.map(s => `
        <div class="drawer-item ${s.num === this.currentSlide ? 'active' : ''}" data-slide="${s.num}">
          <span class="drawer-num">${s.num.toString().padStart(2, '0')}</span>
          <div class="drawer-info">
            <span class="drawer-tag">${s.tag}</span>
            <h4 class="drawer-title">${s.title}</h4>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('.drawer-item').forEach(item => {
        item.addEventListener('click', () => {
          const slideNum = parseInt(item.getAttribute('data-slide'), 10);
          this.goToSlide(slideNum);
          document.getElementById('slide-drawer')?.classList.remove('open');
        });
      });
    }

    // --- SLIDE RENDER ENGINE ---
    renderCurrentSlide() {
      const container = document.getElementById('slide-content-area');
      if (!container) return;

      switch (this.currentSlide) {
        case 1:
          container.innerHTML = this.getSlide1HTML();
          break;
        case 2:
          container.innerHTML = this.getSlide2HTML();
          this.bindListeningPart4Events(container);
          break;
        case 3:
          container.innerHTML = this.getSlide3HTML();
          this.bindListeningPart2Events(container);
          break;
        case 4:
          container.innerHTML = this.getSlide4HTML();
          this.bindSpeakingAchievementsEvents(container);
          break;
        case 5:
          container.innerHTML = this.getSlide5HTML();
          this.bindSpeakingCelebrationsEvents(container);
          break;
        case 6:
          container.innerHTML = this.getSlide6HTML();
          this.bindEverydayEnglishEvents(container);
          break;
        case 7:
          container.innerHTML = this.getSlide7HTML();
          this.bindReadingTextEvents(container);
          break;
        case 8:
          container.innerHTML = this.getSlide8HTML();
          this.bindReadingMCEvents(container);
          break;
        case 9:
          container.innerHTML = this.getSlide9HTML();
          this.bindReadingVocabEvents(container);
          break;
        case 10:
          container.innerHTML = this.getSlide10HTML();
          this.bindUseOfEnglish1Events(container);
          break;
        case 11:
          container.innerHTML = this.getSlide11HTML();
          this.bindUseOfEnglish2Events(container);
          break;
        case 12:
          container.innerHTML = this.getSlide12HTML();
          this.bindUseOfEnglish3Events(container);
          break;
        case 13:
          container.innerHTML = this.getSlide13HTML();
          this.bindUseOfEnglish4Events(container);
          break;
        case 14:
          container.innerHTML = this.getSlide14HTML();
          this.bindUseOfEnglish5Events(container);
          break;
        case 15:
          container.innerHTML = this.getSlide15HTML();
          this.bindSummaryEvents(container);
          break;
        default:
          container.innerHTML = `<div class="empty-state">Slide ${this.currentSlide}</div>`;
      }
    }

    // --- SLIDE 1: WELCOME & ROADMAP ---
    getSlide1HTML() {
      const u = this.data.unitInfo;
      return `
        <div class="slide slide-hero animate-fade-in">
          <div class="hero-badge-row">
            <span class="badge badge-accent">Cambridge English: Advanced (CAE)</span>
            <span class="badge badge-primary">CEFR Level C1</span>
            <span class="badge badge-outline">${u.pages}</span>
          </div>

          <h1 class="hero-title">Unit ${u.unitNumber}: ${u.title}</h1>
          <p class="hero-subtitle">${u.subtitle}</p>

          <div class="roadmap-grid">
            ${u.sections.map((sec, idx) => `
              <div class="roadmap-card card-interactive" onclick="window.app.goToSlide(${[2, 4, 7, 10][idx]})">
                <div class="card-icon-bubble">${sec.icon}</div>
                <div class="card-body">
                  <span class="card-page">${sec.page}</span>
                  <h3 class="card-title">${sec.title}</h3>
                  <p class="card-desc">Interactive exercises, audio recordings, auto-grading, and exam tips.</p>
                </div>
                <div class="card-arrow">→</div>
              </div>
            `).join('')}
          </div>

          <div class="hero-controls-bar">
            <button class="btn btn-primary btn-lg" onclick="window.app.goToSlide(2)">
              Start Lesson Presentation →
            </button>
            <button class="btn btn-outline btn-lg" onclick="window.app.switchView('workbook')">
              View Full Interactive Workbook
            </button>
          </div>

          <div class="keyboard-tips-banner">
            <span><strong>Presenter Shortcuts:</strong> Use <code>←</code> / <code>→</code> or <code>Space</code> to navigate slides • Press <code>F</code> for Fullscreen • Press <code>T</code> for 1-minute Speaking Timer • Press <code>K</code> for Teacher Answer Key</span>
          </div>
        </div>
      `;
    }

    // --- SLIDE 2: LISTENING PART 4 ---
    getSlide2HTML() {
      const p = this.data.listening.part4;
      const state1 = this.studentState.listeningPart4Task1;
      const state2 = this.studentState.listeningPart4Task2;
      return `
        <div class="slide slide-listening animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 14 • Listening & Speaking</span>
              <h2 class="slide-title">${p.title}</h2>
            </div>
            <div class="slide-badge-box">
              <span class="badge badge-warning">Cambridge Exam Task</span>
            </div>
          </div>

          <!-- Warmup Prompt -->
          <div class="prompt-box">
            <div class="prompt-header">
              <span class="section-tag">[Speaking Discussion]</span>
              <strong>1a. Pair Warm-Up Discussion:</strong>
            </div>
            <p class="prompt-text">${p.warmup.prompt}</p>
            <div class="prompt-chips">
              ${p.warmup.questions.map(q => `<span class="chip">${q}</span>`).join('')}
            </div>
          </div>

          <!-- Strategy Point -->
          <div class="strategy-card">
            <div class="strategy-title">
              <strong>${p.strategy.title}</strong>
            </div>
            <ul class="strategy-list">
              ${p.strategy.tips.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <!-- Simulated Audio Player -->
          <div class="audio-console">
            <div class="audio-console-header">
              <div class="audio-title-group">
                <span class="pulse-indicator"></span>
                <strong>Audio Track: 5 People Talking About Special Moments</strong>
              </div>
              <span class="audio-badge">CAE Paper 4 Format</span>
            </div>
            <div class="speaker-tracks-grid">
              ${p.speakers.map((sp) => `
                <div class="speaker-play-card" id="speaker-card-${sp.id}">
                  <div class="sp-info">
                    <span class="sp-label">${sp.speakerLabel}</span>
                    <button class="btn btn-sm btn-primary play-sp-btn" data-speaker="${sp.id}">
                      Play Extract
                    </button>
                    <button class="btn btn-sm btn-ghost transcript-sp-btn" data-speaker="${sp.id}">
                      Transcript
                    </button>
                  </div>
                  <div class="sp-transcript hidden" id="sp-transcript-${sp.id}">
                    <p>"${sp.audioTranscript}"</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dual Tasks Matching Grid -->
          <div class="dual-tasks-grid">
            <!-- Task 1 -->
            <div class="task-panel">
              <div class="task-panel-header">
                <h3>${p.task1.title}</h3>
                <p>${p.task1.instruction}</p>
              </div>

              <div class="options-legend">
                ${p.task1.options.map(o => `
                  <span class="legend-pill"><strong>${o.letter}:</strong> ${o.text}</span>
                `).join('')}
              </div>

              <div class="matching-items-list">
                ${p.speakers.map((sp, i) => {
                  const isChecked = !!(this.studentState.checked && this.studentState.checked.listeningPart4);
                  const currentVal = state1[sp.id] || "";
                  const isCorrect = currentVal === sp.task1Answer;
                  const showFeedback = this.isTeacherMode || isChecked;
                  return `
                    <div class="match-row ${showFeedback ? (isCorrect ? 'row-correct' : 'row-incorrect') : ''}">
                      <span class="match-num">${i + 1}</span>
                      <span class="match-speaker">${sp.speakerLabel}</span>
                      <div class="match-select-box">
                        <select class="form-select task1-select" data-speaker="${sp.id}">
                          <option value="">Select (A–H)</option>
                          ${p.task1.options.map(o => `
                            <option value="${o.letter}" ${(this.isTeacherMode ? sp.task1Answer : currentVal) === o.letter ? 'selected' : ''}>
                              ${o.letter} – ${o.text}
                            </option>
                          `).join('')}
                        </select>
                        ${this.isTeacherMode || (isChecked && !isCorrect) ? `<span class="answer-pill">Key: ${sp.task1Answer}</span>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Task 2 -->
            <div class="task-panel">
              <div class="task-panel-header">
                <h3>${p.task2.title}</h3>
                <p>${p.task2.instruction}</p>
              </div>

              <div class="options-legend">
                ${p.task2.options.map(o => `
                  <span class="legend-pill"><strong>${o.letter}:</strong> ${o.text}</span>
                `).join('')}
              </div>

              <div class="matching-items-list">
                ${p.speakers.map((sp, i) => {
                  const isChecked = !!(this.studentState.checked && this.studentState.checked.listeningPart4);
                  const currentVal = state2[sp.id] || "";
                  const isCorrect = currentVal === sp.task2Answer;
                  const showFeedback = this.isTeacherMode || isChecked;
                  return `
                    <div class="match-row ${showFeedback ? (isCorrect ? 'row-correct' : 'row-incorrect') : ''}">
                      <span class="match-num">${i + 6}</span>
                      <span class="match-speaker">${sp.speakerLabel}</span>
                      <div class="match-select-box">
                        <select class="form-select task2-select" data-speaker="${sp.id}">
                          <option value="">Select (A–H)</option>
                          ${p.task2.options.map(o => `
                            <option value="${o.letter}" ${(this.isTeacherMode ? sp.task2Answer : currentVal) === o.letter ? 'selected' : ''}>
                              ${o.letter} – ${o.text}
                            </option>
                          `).join('')}
                        </select>
                        ${this.isTeacherMode || (isChecked && !isCorrect) ? `<span class="answer-pill">Key: ${sp.task2Answer}</span>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Actions Bar -->
          <div class="actions-bar">
            <button class="btn btn-success" id="check-part4-btn">Check Part 4 Answers</button>
            ${(() => {
              const isChecked = !!(this.studentState.checked && this.studentState.checked.listeningPart4);
              if (!isChecked && !this.isTeacherMode) return '';
              let score = 0;
              p.speakers.forEach(sp => {
                if (state1[sp.id] === sp.task1Answer) score++;
                if (state2[sp.id] === sp.task2Answer) score++;
              });
              const isFull = score === 10;
              return `
                <div id="part4-feedback-box" class="feedback-box ${isFull ? 'feedback-success' : 'feedback-info'}">
                  <strong>Score: ${score} / 10</strong> ${isFull ? 'Outstanding! All matches correct.' : 'Review explanations below:'}
                  <div class="mt-2">
                    <h4 style="font-size: 13px; margin: 8px 0 4px 0;">Auditory Clues & Explanations:</h4>
                    <ul style="padding-left: 18px; font-size: 12.5px;">
                      ${p.speakers.map(sp => `
                        <li><strong>${sp.speakerLabel}:</strong> ${sp.explanation} <em>(Task 1: [${sp.task1Answer}], Task 2: [${sp.task2Answer}])</em></li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
              `;
            })()}
          </div>

          <!-- Discussion 1c -->
          <div class="followup-card">
            <h4>Partner Discussion (1c):</h4>
            <p>${p.followUp.prompt}</p>
          </div>
        </div>
      `;
    }

    bindListeningPart4Events(container) {
      container.querySelectorAll('.play-sp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const spId = parseInt(btn.getAttribute('data-speaker'), 10);
          const sp = this.data.listening.part4.speakers.find(s => s.id === spId);
          if (!sp) return;

          if (this.tts.isSpeaking && btn.classList.contains('playing')) {
            this.tts.stop();
            btn.classList.remove('playing');
            btn.textContent = 'Play Extract';
          } else {
            container.querySelectorAll('.play-sp-btn').forEach(b => {
              b.classList.remove('playing');
              b.textContent = 'Play Extract';
            });
            btn.classList.add('playing');
            btn.textContent = 'Stop Audio';

            const rates = [1.0, 0.95, 1.05, 1.0, 0.9];
            const pitches = [1.1, 1.0, 0.9, 1.05, 0.85];

            this.tts.speak(sp.audioTranscript, {
              rate: rates[spId - 1] || 1.0,
              pitch: pitches[spId - 1] || 1.0,
              voiceIndex: (spId % 3),
              onEnd: () => {
                btn.classList.remove('playing');
                btn.textContent = 'Play Extract';
              }
            });
          }
        });
      });

      container.querySelectorAll('.transcript-sp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const spId = btn.getAttribute('data-speaker');
          const tEl = container.querySelector(`#sp-transcript-${spId}`);
          tEl?.classList.toggle('hidden');
          btn.textContent = tEl?.classList.contains('hidden') ? 'Transcript' : 'Hide Transcript';
        });
      });

      container.querySelectorAll('.task1-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const spId = sel.getAttribute('data-speaker');
          this.studentState.listeningPart4Task1[spId] = e.target.value;
          this.saveState();
        });
      });

      container.querySelectorAll('.task2-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const spId = sel.getAttribute('data-speaker');
          this.studentState.listeningPart4Task2[spId] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-part4-btn')?.addEventListener('click', () => {
        let score = 0;
        const sps = this.data.listening.part4.speakers;
        sps.forEach(sp => {
          if (this.studentState.listeningPart4Task1[sp.id] === sp.task1Answer) score++;
          if (this.studentState.listeningPart4Task2[sp.id] === sp.task2Answer) score++;
        });

        if (score >= 8) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.listeningPart4 = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 3: LISTENING PART 2 (GOOGLE REPORT) ---
    getSlide3HTML() {
      const p = this.data.listening.part2;
      const state = this.studentState.listeningPart2Gaps;
      return `
        <div class="slide slide-listening animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 14 • Listening – Part 2</span>
              <h2 class="slide-title">${p.title}</h2>
            </div>
            <span class="badge badge-accent">Sentence Completion (1–3 Words)</span>
          </div>

          <!-- Warmup & Strategy Grid -->
          <div class="grid-2col">
            <div class="prompt-box">
              <div class="prompt-header">
                <span class="section-tag">[Pre-Listening]</span>
                <strong>2a. Pre-Listening Prediction:</strong>
              </div>
              <p>${p.warmup.prompt}</p>
            </div>

            <div class="strategy-card">
              <div class="strategy-title"><strong>${p.strategy.title}</strong></div>
              <ul class="strategy-list">
                ${p.strategy.tips.slice(0, 2).map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Radio Broadcast Audio Console -->
          <div class="audio-console mb-4">
            <div class="audio-console-header">
              <div class="audio-title-group">
                <span class="pulse-indicator"></span>
                <strong>Radio News Report: "The Rise of Google" (Full Monologue)</strong>
              </div>
              <div class="audio-controls-row">
                <button class="btn btn-primary" id="play-google-audio-btn">
                  Play Monologue
                </button>
                <button class="btn btn-outline" id="toggle-google-transcript-btn">
                  View Transcript
                </button>
              </div>
            </div>
            <div id="google-transcript-area" class="transcript-box hidden">
              <p>${p.audioTranscript.replace(/\n\n/g, '</p><p>')}</p>
            </div>
          </div>

          <!-- Interactive Gap Fill Box -->
          <div class="gapfill-exercise-box">
            <div class="gapfill-box-header">
              <h3>2b. For questions 1–8, complete the sentences.</h3>
              <span class="badge badge-sm badge-info">1 to 3 words per gap</span>
            </div>

            <div class="gapfill-sentences">
              ${p.questions.map(q => {
                const isChecked = !!(this.studentState.checked && this.studentState.checked.listeningPart2);
                const currentVal = (state[q.num] || "").trim();
                const isCorrect = q.acceptedAnswers.some(ans => ans.toLowerCase() === currentVal.toLowerCase());
                const showCheck = this.isTeacherMode || isChecked;
                return `
                  <div class="gapfill-row ${showCheck ? (isCorrect ? 'gap-correct' : 'gap-incorrect') : ''}">
                    <span class="gap-num">${q.num}</span>
                    <span class="gap-text-lead">${q.lead}</span>
                    <div class="gap-input-wrapper">
                      <input type="text"
                        class="gap-input"
                        data-gap="${q.num}"
                        value="${this.isTeacherMode ? q.displayAnswer : currentVal}"
                        placeholder="Type answer..."
                        autocomplete="off" spellcheck="false" />
                      <button class="btn-hint" data-gap="${q.num}" title="Show Hint">Hint</button>
                    </div>
                    <span class="gap-text-trail">${q.trail}</span>
                    ${this.isTeacherMode || (isChecked && !isCorrect) ? `<span class="answer-tag">Key: ${q.displayAnswer}</span>` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <div class="gapfill-footer">
              <button class="btn btn-success" id="check-gaps-btn">Check My Answers</button>
              <button class="btn btn-outline" id="show-all-hints-btn">Show All Hints</button>
              ${(() => {
                const isChecked = !!(this.studentState.checked && this.studentState.checked.listeningPart2);
                if (!isChecked && !this.isTeacherMode) return '<div id="gap-score-display" class="gap-score-badge hidden"></div>';
                let score = 0;
                p.questions.forEach(q => {
                  const val = (state[q.num] || "").trim().toLowerCase();
                  if (q.acceptedAnswers.some(ans => ans.toLowerCase() === val)) score++;
                });
                return `<div id="gap-score-display" class="gap-score-badge">Score: ${score} / 8 Correct!</div>`;
              })()}
            </div>
          </div>

          <!-- Discussion Prompts 2c & 2d -->
          <div class="grid-2col mt-4">
            ${p.discussion.map(d => `
              <div class="discussion-card">
                <span class="section-tag">[Discussion]</span>
                <p><strong>${d.prompt}</strong></p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    bindListeningPart2Events(container) {
      const p = this.data.listening.part2;

      const playBtn = container.querySelector('#play-google-audio-btn');
      playBtn?.addEventListener('click', () => {
        if (this.tts.isSpeaking && playBtn.classList.contains('playing')) {
          this.tts.stop();
          playBtn.classList.remove('playing');
          playBtn.textContent = 'Play Monologue';
        } else {
          playBtn.classList.add('playing');
          playBtn.textContent = 'Stop Monologue';
          this.tts.speak(p.audioTranscript, {
            rate: 0.95,
            pitch: 1.0,
            onEnd: () => {
              playBtn.classList.remove('playing');
              playBtn.textContent = 'Play Monologue';
            }
          });
        }
      });

      container.querySelector('#toggle-google-transcript-btn')?.addEventListener('click', () => {
        const box = container.querySelector('#google-transcript-area');
        box?.classList.toggle('hidden');
      });

      container.querySelectorAll('.gap-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const gapNum = inp.getAttribute('data-gap');
          this.studentState.listeningPart2Gaps[gapNum] = e.target.value;
          this.saveState();
        });
      });

      container.querySelectorAll('.btn-hint').forEach(btn => {
        btn.addEventListener('click', () => {
          const gapNum = parseInt(btn.getAttribute('data-gap'), 10);
          const q = p.questions.find(item => item.num === gapNum);
          if (q) {
            alert(`Hint for gap [${gapNum}]:\n${q.hint}`);
          }
        });
      });

      container.querySelector('#check-gaps-btn')?.addEventListener('click', () => {
        let score = 0;
        p.questions.forEach(q => {
          const val = (this.studentState.listeningPart2Gaps[q.num] || "").trim().toLowerCase();
          if (q.acceptedAnswers.some(ans => ans.toLowerCase() === val)) {
            score++;
          }
        });

        if (score >= 6) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.listeningPart2 = true;
        this.saveState();
        this.updateView();
      });

      container.querySelector('#show-all-hints-btn')?.addEventListener('click', () => {
        const hints = p.questions.map(q => `[${q.num}] ${q.hint}`).join('\n\n');
        alert("Hints for all 8 gaps:\n\n" + hints);
      });
    }

    // --- SLIDE 4: SPEAKING PART 2 (ACHIEVEMENTS) ---
    getSlide4HTML() {
      const sp = this.data.speaking;
      const t = sp.taskAchievements;
      return `
        <div class="slide slide-speaking animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 15 • Speaking – Part 2</span>
              <h2 class="slide-title">Compare & Speculate: Achievements</h2>
            </div>
            <div class="role-badge-box">
              <span class="badge badge-primary">${t.role} Turn (1 Minute)</span>
              <span class="badge badge-outline">Exam Task 3a & 3b</span>
            </div>
          </div>

          <!-- Prompt Callout -->
          <div class="exam-task-box">
            <div class="task-instruction">
              <span class="badge badge-accent">3a. ${t.role}:</span>
              <p>${t.prompt}</p>
            </div>
            <div class="task-questions-row">
              ${t.questions.map(q => `<div class="question-chip">${q}</div>`).join('')}
            </div>
          </div>

          <!-- 3 Achievement Photos Visual Grid -->
          <div class="photo-cards-grid">
            ${t.photos.map((ph, idx) => `
              <div class="photo-card" id="card-${ph.id}">
                <div class="photo-container">
                  <img src="${ph.imageUrl}" alt="${ph.label}" class="photo-img" onerror="this.src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'" />
                  <span class="photo-label-badge">${['A', 'B', 'C'][idx]}</span>
                </div>
                <div class="photo-details">
                  <h4>${ph.label}</h4>
                  <p class="photo-desc">${ph.caption}</p>
                  <div class="photo-meta-tags">
                    <span class="tag-meta">Domain: ${ph.successType}</span>
                    <span class="tag-meta">Significance: ${ph.happinessFactor}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Student B Follow up -->
          <div class="student-b-card">
            <span class="badge badge-secondary">${t.followUpRole} Follow-up:</span>
            <strong>${t.followUpQuestion}</strong>
            <span class="tip-subtext">(Respond in approx. 30 seconds)</span>
          </div>

          <!-- Useful Language Toolkit & Timer Launcher -->
          <div class="speaking-tools-panel">
            <div class="tools-left">
              <h4>Useful Language Bank (Click phrase to hear pronunciation):</h4>
              <div class="chips-cloud">
                ${sp.usefulLanguage.comparing.slice(0, 4).map(ph => `
                  <button class="phrase-chip" data-phrase="${ph}">
                    "${ph}"
                  </button>
                `).join('')}
                ${sp.usefulLanguage.speculating.slice(0, 4).map(ph => `
                  <button class="phrase-chip chip-speculate" data-phrase="${ph}">
                    "${ph}"
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="tools-right">
              <div class="quick-timer-box">
                <span class="timer-label">Exam Timer:</span>
                <span class="timer-digits-sm" id="slide-timer-preview">01:00</span>
                <button class="btn btn-primary btn-sm" id="launch-exam-timer-btn">
                  Open Speaking Timer
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bindSpeakingAchievementsEvents(container) {
      container.querySelectorAll('.phrase-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const phrase = chip.getAttribute('data-phrase');
          chip.classList.add('chip-active');
          this.tts.speak(phrase, {
            rate: 0.9,
            onEnd: () => chip.classList.remove('chip-active')
          });
        });
      });

      container.querySelector('#launch-exam-timer-btn')?.addEventListener('click', () => {
        this.toggleTimerModal();
      });
    }

    // --- SLIDE 5: SPEAKING PART 2 (CELEBRATIONS) ---
    getSlide5HTML() {
      const sp = this.data.speaking;
      const t = sp.taskCelebrations;
      return `
        <div class="slide slide-speaking animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 15 • Speaking – Part 2 (Continued)</span>
              <h2 class="slide-title">Compare & Speculate: Celebrations</h2>
            </div>
            <div class="role-badge-box">
              <span class="badge badge-secondary">${t.role} Turn (1 Minute)</span>
              <span class="badge badge-outline">Exam Task 3c & 3d</span>
            </div>
          </div>

          <!-- Prompt Callout -->
          <div class="exam-task-box">
            <div class="task-instruction">
              <span class="badge badge-secondary">3c. ${t.role}:</span>
              <p>${t.prompt}</p>
            </div>
            <div class="task-questions-row">
              ${t.questions.map(q => `<div class="question-chip">${q}</div>`).join('')}
            </div>
          </div>

          <!-- 3 Celebration Photos Visual Grid -->
          <div class="photo-cards-grid">
            ${t.photos.map((ph, idx) => `
              <div class="photo-card" id="card-${ph.id}">
                <div class="photo-container">
                  <div class="photo-fallback-graphic photo-graphic-${idx + 1}">
                    <span class="graphic-badge">[Photo ${['A', 'B', 'C'][idx]}]</span>
                    <span class="graphic-title">${ph.label}</span>
                  </div>
                  <span class="photo-label-badge">${['A', 'B', 'C'][idx]}</span>
                </div>
                <div class="photo-details">
                  <h4>${ph.label}</h4>
                  <p class="photo-desc">${ph.caption}</p>
                  <div class="photo-meta-tags">
                    <span class="tag-meta">Occasion: ${ph.occasionType}</span>
                    <span class="tag-meta">Significance: ${ph.meaning}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Student A Follow up -->
          <div class="student-b-card">
            <span class="badge badge-primary">${t.followUpRole} Follow-up:</span>
            <strong>${t.followUpQuestion}</strong>
            <span class="tip-subtext">(Consider: guests, emotions, memories made)</span>
          </div>

          <!-- Interactive Speaking Scaffold / Sentence Builder -->
          <div class="speech-builder-box">
            <h4>Candidate Speech Constructor (Combine phrases to practice your answer):</h4>
            <div class="builder-columns">
              <div class="builder-col">
                <span class="col-title">1. Introduction / Compare:</span>
                <div class="builder-chips">
                  <span class="builder-chip" data-insert="Both pictures show people celebrating important milestones, but...">"Both pictures show..."</span>
                  <span class="builder-chip" data-insert="The most striking difference between the child's party and the graduation is...">"The most striking difference is..."</span>
                  <span class="builder-chip" data-insert="In the picture on the left, whereas in the graduation photo...">"In the picture on the left, whereas..."</span>
                </div>
              </div>
              <div class="builder-col">
                <span class="col-title">2. Speculate on Meaning:</span>
                <div class="builder-chips">
                  <span class="builder-chip" data-insert="I imagine that for the graduate, this represents years of sacrifice...">"I imagine that for..."</span>
                  <span class="builder-chip" data-insert="They appear to be experiencing a deep sense of relief and accomplishment...">"They appear to be..."</span>
                  <span class="builder-chip" data-insert="Although I can't be sure, perhaps the elderly couple are celebrating...">"Although I can't be sure, perhaps..."</span>
                </div>
              </div>
            </div>
            <div class="builder-output-area">
              <textarea id="speaking-notes-input" placeholder="Type your 1-minute speaking plan or draft speech here..." rows="3"></textarea>
            </div>
          </div>
        </div>
      `;
    }

    bindSpeakingCelebrationsEvents(container) {
      container.querySelectorAll('.builder-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const insertText = chip.getAttribute('data-insert');
          const textarea = container.querySelector('#speaking-notes-input');
          if (textarea) {
            textarea.value = (textarea.value ? textarea.value + ' ' : '') + insertText;
            this.sfx.playClick();
          }
        });
      });
    }

    // --- SLIDE 6: PEER ASSESSMENT & EVERYDAY ENGLISH ---
    getSlide6HTML() {
      const sp = this.data.speaking;
      const ee = sp.everydayEnglish;
      const state = this.studentState.everydayEnglish;
      return `
        <div class="slide slide-speaking animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 15 • Activities 4 & 5</span>
              <h2 class="slide-title">Assessment & Everyday English</h2>
            </div>
            <span class="badge badge-accent">Cambridge Speaking Assessment Criteria</span>
          </div>

          <!-- Activity 4: Cambridge Assessment Rubric -->
          <div class="rubric-box mb-4">
            <div class="rubric-header">
              <span class="section-tag">[Assessment Criteria]</span>
              <strong>Activity 4: Candidate Performance Assessment Rubric</strong>
            </div>
            <div class="rubric-grid">
              ${sp.assessmentCriteria.map((c, i) => `
                <div class="rubric-card">
                  <div class="rubric-card-header">
                    <span class="rubric-num">${i + 1}</span>
                    <h4>${c.criterion}</h4>
                  </div>
                  <p>${c.description}</p>
                  <div class="rating-bar">
                    <span>Needs Practice</span>
                    <input type="range" min="1" max="5" value="4" class="slider-sm" />
                    <span>C1 Master</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Activity 5: Everyday English - Responding to News -->
          <div class="everyday-english-box">
            <div class="ee-header">
              <div>
                <h3>${ee.title}</h3>
                <p>${ee.instruction}</p>
              </div>
            </div>

            <!-- Expressions Bank -->
            <div class="ee-pill-row">
              ${ee.expressions.map(ex => `
                <div class="ee-pill" title="${ex.usage}">
                  <span class="ee-code">[${ex.code}]</span>
                  <strong class="ee-phrase">${ex.phrase}</strong>
                  <span class="ee-tone">${ex.tone}</span>
                </div>
              `).join('')}
            </div>

            <!-- Dialogue Scenarios Interactive List -->
            <div class="dialogues-list">
              ${ee.scenarios.map(sc => {
                const isChecked = !!(this.studentState.checked && this.studentState.checked.everydayEnglish);
                const currentVal = state[sc.id] || "";
                const isCorrect = currentVal.toLowerCase() === sc.bestResponse.toLowerCase();
                const showCheck = this.isTeacherMode || isChecked;
                return `
                  <div class="dialogue-card ${showCheck ? (isCorrect ? 'card-correct' : 'card-incorrect') : ''}">
                    <div class="dialogue-speaker-a">
                      <span class="speaker-avatar">A</span>
                      <div class="bubble-a">
                        <p>"${sc.speakerA}"</p>
                        <button class="btn-audio-mini play-dialogue-btn" data-text="${sc.speakerA}">Listen</button>
                      </div>
                    </div>
                    <div class="dialogue-speaker-b">
                      <span class="speaker-avatar">B</span>
                      <div class="bubble-b">
                        <select class="form-select ee-select" data-id="${sc.id}">
                          <option value="">Select Response...</option>
                          ${ee.expressions.map(e => `
                            <option value="${e.phrase}" ${(this.isTeacherMode ? sc.bestResponse : currentVal) === e.phrase ? 'selected' : ''}>
                              ${e.phrase} (${e.tone})
                            </option>
                          `).join('')}
                        </select>
                        ${this.isTeacherMode || (isChecked && !isCorrect) ? `<span class="answer-tag">Key: ${sc.bestResponse}</span>` : ''}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="ee-actions">
              <button class="btn btn-success" id="check-ee-btn">Check Responses</button>
              ${(() => {
                const isChecked = !!(this.studentState.checked && this.studentState.checked.everydayEnglish);
                if (!isChecked && !this.isTeacherMode) return '<div id="ee-score-box" class="feedback-box hidden"></div>';
                let score = 0;
                ee.scenarios.forEach(sc => {
                  if (state[sc.id] === sc.bestResponse) score++;
                });
                return `
                  <div id="ee-score-box" class="feedback-box feedback-info">
                    <strong>Score: ${score} / ${ee.scenarios.length} Correct</strong>
                    <div class="mt-2">
                      <h4 style="font-size: 13px; margin: 8px 0 4px 0;">Nuance & Pragmatic Explanations:</h4>
                      <ul style="padding-left: 18px; font-size: 12.5px;">
                        ${ee.scenarios.map(sc => `
                          <li><strong>Scenario ${sc.id}:</strong> <em>${sc.bestResponse}</em> – ${sc.explanation}</li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>
                `;
              })()}
            </div>
          </div>
        </div>
      `;
    }

    bindEverydayEnglishEvents(container) {
      const ee = this.data.speaking.everydayEnglish;

      container.querySelectorAll('.play-dialogue-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const text = btn.getAttribute('data-text');
          this.tts.speak(text);
        });
      });

      container.querySelectorAll('.ee-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const id = sel.getAttribute('data-id');
          this.studentState.everydayEnglish[id] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-ee-btn')?.addEventListener('click', () => {
        let score = 0;
        ee.scenarios.forEach(sc => {
          if (this.studentState.everydayEnglish[sc.id] === sc.bestResponse) score++;
        });
        if (score === ee.scenarios.length) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.everydayEnglish = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 7: READING PART 3 (TEXT & VOCABULARY EXPLORER) ---
    getSlide7HTML() {
      const r = this.data.reading;
      return `
        <div class="slide slide-reading animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Pages 16 & 17 • Reading – Part 3</span>
              <h2 class="slide-title">${r.articleTitle}</h2>
              <p class="slide-subtitle">${r.articleSubtitle}</p>
            </div>
            <div class="header-tools">
              <button class="btn btn-sm btn-outline" id="read-aloud-article-btn">Listen to Article</button>
            </div>
          </div>

          <!-- Strategy Point & Pre-Reading Grid -->
          <div class="grid-2col mb-4">
            <div class="strategy-card">
              <div class="strategy-title"><strong>${r.strategy.title}</strong></div>
              <ul class="strategy-list">
                ${r.strategy.tips.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>

            <div class="prompt-box">
              <div class="prompt-header"><span class="section-tag">[Pre-Reading]</span> <strong>Pre-Reading Discussion Questions:</strong></div>
              <ul class="clean-list">
                ${r.preReading.map(pr => `<li>${pr}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Two-Column Full Article Reader with Interactive Words -->
          <div class="reader-container">
            <div class="reader-toolbar">
              <span>Full Article Text (9 Paragraphs • Lines 1–86)</span>
              <span class="text-hint">Click any highlighted word for definition & IPA</span>
            </div>

            <div class="article-text-columns">
              ${r.paragraphs.map(p => {
                let html = p.text;
                r.vocabulary.forEach(v => {
                  const reg = new RegExp(`\\[(${v.word})\\]`, 'gi');
                  html = html.replace(reg, `<span class="vocab-highlight" data-word="${v.word}">$1</span>`);
                });
                r.idioms.forEach(idm => {
                  const reg = new RegExp(`\\[(${idm.phrase})\\]`, 'gi');
                  html = html.replace(reg, `<span class="idiom-highlight" data-idiom="${idm.phrase}">$1</span>`);
                });

                return `
                  <div class="article-para">
                    <span class="para-line-ref">${p.lines}</span>
                    <p>${html}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Vocabulary Quick Info Popover Container -->
          <div id="vocab-detail-card" class="vocab-popup hidden"></div>
        </div>
      `;
    }

    bindReadingTextEvents(container) {
      const r = this.data.reading;

      container.querySelectorAll('.vocab-highlight').forEach(el => {
        el.addEventListener('click', () => {
          const word = el.getAttribute('data-word');
          const item = r.vocabulary.find(v => v.word.toLowerCase() === word.toLowerCase());
          if (!item) return;

          const pop = container.querySelector('#vocab-detail-card');
          if (pop) {
            pop.classList.remove('hidden');
            pop.innerHTML = `
              <div class="popup-header">
                <div>
                  <h4 class="popup-word">${item.word}</h4>
                  <span class="popup-pos">${item.pos}</span>
                </div>
                <button class="popup-close" onclick="this.parentElement.parentElement.classList.add('hidden')">Close</button>
              </div>
              <p class="popup-def"><strong>Definition:</strong> ${item.definition}</p>
              <p class="popup-quote"><em>"${item.quote}"</em></p>
              <button class="btn btn-sm btn-primary" onclick="window.app.tts.speak('${item.word}')">Pronounce Word</button>
            `;
          }
        });
      });

      container.querySelectorAll('.idiom-highlight').forEach(el => {
        el.addEventListener('click', () => {
          const phrase = el.getAttribute('data-idiom');
          const item = r.idioms.find(i => i.phrase.toLowerCase() === phrase.toLowerCase());
          if (!item) return;

          const pop = container.querySelector('#vocab-detail-card');
          if (pop) {
            pop.classList.remove('hidden');
            pop.innerHTML = `
              <div class="popup-header">
                <div>
                  <h4 class="popup-word">Idiomatic Expression</h4>
                  <span class="popup-pos">"${item.phrase}"</span>
                </div>
                <button class="popup-close" onclick="this.parentElement.parentElement.classList.add('hidden')">Close</button>
              </div>
              <p class="popup-def"><strong>Meaning:</strong> ${item.meaning}</p>
              <p class="popup-quote"><strong>Text Context:</strong> "${item.context}"</p>
            `;
          }
        });
      });

      const readBtn = container.querySelector('#read-aloud-article-btn');
      readBtn?.addEventListener('click', () => {
        if (this.tts.isSpeaking) {
          this.tts.stop();
          readBtn.textContent = 'Listen to Article';
        } else {
          readBtn.textContent = 'Stop Reading';
          const fullText = r.paragraphs.map(p => p.text.replace(/\[|\]/g, '')).join(' ');
          this.tts.speak(fullText, {
            rate: 0.95,
            onEnd: () => { readBtn.textContent = 'Listen to Article'; }
          });
        }
      });
    }

    // --- SLIDE 8: READING PART 3 (7 EXAM QUESTIONS) ---
    getSlide8HTML() {
      const r = this.data.reading;
      const state = this.studentState.readingMC;
      return `
        <div class="slide slide-reading animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 16 & 17 • Reading – Part 3 (Comprehension)</span>
              <h2 class="slide-title">Exam Questions 1 to 7</h2>
            </div>
            <span class="badge badge-warning">Cambridge 4-Option Multiple Choice</span>
          </div>

          <div class="mc-quiz-container">
            ${r.questions.map(q => {
              const isChecked = !!(this.studentState.checked && this.studentState.checked.readingMC);
              const currentChoice = state[q.id] || "";
              const isCorrect = currentChoice === q.correct;
              const showFeedback = this.isTeacherMode || isChecked;
              return `
                <div class="mc-card ${showFeedback ? (isCorrect ? 'mc-correct' : 'mc-incorrect') : ''}" id="mc-card-${q.id}">
                  <div class="mc-question-title">
                    <h4>${q.question}</h4>
                  </div>
                  <div class="mc-options-grid">
                    ${q.options.map(opt => {
                      const isSelected = (this.isTeacherMode ? q.correct : currentChoice) === opt.letter;
                      const isTheRightOne = opt.letter === q.correct;
                      return `
                        <label class="mc-option-label ${isSelected ? 'selected' : ''} ${(this.isTeacherMode || (isChecked && isTheRightOne)) ? 'option-target' : ''}">
                          <input type="radio"
                            name="mc-q-${q.id}"
                            value="${opt.letter}"
                            data-qid="${q.id}"
                            ${isSelected ? 'checked' : ''} />
                          <span class="opt-letter">${opt.letter}</span>
                          <span class="opt-text">${opt.text}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                  <div class="mc-explanation ${this.isTeacherMode || isChecked ? '' : 'hidden'}" id="mc-exp-${q.id}">
                    <strong>Correct Key: [${q.correct}]</strong> — ${q.explanation}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="mc-footer-actions">
            <button class="btn btn-success btn-lg" id="check-mc-btn">Score My Reading Answers</button>
            ${(() => {
              const isChecked = !!(this.studentState.checked && this.studentState.checked.readingMC);
              if (!isChecked && !this.isTeacherMode) return '<div id="mc-total-score-badge" class="score-badge-large hidden"></div>';
              let score = 0;
              r.questions.forEach(q => {
                if (state[q.id] === q.correct) score++;
              });
              return `<div id="mc-total-score-badge" class="score-badge-large">Score: ${score} / 7 (${Math.round((score / 7) * 100)}%)</div>`;
            })()}
          </div>
        </div>
      `;
    }

    bindReadingMCEvents(container) {
      const r = this.data.reading;

      container.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
          const qid = radio.getAttribute('data-qid');
          this.studentState.readingMC[qid] = radio.value;
          this.saveState();
        });
      });

      container.querySelector('#check-mc-btn')?.addEventListener('click', () => {
        let score = 0;
        r.questions.forEach(q => {
          if (this.studentState.readingMC[q.id] === q.correct) score++;
        });

        if (score >= 5) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.readingMC = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 9: VOCABULARY & DISCUSSION WORKSHOP ---
    getSlide9HTML() {
      const r = this.data.reading;
      return `
        <div class="slide slide-reading animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 17 • Vocabulary Practice & Analysis</span>
              <h2 class="slide-title">Vocabulary Workshop & Class Poll</h2>
            </div>
            <span class="badge badge-accent">Activities 3, 4 & 5</span>
          </div>

          <!-- Activity 3a: Synonyms for Miserable (Interactive) -->
          <div class="vocab-workshop-card mb-4">
            <div class="workshop-header">
              <span class="section-tag">[Vocabulary Search]</span>
              <div>
                <h4>3a. Find at least three words or phrases in the text which are synonyms for 'miserable':</h4>
                <p>Type the synonyms you discovered in the article text below, then click Check:</p>
              </div>
            </div>

            <div class="synonyms-interactive-box">
              <div class="synonym-inputs-list">
                ${[0, 1, 2].map(idx => {
                  const val = ((this.studentState.synonymsMiserable && this.studentState.synonymsMiserable[idx]) || "").trim();
                  const isChecked = !!(this.studentState.checked && this.studentState.checked.synonymsMiserable);
                  const isMatch = r.miserableSynonyms.some(s => s.word.toLowerCase() === val.toLowerCase());
                  const statusClass = isChecked ? (isMatch ? 'syn-correct' : 'syn-incorrect') : '';
                  return `
                    <div class="synonym-input-row">
                      <label class="synonym-input-label">Synonym #${idx + 1}:</label>
                      <input type="text"
                        class="synonym-input ${statusClass}"
                        data-syn-idx="${idx}"
                        value="${this.isTeacherMode ? r.miserableSynonyms[idx].word : val}"
                        placeholder="e.g. type synonym..." />
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="actions-bar mt-2">
                <button class="btn btn-success" id="check-synonyms-btn">Check Synonyms</button>
              </div>

              ${(this.studentState.checked && this.studentState.checked.synonymsMiserable) || this.isTeacherMode ? `
                <div class="synonym-feedback-card mt-3">
                  <strong>Synonyms in the Article:</strong>
                  <ul style="padding-left: 20px; margin-top: 6px;">
                    ${r.miserableSynonyms.map(s => `
                      <li><strong>${s.word}</strong> — ${s.hint}</li>
                    `).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Activity 4: Idiomatic Expressions Deep Dive -->
          <div class="vocab-workshop-card mb-4">
            <div class="workshop-header">
              <span class="section-tag">[Idioms & Metaphors]</span>
              <div>
                <h4>4. Text Analysis: What does the writer mean by these underlined phrases?</h4>
              </div>
            </div>
            <div class="idioms-grid">
              ${r.idioms.map(idm => `
                <div class="idiom-card">
                  <h4 class="idiom-title">"${idm.phrase}"</h4>
                  <p class="idiom-def">${idm.meaning}</p>
                  <span class="idiom-badge">Text Example: "${idm.context}"</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Activity 5c: Interactive Class Poll: What makes you happy? -->
          <div class="poll-widget-card">
            <div class="workshop-header">
              <span class="section-tag">[Classroom Poll]</span>
              <div>
                <h4>5c. THINK! What are the 5 most important things that make you feel happy?</h4>
                <p>Vote for your top priorities to see live aggregate classroom results:</p>
              </div>
            </div>

            <div class="poll-options-grid">
              ${[
                { label: "Close Personal Friendships", votes: 42, code: "A" },
                { label: "Loving Family Life", votes: 38, code: "B" },
                { label: "Good Physical & Mental Health", votes: 35, code: "C" },
                { label: "Meaningful & Engaging Work", votes: 21, code: "D" },
                { label: "Financial Security & Wealth", votes: 14, code: "E" },
                { label: "Creative Hobbies & Leisure", votes: 19, code: "F" }
              ].map(opt => `
                <div class="poll-card" onclick="window.app.votePoll(this)">
                  <span class="poll-badge">[Option ${opt.code}]</span>
                  <div class="poll-info">
                    <strong>${opt.label}</strong>
                    <div class="poll-meter-track">
                      <div class="poll-meter-fill" style="width: ${opt.votes * 2}%"></div>
                    </div>
                  </div>
                  <span class="poll-count">${opt.votes} votes</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    bindReadingVocabEvents(container) {
      container.querySelectorAll('.synonym-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const idx = parseInt(inp.getAttribute('data-syn-idx'), 10);
          this.studentState.synonymsMiserable = this.studentState.synonymsMiserable || ["", "", ""];
          this.studentState.synonymsMiserable[idx] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-synonyms-btn')?.addEventListener('click', () => {
        const r = this.data.reading;
        const entered = (this.studentState.synonymsMiserable || []).map(w => (w || "").trim().toLowerCase()).filter(Boolean);
        const matches = entered.filter(w => r.miserableSynonyms.some(s => s.word.toLowerCase() === w));
        if (matches.length >= 2) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.synonymsMiserable = true;
        this.saveState();
        this.updateView();
      });
    }

    votePoll(cardEl) {
      this.sfx.playClick();
      cardEl.classList.toggle('voted');
      const countEl = cardEl.querySelector('.poll-count');
      const fillEl = cardEl.querySelector('.poll-meter-fill');
      if (countEl && fillEl) {
        let num = parseInt(countEl.textContent, 10);
        if (cardEl.classList.contains('voted')) {
          num++;
          fillEl.style.width = `${Math.min(100, num * 2)}%`;
        } else {
          num--;
          fillEl.style.width = `${Math.min(100, num * 2)}%`;
        }
        countEl.textContent = `${num} votes`;
      }
    }

    // --- SLIDE 10: USE OF ENGLISH - GERUNDS AS SUBJECTS (EX 1) ---
    getSlide10HTML() {
      const u = this.data.useOfEnglish;
      const ex = u.ex1a;
      const state = this.studentState.useOfEnglish1a;
      return `
        <div class="slide slide-grammar animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 18 • Use of English: Gerund / Infinitive</span>
              <h2 class="slide-title">1. Sentence Transformation with Gerunds</h2>
            </div>
            <span class="badge badge-primary">Grammar Reference: -ing Subjects</span>
          </div>

          <!-- Model Example Card -->
          <div class="model-example-box mb-4">
            <span class="badge badge-accent">Textbook Example:</span>
            <div class="example-transformation">
              <span class="ex-orig">Original: <em>"${ex.example.original}"</em></span>
              <span class="ex-arrow">→</span>
              <span class="ex-new">Gerund Subject: <strong>"${ex.example.rewritten}"</strong></span>
            </div>
            <p class="ex-note">Rule: When a clause acts as the subject of the sentence, English strongly prefers the gerund form (-ing) over the infinitive.</p>
          </div>

          <!-- Exercises 2, 3, 4 -->
          <div class="transform-list">
            ${ex.items.map(item => {
              const checkedMap = (this.studentState.checked && this.studentState.checked.useOfEnglish1a) || {};
              const isChecked = !!checkedMap[item.id];
              const currentVal = state[item.id] || "";
              const isMatch = currentVal.trim().toLowerCase().replace(/[.,!]/g, '') === item.expected.toLowerCase().replace(/[.,!]/g, '');
              const show = this.isTeacherMode || isChecked;
              return `
                <div class="transform-card ${show ? (isMatch ? 'card-correct' : 'card-incorrect') : ''}">
                  <div class="orig-line">
                    <span class="item-num">${item.id}.</span>
                    <span class="orig-text">"${item.original}"</span>
                  </div>
                  <div class="input-line">
                    <input type="text"
                      class="transform-input"
                      data-id="${item.id}"
                      value="${this.isTeacherMode ? item.expected : currentVal}"
                      placeholder="Rewrite starting with a gerund (-ing)..." />
                    <button class="btn btn-sm btn-outline check-single-1a" data-id="${item.id}">Check</button>
                  </div>
                  ${this.isTeacherMode || isChecked ? `<div class="model-key">Model Answer: <strong>${item.expected}</strong></div>` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Ex 1b Personal Reflection -->
          <div class="prompt-box mt-4">
            <div class="prompt-header">
              <span class="section-tag">[Speaking / Writing]</span>
              <strong>1b. Answer these questions in the two ways shown above:</strong>
            </div>
            <div class="questions-reflection-grid">
              <div class="reflection-item">
                <span class="badge badge-outline">1</span>
                <p>What takes you a long time?</p>
                <input type="text" class="form-input" placeholder="e.g. Commuting to work takes me..." />
              </div>
              <div class="reflection-item">
                <span class="badge badge-outline">2</span>
                <p>What is nearly impossible for you?</p>
                <input type="text" class="form-input" placeholder="e.g. Waking up before 6 AM is..." />
              </div>
              <div class="reflection-item">
                <span class="badge badge-outline">3</span>
                <p>What makes you feel really happy?</p>
                <input type="text" class="form-input" placeholder="e.g. Travelling to new countries makes..." />
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bindUseOfEnglish1Events(container) {
      container.querySelectorAll('.transform-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const id = inp.getAttribute('data-id');
          this.studentState.useOfEnglish1a[id] = e.target.value;
          this.saveState();
        });
      });

      container.querySelectorAll('.check-single-1a').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const item = this.data.useOfEnglish.ex1a.items.find(i => i.id === id);
          const val = (this.studentState.useOfEnglish1a[id] || "").trim().toLowerCase().replace(/[.,!]/g, '');
          const expected = item.expected.toLowerCase().replace(/[.,!]/g, '');
          this.studentState.checked = this.studentState.checked || {};
          this.studentState.checked.useOfEnglish1a = this.studentState.checked.useOfEnglish1a || {};
          this.studentState.checked.useOfEnglish1a[id] = true;
          this.saveState();
          if (val === expected) {
            this.sfx.playCorrect();
          } else {
            this.sfx.playIncorrect();
          }
          this.updateView();
        });
      });
    }

    // --- SLIDE 11: USE OF ENGLISH - PREPOSITIONS WITH GERUNDS (EX 2) ---
    getSlide11HTML() {
      const u = this.data.useOfEnglish;
      const ex = u.ex2a;
      const state = this.studentState.useOfEnglish2a;
      return `
        <div class="slide slide-grammar animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 18 • Use of English: Prepositions</span>
              <h2 class="slide-title">2a. Dependent Prepositions + Gerunds</h2>
            </div>
            <span class="badge badge-accent">14 High-Yield Cambridge Collocations</span>
          </div>

          <div class="grammar-rule-callout mb-4">
            <span><strong>CAMBRIDGE RULE:</strong> Any verb that immediately follows a preposition (of, in, for, on, with, about, etc.) MUST be in the <strong>gerund (-ing)</strong> form! Example: <em>"I strongly disapprove <strong>of</strong> teenagers <strong>returning</strong> home after 12."</em></span>
          </div>

          <!-- 14 Prepositions Grid -->
          <div class="prep-cards-grid">
            ${ex.items.map(item => {
              const isChecked = !!(this.studentState.checked && this.studentState.checked.useOfEnglish2a);
              const currentVal = (state[item.id] || "").trim().toLowerCase();
              const isMatch = currentVal === item.prep.toLowerCase() || (item.alt && currentVal === item.alt.toLowerCase());
              const show = this.isTeacherMode || isChecked;
              return `
                <div class="prep-card ${show ? (isMatch ? 'prep-correct' : 'prep-incorrect') : ''}">
                  <span class="prep-num">${item.id}</span>
                  <div class="prep-content">
                    <span class="prep-verb">${item.phrase}</span>
                    <input type="text"
                      class="prep-input"
                      data-id="${item.id}"
                      value="${this.isTeacherMode ? item.prep : currentVal}"
                      placeholder="..."
                      maxlength="10" />
                    ${this.isTeacherMode || (isChecked && !isMatch) ? `<span class="prep-key">[${item.prep}]</span>` : ''}
                  </div>
                  <div class="prep-tooltip" title="${item.example}">[Example]</div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="actions-bar mt-4">
            <button class="btn btn-success" id="check-preps-btn">Check All 14 Prepositions</button>
            ${(() => {
              const isChecked = !!(this.studentState.checked && this.studentState.checked.useOfEnglish2a);
              if (!isChecked && !this.isTeacherMode) return '<div id="preps-score-box" class="feedback-box hidden"></div>';
              let score = 0;
              ex.items.forEach(item => {
                const val = (state[item.id] || "").trim().toLowerCase();
                if (val === item.prep.toLowerCase() || (item.alt && val === item.alt.toLowerCase())) score++;
              });
              return `<div id="preps-score-box" class="feedback-box feedback-info"><strong>Score: ${score} / 14 Prepositions Correct!</strong></div>`;
            })()}
          </div>
        </div>
      `;
    }

    bindUseOfEnglish2Events(container) {
      const ex = this.data.useOfEnglish.ex2a;

      container.querySelectorAll('.prep-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const id = inp.getAttribute('data-id');
          this.studentState.useOfEnglish2a[id] = e.target.value;
          this.saveState();
        });
      });

      container.querySelectorAll('.prep-tooltip').forEach(el => {
        el.addEventListener('click', () => {
          alert(el.getAttribute('title'));
        });
      });

      container.querySelector('#check-preps-btn')?.addEventListener('click', () => {
        let score = 0;
        ex.items.forEach(item => {
          const val = (this.studentState.useOfEnglish2a[item.id] || "").trim().toLowerCase();
          if (val === item.prep.toLowerCase() || (item.alt && val === item.alt.toLowerCase())) {
            score++;
          }
        });
        if (score >= 11) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.useOfEnglish2a = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 12: USE OF ENGLISH - PHRASAL VERBS (EX 3) ---
    getSlide12HTML() {
      const u = this.data.useOfEnglish;
      const ex = u.ex3;
      const state = this.studentState.useOfEnglish3a;
      return `
        <div class="slide slide-grammar animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 18 • Activities 3a & 3b</span>
              <h2 class="slide-title">Phrasal Verbs: Matching & Rewriting</h2>
            </div>
            <span class="badge badge-warning">C1 Vocabulary Range</span>
          </div>

          <!-- 3a: Matching Phrasal Verbs to Meanings -->
          <div class="phrasal-matching-section mb-4">
            <div class="section-title-bar">
              <h4>3a. Match these phrasal verbs with their definitions:</h4>
            </div>

            <div class="phrasal-grid">
              ${ex.matching.map(item => {
                const isChecked3a = !!(this.studentState.checked && this.studentState.checked.useOfEnglish3a);
                const currentVal = state[item.id] || "";
                const isMatch = currentVal === item.meaningId;
                const show = this.isTeacherMode || isChecked3a;
                return `
                  <div class="phrasal-card ${show ? (isMatch ? 'card-correct' : 'card-incorrect') : ''}">
                    <div class="phrasal-verb-name">
                      <span class="phrasal-num">${item.id}</span>
                      <strong>${item.verb}</strong>
                    </div>
                    <div class="phrasal-select-wrapper">
                      <select class="form-select phrasal-sel" data-id="${item.id}">
                        <option value="">Select Meaning...</option>
                        <option value="a" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'a' ? 'selected' : ''}>a. rely</option>
                        <option value="b" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'b' ? 'selected' : ''}>b. start (e.g. a hobby)</option>
                        <option value="c" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'c' ? 'selected' : ''}>c. stop trying</option>
                        <option value="d" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'd' ? 'selected' : ''}>d. ignore</option>
                        <option value="e" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'e' ? 'selected' : ''}>e. compensate</option>
                        <option value="f" ${(this.isTeacherMode ? item.meaningId : currentVal) === 'f' ? 'selected' : ''}>f. examine</option>
                      </select>
                      ${this.isTeacherMode || (isChecked3a && !isMatch) ? `<span class="answer-pill">[${item.meaningId}] ${item.meaning}</span>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="actions-bar mt-3">
              <button class="btn btn-success" id="check-phrasal-3a-btn">Check 3a Matching</button>
              ${(() => {
                const isChecked3a = !!(this.studentState.checked && this.studentState.checked.useOfEnglish3a);
                if (!isChecked3a && !this.isTeacherMode) return '';
                let score = 0;
                ex.matching.forEach(item => {
                  if (state[item.id] === item.meaningId) score++;
                });
                return `<div class="feedback-box feedback-info"><strong>Score: ${score} / ${ex.matching.length} Matches Correct</strong></div>`;
              })()}
            </div>
          </div>

          <!-- 3b: Rewriting Sentences with Phrasal Verbs + Gerunds (Interactive) -->
          <div class="phrasal-rewrites-section">
            <div class="section-title-bar">
              <h4>3b. Rewrite using the phrasal verbs in Ex 3a. Use gerunds where possible:</h4>
            </div>

            <div class="rewrites-list">
              ${ex.rewrites.map(rw => {
                const isChecked3b = !!(this.studentState.checked && this.studentState.checked.useOfEnglish3b);
                const currentVal = (this.studentState.useOfEnglish3b && this.studentState.useOfEnglish3b[rw.id]) || "";
                return `
                  <div class="rewrite-card">
                    <div class="rw-orig">
                      <span class="rw-num">${rw.id}.</span>
                      <span class="rw-text">"${rw.original}"</span>
                      <span class="rw-target-tag">Target: ${rw.phrasalVerb}</span>
                    </div>
                    <div class="rewrite-input-wrap">
                      <input type="text"
                        class="rewrite-input"
                        data-rwid="${rw.id}"
                        placeholder="Write your rewritten sentence starting with subject..."
                        value="${this.isTeacherMode ? rw.model : currentVal}" />
                    </div>
                    <div class="rewrite-reveal ${this.isTeacherMode || isChecked3b ? '' : 'hidden'}">
                      → Model Answer: <strong>"${rw.model}"</strong>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="actions-bar mt-3">
              <button class="btn btn-success" id="check-rewrites-3b-btn">Check 3b Rewrites</button>
              ${(this.studentState.checked && this.studentState.checked.useOfEnglish3b) || this.isTeacherMode ? `
                <div class="feedback-box feedback-info">Review the Cambridge model transformations above against your answers.</div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }

    bindUseOfEnglish3Events(container) {
      container.querySelectorAll('.phrasal-sel').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const id = sel.getAttribute('data-id');
          this.studentState.useOfEnglish3a[id] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-phrasal-3a-btn')?.addEventListener('click', () => {
        let score = 0;
        const ex = this.data.useOfEnglish.ex3;
        ex.matching.forEach(item => {
          if (this.studentState.useOfEnglish3a[item.id] === item.meaningId) score++;
        });
        if (score >= 5) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.useOfEnglish3a = true;
        this.saveState();
        this.updateView();
      });

      container.querySelectorAll('.rewrite-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const rwid = inp.getAttribute('data-rwid');
          this.studentState.useOfEnglish3b = this.studentState.useOfEnglish3b || {};
          this.studentState.useOfEnglish3b[rwid] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-rewrites-3b-btn')?.addEventListener('click', () => {
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.useOfEnglish3b = true;
        this.sfx.playCorrect();
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 13: USE OF ENGLISH - VERB COMPLEMENTATION (EX 4) ---
    getSlide13HTML() {
      const u = this.data.useOfEnglish;
      const ex = u.ex4;
      const isChecked = !!(this.studentState.checked && this.studentState.checked.useOfEnglish4);
      return `
        <div class="slide slide-grammar animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 18 • Exercise 4</span>
              <h2 class="slide-title">Gerund vs. Infinitive Complementation</h2>
            </div>
            <span class="badge badge-accent">8 Key Cambridge Exam Patterns</span>
          </div>

          <div class="gapfill-exercise-box mb-4">
            <div class="gapfill-box-header">
              <h3>Fill the gaps with the gerund or infinitive of the verbs in parentheses:</h3>
            </div>

            <div class="verb-patterns-list">
              ${ex.items.map(item => `
                <div class="pattern-item-card" id="pattern-card-${item.id}">
                  <span class="pattern-num">${item.id}.</span>
                  <div class="pattern-sentence-content">
                    <p class="sentence-text">${this.formatEx4Sentence(item)}</p>
                    ${this.isTeacherMode || isChecked ? `
                      <div class="pattern-rules-tags">
                        ${item.gaps.map(g => `<span class="rule-chip"><strong>Rule:</strong> ${g.rule}</span>`).join(' ')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="gapfill-footer">
              <button class="btn btn-success" id="check-ex4-btn">Check All Sentences</button>
              ${(() => {
                if (!isChecked && !this.isTeacherMode) return '<div id="ex4-score-box" class="feedback-box hidden"></div>';
                let totalGaps = 0;
                let score = 0;
                ex.items.forEach(item => {
                  item.gaps.forEach((g, idx) => {
                    totalGaps++;
                    const key = `${item.id}_${idx}`;
                    const val = (this.studentState.useOfEnglish4[key] || "").trim().toLowerCase();
                    if (val === g.correct.toLowerCase()) score++;
                  });
                });
                return `<div id="ex4-score-box" class="feedback-box feedback-info"><strong>Score: ${score} / ${totalGaps} Verbs Correct!</strong></div>`;
              })()}
            </div>
          </div>
        </div>
      `;
    }

    formatEx4Sentence(item) {
      let raw = item.sentence;
      const isChecked = !!(this.studentState.checked && this.studentState.checked.useOfEnglish4);
      item.gaps.forEach((g, idx) => {
        const gapKey = `${item.id}_${idx}`;
        const currentVal = this.studentState.useOfEnglish4[gapKey] || "";
        const isMatch = currentVal.trim().toLowerCase() === g.correct.toLowerCase();
        const show = this.isTeacherMode || isChecked;

        const inputHTML = `
          <span class="inline-gap-box ${show ? (isMatch ? 'gap-ok' : 'gap-err') : ''}">
            <input type="text"
              class="ex4-input"
              data-gapkey="${gapKey}"
              value="${this.isTeacherMode ? g.correct : currentVal}"
              placeholder="(${g.base})" />
            ${this.isTeacherMode || (isChecked && !isMatch) ? `<span class="key-tooltip">${g.correct}</span>` : ''}
          </span>
        `;
        raw = raw.replace(`[${g.correct}]`, inputHTML);
      });
      return raw;
    }

    bindUseOfEnglish4Events(container) {
      const ex = this.data.useOfEnglish.ex4;

      container.querySelectorAll('.ex4-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const key = inp.getAttribute('data-gapkey');
          this.studentState.useOfEnglish4[key] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-ex4-btn')?.addEventListener('click', () => {
        let totalGaps = 0;
        let score = 0;
        ex.items.forEach(item => {
          item.gaps.forEach((g, idx) => {
            totalGaps++;
            const key = `${item.id}_${idx}`;
            const val = (this.studentState.useOfEnglish4[key] || "").trim().toLowerCase();
            if (val === g.correct.toLowerCase()) score++;
          });
        });

        if (score >= totalGaps - 2) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.useOfEnglish4 = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 14: USE OF ENGLISH - "TO SUCCESS" 6 RULES (EX 5) ---
    getSlide14HTML() {
      const u = this.data.useOfEnglish;
      const ex = u.ex5;
      const state = this.studentState.useOfEnglish5;
      const isChecked = !!(this.studentState.checked && this.studentState.checked.useOfEnglish5);
      return `
        <div class="slide slide-grammar animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Page 18 • Exercise 5</span>
              <h2 class="slide-title">Manifesto: 6 Rules "To Success"</h2>
            </div>
            <span class="badge badge-success">Authentic Magazine Article Layout</span>
          </div>

          <!-- Word Bank Box -->
          <div class="wordbank-card mb-4">
            <span class="wordbank-title">Word Bank (Use each in infinitive or -ing form):</span>
            <div class="wordbank-chips">
              ${ex.wordBank.map(w => `<span class="chip chip-accent">${w}</span>`).join('')}
            </div>
          </div>

          <!-- 6 Rules Golden Poster Card -->
          <div class="success-poster-card">
            <div class="poster-badge">TO SUCCESS</div>

            <div class="poster-rules-list">
              ${ex.rules.map(r => {
                const currentVal = (state[r.id] || "").trim().toLowerCase();
                const isMatch = Array.isArray(r.correct)
                  ? r.correct.some(c => c.toLowerCase() === currentVal)
                  : r.correct.toLowerCase() === currentVal;
                const show = this.isTeacherMode || isChecked;
                return `
                  <div class="rule-poster-item ${show ? (isMatch ? 'rule-correct' : 'rule-incorrect') : ''}">
                    <span class="rule-lead">${r.lead}</span>
                    <div class="rule-input-wrap">
                      <input type="text"
                        class="rule-input"
                        data-id="${r.id}"
                        value="${this.isTeacherMode ? (r.display || r.correct) : currentVal}"
                        placeholder="..." />
                      ${this.isTeacherMode || (isChecked && !isMatch) ? `<span class="rule-key">[${r.display || r.correct}]</span>` : ''}
                    </div>
                    <span class="rule-trail">${r.trail}</span>
                    ${this.isTeacherMode || isChecked ? `<span class="rule-exp-tag"><strong>Rule:</strong> ${r.rule}</span>` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <div class="poster-footer-bar">
              <button class="btn btn-primary" id="check-rules-btn">Validate 6 Rules</button>
              ${(() => {
                if (!isChecked && !this.isTeacherMode) return '<div id="rules-score-badge" class="score-badge-large hidden"></div>';
                let score = 0;
                ex.rules.forEach(r => {
                  const val = (state[r.id] || "").trim().toLowerCase();
                  const match = Array.isArray(r.correct)
                    ? r.correct.some(c => c.toLowerCase() === val)
                    : r.correct.toLowerCase() === val;
                  if (match) score++;
                });
                return `<div id="rules-score-badge" class="score-badge-large">${score} / 6 Rules Correct!</div>`;
              })()}
            </div>
          </div>
        </div>
      `;
    }

    bindUseOfEnglish5Events(container) {
      const ex = this.data.useOfEnglish.ex5;

      container.querySelectorAll('.rule-input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const id = inp.getAttribute('data-id');
          this.studentState.useOfEnglish5[id] = e.target.value;
          this.saveState();
        });
      });

      container.querySelector('#check-rules-btn')?.addEventListener('click', () => {
        let score = 0;
        ex.rules.forEach(r => {
          const val = (this.studentState.useOfEnglish5[r.id] || "").trim().toLowerCase();
          const match = Array.isArray(r.correct)
            ? r.correct.some(c => c.toLowerCase() === val)
            : r.correct.toLowerCase() === val;
          if (match) score++;
        });

        if (score === 6) this.sfx.playCorrect(); else this.sfx.playIncorrect();
        this.studentState.checked = this.studentState.checked || {};
        this.studentState.checked.useOfEnglish5 = true;
        this.saveState();
        this.updateView();
      });
    }

    // --- SLIDE 15: SUMMARY DASHBOARD & CERTIFICATE ---
    getSlide15HTML() {
      const scores = this.calculateOverallScores();
      return `
        <div class="slide slide-summary animate-fade-in">
          <div class="slide-header">
            <div>
              <span class="slide-kicker">Unit 1 Complete • Cambridge English: Advanced</span>
              <h2 class="slide-title">Lesson Summary & Performance Record</h2>
            </div>
            <span class="badge badge-accent">Overall Score: ${scores.totalPercentage}%</span>
          </div>

          <!-- Score Breakdown Grid -->
          <div class="dashboard-scores-grid">
            <div class="score-stat-card">
              <span class="stat-tag">Listening</span>
              <h4>Page 14</h4>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: ${scores.listeningPct}%"></div>
              </div>
              <span class="stat-numbers">${scores.listeningScore} / ${scores.listeningMax} (${scores.listeningPct}%)</span>
            </div>

            <div class="score-stat-card">
              <span class="stat-tag">Speaking</span>
              <h4>Page 15</h4>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: ${scores.speakingPct}%"></div>
              </div>
              <span class="stat-numbers">${scores.speakingScore} / ${scores.speakingMax} (${scores.speakingPct}%)</span>
            </div>

            <div class="score-stat-card">
              <span class="stat-tag">Reading</span>
              <h4>Pages 16–17</h4>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: ${scores.readingPct}%"></div>
              </div>
              <span class="stat-numbers">${scores.readingScore} / ${scores.readingMax} (${scores.readingPct}%)</span>
            </div>

            <div class="score-stat-card">
              <span class="stat-tag">Grammar</span>
              <h4>Page 18</h4>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: ${scores.grammarPct}%"></div>
              </div>
              <span class="stat-numbers">${scores.grammarScore} / ${scores.grammarMax} (${scores.grammarPct}%)</span>
            </div>
          </div>

          <!-- Certificate of Completion Card -->
          <div class="certificate-box">
            <div class="cert-border">
              <div class="cert-header">
                <span class="cert-emblem-badge">CAMBRIDGE C1</span>
                <h3>Cambridge English: Advanced (CAE)</h3>
                <p>Certificate of Unit 1 Achievement</p>
              </div>
              <p class="cert-text">This certifies mastery of <strong>Unit 1: Happiness & Success</strong> covering Listening Parts 2 & 4, Speaking Part 2 Photo Compare & Speculate, Reading Part 3 Multiple Choice, and Gerund / Infinitive Complementation.</p>
              <div class="cert-footer">
                <span>Date: ${new Date().toLocaleDateString()}</span>
                <span>Antigravity Educational Suite</span>
              </div>
            </div>
          </div>

          <div class="dashboard-actions">
            <button class="btn btn-primary" onclick="window.print()">Print / Save Lesson Certificate</button>
            <button class="btn btn-outline" id="reset-all-progress-btn">Reset All Exercise Progress</button>
            <button class="btn btn-secondary" onclick="window.app.switchView('workbook')">Browse Full Digital Textbook</button>
          </div>
        </div>
      `;
    }

    bindSummaryEvents(container) {
      container.querySelector('#reset-all-progress-btn')?.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all your answers for Unit 1?")) {
          localStorage.removeItem('cambridge_unit1_state');
          this.studentState = {
            listeningPart4Task1: {},
            listeningPart4Task2: {},
            listeningPart2Gaps: {},
            readingMC: {},
            synonymsMiserable: ["", "", ""],
            everydayEnglish: {},
            useOfEnglish1a: {},
            useOfEnglish2a: {},
            useOfEnglish3a: {},
            useOfEnglish3b: {},
            useOfEnglish4: {},
            useOfEnglish5: {},
            checked: {}
          };
          this.updateView();
          alert("Progress reset successfully.");
        }
      });
    }

    calculateOverallScores() {
      let lScore = 0;
      const sps = this.data.listening.part4.speakers;
      sps.forEach(sp => {
        if (this.studentState.listeningPart4Task1[sp.id] === sp.task1Answer) lScore++;
        if (this.studentState.listeningPart4Task2[sp.id] === sp.task2Answer) lScore++;
      });
      this.data.listening.part2.questions.forEach(q => {
        const val = (this.studentState.listeningPart2Gaps[q.num] || "").trim().toLowerCase();
        if (q.acceptedAnswers.some(a => a.toLowerCase() === val)) lScore++;
      });

      let sScore = 0;
      this.data.speaking.everydayEnglish.scenarios.forEach(sc => {
        if (this.studentState.everydayEnglish[sc.id] === sc.bestResponse) sScore++;
      });

      let rScore = 0;
      this.data.reading.questions.forEach(q => {
        if (this.studentState.readingMC[q.id] === q.correct) rScore++;
      });

      let gScore = 0;
      this.data.useOfEnglish.ex1a.items.forEach(i => {
        const val = (this.studentState.useOfEnglish1a[i.id] || "").trim().toLowerCase().replace(/[.,!]/g, '');
        if (val === i.expected.toLowerCase().replace(/[.,!]/g, '')) gScore++;
      });
      this.data.useOfEnglish.ex2a.items.forEach(i => {
        const val = (this.studentState.useOfEnglish2a[i.id] || "").trim().toLowerCase();
        if (val === i.prep.toLowerCase() || (i.alt && val === i.alt.toLowerCase())) gScore++;
      });
      this.data.useOfEnglish.ex3.matching.forEach(i => {
        if (this.studentState.useOfEnglish3a[i.id] === i.meaningId) gScore++;
      });
      this.data.useOfEnglish.ex4.items.forEach(i => {
        i.gaps.forEach((g, idx) => {
          const key = `${i.id}_${idx}`;
          if ((this.studentState.useOfEnglish4[key] || "").trim().toLowerCase() === g.correct.toLowerCase()) gScore++;
        });
      });
      this.data.useOfEnglish.ex5.rules.forEach(r => {
        const val = (this.studentState.useOfEnglish5[r.id] || "").trim().toLowerCase();
        const match = Array.isArray(r.correct) ? r.correct.some(c => c.toLowerCase() === val) : r.correct.toLowerCase() === val;
        if (match) gScore++;
      });

      const totalMax = 18 + 5 + 7 + 40;
      const totalScore = lScore + sScore + rScore + gScore;

      return {
        listeningScore: lScore, listeningMax: 18, listeningPct: Math.round((lScore / 18) * 100),
        speakingScore: sScore, speakingMax: 5, speakingPct: Math.round((sScore / 5) * 100),
        readingScore: rScore, readingMax: 7, readingPct: Math.round((rScore / 7) * 100),
        grammarScore: gScore, grammarMax: 40, grammarPct: Math.round((gScore / 40) * 100),
        totalScore, totalMax, totalPercentage: Math.round((totalScore / totalMax) * 100)
      };
    }

    updateScoreboard() {}

    // --- WORKBOOK VIEW RENDER ENGINE ---
    renderWorkbook() {
      const container = document.getElementById('workbook-container');
      if (!container) return;

      container.innerHTML = `
        <div class="workbook-view animate-fade-in">
          <div class="workbook-header">
            <div>
              <span class="badge badge-primary">Digital Workbook Edition</span>
              <h2>Cambridge English: Advanced • Unit 1 (Pages 14–18)</h2>
            </div>
            <button class="btn btn-outline" onclick="window.app.switchView('presentation')">
              Return to Slide Deck Presentation
            </button>
          </div>

          <!-- Section 1: Page 14 -->
          <div class="workbook-page-section" id="wb-page-14">
            <div class="page-ribbon">Page 14 • Listening & Speaking</div>
            ${this.getSlide2HTML()}
            <hr class="section-divider" />
            ${this.getSlide3HTML()}
          </div>

          <!-- Section 2: Page 15 -->
          <div class="workbook-page-section" id="wb-page-15">
            <div class="page-ribbon">Page 15 • Speaking: Compare & Speculate</div>
            ${this.getSlide4HTML()}
            <hr class="section-divider" />
            ${this.getSlide5HTML()}
            <hr class="section-divider" />
            ${this.getSlide6HTML()}
          </div>

          <!-- Section 3: Pages 16 & 17 -->
          <div class="workbook-page-section" id="wb-page-16-17">
            <div class="page-ribbon">Pages 16 & 17 • Reading: Life's Good! Why So Bad?</div>
            ${this.getSlide7HTML()}
            <hr class="section-divider" />
            ${this.getSlide8HTML()}
            <hr class="section-divider" />
            ${this.getSlide9HTML()}
          </div>

          <!-- Section 4: Page 18 -->
          <div class="workbook-page-section" id="wb-page-18">
            <div class="page-ribbon">Page 18 • Use of English: Gerund & Infinitive</div>
            ${this.getSlide10HTML()}
            <hr class="section-divider" />
            ${this.getSlide11HTML()}
            <hr class="section-divider" />
            ${this.getSlide12HTML()}
            <hr class="section-divider" />
            ${this.getSlide13HTML()}
            <hr class="section-divider" />
            ${this.getSlide14HTML()}
          </div>
        </div>
      `;

      this.bindListeningPart4Events(container);
      this.bindListeningPart2Events(container);
      this.bindSpeakingAchievementsEvents(container);
      this.bindSpeakingCelebrationsEvents(container);
      this.bindEverydayEnglishEvents(container);
      this.bindReadingTextEvents(container);
      this.bindReadingMCEvents(container);
      this.bindReadingVocabEvents(container);
      this.bindUseOfEnglish1Events(container);
      this.bindUseOfEnglish2Events(container);
      this.bindUseOfEnglish3Events(container);
      this.bindUseOfEnglish4Events(container);
      this.bindUseOfEnglish5Events(container);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
    window.app.init();
  });

})();
