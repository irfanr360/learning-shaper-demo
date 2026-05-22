// ─── Learning Shaper App Interactivity & Simulations ────────────────

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ================= STATE DEFINITIONS =================
  const STUDENT_PROFILES = {
    aarif: {
      name: "Aarif Al-Masoom",
      class: "Class 10 · Roll #04",
      avatar: "AA",
      algebra: 62,
      geometry: 88,
      trigonometry: 74,
      radarPoints: "100,60 160,85 140,150 70,130 50,90",
      tagline: "Showing Aarif's strengths & weak areas derived from midterm OMR sheets.",
      recommendation: "Aarif has demonstrated strong visualization in **geometry** (88%), but struggles with algebraic manipulations. Recommended personalized practice focusing on quadratic factorisations."
    },
    samira: {
      name: "Samira Jahan",
      class: "Class 10 · Roll #02",
      avatar: "SJ",
      algebra: 91,
      geometry: 72,
      trigonometry: 85,
      radarPoints: "100,30 145,105 130,120 85,160 40,75",
      tagline: "Showing Samira's strengths & weak areas derived from midterm OMR sheets.",
      recommendation: "Samira excels in advanced **algebra** (91%) and symbolic calculation. Showed minor gaps in geometry theorems. Suggesting 4 exercise units on circle theorems."
    },
    tanvir: {
      name: "Tanvir Rahman",
      class: "Class 10 · Roll #17",
      avatar: "TR",
      algebra: 54,
      geometry: 60,
      trigonometry: 92,
      radarPoints: "100,80 135,115 150,110 50,140 30,80",
      tagline: "Showing Tanvir's strengths & weak areas derived from midterm OMR sheets.",
      recommendation: "Tanvir has outstanding spatial analysis in **trigonometry** (92%), but algebraic speed requires reinforcing. Suggesting timing drill challenges on algebraic equations."
    }
  };

  const OMR_ANSWER_KEY = {
    1: "B", 2: "A", 3: "C", 4: "C", 5: "B",
    6: "A", 7: "D", 8: "C", 9: "B", 10: "A",
    11: "D", 12: "B", 13: "C", 14: "A", 15: "D"
  };

  let dashboardSelections = { 1: null, 2: null, 3: null, 4: null, 5: null };
  let fullSheetSelections = {};
  for (let i = 1; i <= 15; i++) {
    fullSheetSelections[i] = null;
  }

  let selectedStudent = "aarif";
  let teleTalkBalance = 2482.40;

  // ================= ELEMENT SELECTORS =================
  const themeBtn = document.getElementById("theme-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const pageTitle = document.getElementById("page-title");
  
  // Dashboard elements
  const dashBubbleRows = document.getElementById("dashboard-bubble-rows");
  const dashScanBtn = document.getElementById("dash-scan-btn");
  const dashScanStatus = document.getElementById("dash-scan-status");
  const dashGradingResult = document.getElementById("dash-grading-result");
  const dashScoreVal = document.getElementById("dash-score-val");
  const dashRankVal = document.getElementById("dash-rank-val");

  // AI Tab elements
  const selectBtns = document.querySelectorAll(".select-btn");
  const studentTagline = document.getElementById("student-tagline");
  const barAlgebra = document.getElementById("bar-algebra");
  const barAlgebraVal = document.getElementById("bar-algebra-val");
  const barGeometry = document.getElementById("bar-geometry");
  const barGeometryVal = document.getElementById("bar-geometry-val");
  const barTrig = document.getElementById("bar-trig");
  const barTrigVal = document.getElementById("bar-trig-val");
  const aiPlanText = document.getElementById("ai-plan-text");
  const aiProfileAvatar = document.getElementById("ai-profile-avatar");
  const aiProfileName = document.getElementById("ai-profile-name");
  const aiProfileClass = document.getElementById("ai-profile-class");
  const radarPoints = document.getElementById("radar-poly-points");

  // Lesson plan generator
  const generateLessonBtn = document.getElementById("generate-lesson-btn");
  const lessonTopicSelect = document.getElementById("lesson-topic-select");
  const lessonOutputBox = document.getElementById("lesson-output-box");

  // Comms / SMS elements
  const smsTemplateSelect = document.getElementById("sms-template-select");
  const smsBody = document.getElementById("sms-body");
  const sendSmsBtn = document.getElementById("send-sms-btn");
  const smsLogs = document.getElementById("sms-logs");

  const commsRecipientSelect = document.getElementById("comms-recipient-select");
  const commsTriggerSelect = document.getElementById("comms-trigger-select");
  const commsSmsBody = document.getElementById("comms-sms-body");
  const commsDispatchBtn = document.getElementById("comms-dispatch-btn");
  const commsFullLogs = document.getElementById("comms-full-logs");

  // Full OMR Tab
  const fullBubbleGrid = document.getElementById("full-bubble-grid");
  const fullScanBtn = document.getElementById("full-scan-btn");
  const fullScanProgress = document.getElementById("full-scan-progress");
  const progressStage = document.getElementById("scan-progress-stage");
  const progressPercent = document.getElementById("scan-progress-percent");
  const progressFill = document.getElementById("full-progress-fill");
  const fullScanResults = document.getElementById("full-scan-results");
  const correctCountEl = document.getElementById("correct-count");
  const incorrectCountEl = document.getElementById("incorrect-count");
  const flaggedCountEl = document.getElementById("flagged-count");
  const gradePercentEl = document.getElementById("grade-percent");
  const randomizeBubblesBtn = document.getElementById("randomize-bubbles");
  const clearBubblesBtn = document.getElementById("clear-bubbles");
  const pushSmsResultsBtn = document.getElementById("push-sms-results-btn");

  // Operations
  const busEta = document.getElementById("bus-eta");
  const routeEtaVal = document.getElementById("route-eta-val");
  const routeBusDesc = document.getElementById("route-bus-desc");

  // Toast container
  const toastHolder = document.getElementById("toast-holder");


  // ================= TOAST ALERTS SYSTEM =================
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✓" : "ℹ"}</span>
      <span class="toast-message">${message}</span>
    `;
    toastHolder.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px) scale(0.95)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ================= TAB SWAPPING LOGIC =================
  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      const tabId = item.getAttribute("data-tab");
      
      // Toggle menu items active class
      menuItems.forEach(mi => mi.classList.remove("active"));
      item.classList.add("active");
      
      // Toggle panes
      tabPanes.forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === tabId || (tabId === "dashboard" && pane.id === "dashboard")) {
          pane.classList.add("active");
        }
      });
      
      // Update page title
      const title = item.querySelector("span").textContent;
      pageTitle.textContent = title;
      
      // Scroll to top
      document.querySelector(".ls-main").scrollTop = 0;
    });
  });

  // ================= THEME TOGGLE (DARK MODE) =================
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    
    // Smooth transition toggle
    themeBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
      themeBtn.style.transform = "none";
    }, 300);
    
    if (isDark) {
      themeBtn.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      `;
      showToast("Dark Mode Enabled", "info");
    } else {
      themeBtn.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      `;
      showToast("Light Mode Enabled", "info");
    }
  });

  // ================= OMR SCANNER LOGIC =================
  
  // Render Dashboard 5-Question OMR preview
  function initDashboardOMR() {
    dashBubbleRows.innerHTML = "";
    for (let q = 1; q <= 5; q++) {
      const row = document.createElement("div");
      row.className = "bubble-row";
      row.innerHTML = `
        <span class="row-num">${q}.</span>
        <div class="bubbles-group">
          ${["A", "B", "C", "D"].map(opt => `
            <button class="bubble-btn" data-q="${q}" data-opt="${opt}">${opt}</button>
          `).join("")}
        </div>
      `;
      dashBubbleRows.appendChild(row);
    }
    
    // Add event listeners for mini bubble sheets
    dashBubbleRows.querySelectorAll(".bubble-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-q");
        const opt = btn.getAttribute("data-opt");
        
        // Deselect siblings
        dashBubbleRows.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(sibling => {
          sibling.classList.remove("filled", "correct", "wrong", "wrong-missed");
        });
        
        if (dashboardSelections[q] === opt) {
          dashboardSelections[q] = null;
        } else {
          dashboardSelections[q] = opt;
          btn.classList.add("filled");
        }
      });
    });
  }

  // Render full 15-Question sheet in exam tab
  function initFullOMR() {
    fullBubbleGrid.innerHTML = "";
    for (let q = 1; q <= 15; q++) {
      const cell = document.createElement("div");
      cell.className = "bubble-row";
      cell.innerHTML = `
        <span class="row-num" style="width: 25px;">Q${q}.</span>
        <div class="bubbles-group">
          ${["A", "B", "C", "D"].map(opt => `
            <button class="bubble-btn full-btn" data-q="${q}" data-opt="${opt}">${opt}</button>
          `).join("")}
        </div>
      `;
      fullBubbleGrid.appendChild(cell);
    }
    
    // Add event listeners
    fullBubbleGrid.querySelectorAll(".bubble-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-q");
        const opt = btn.getAttribute("data-opt");
        
        fullBubbleGrid.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(sibling => {
          sibling.classList.remove("filled", "correct", "wrong", "wrong-missed");
        });
        
        if (fullSheetSelections[q] === opt) {
          fullSheetSelections[q] = null;
        } else {
          fullSheetSelections[q] = opt;
          btn.classList.add("filled");
        }
      });
    });
  }

  // Dashboard AI scan trigger
  dashScanBtn.addEventListener("click", () => {
    dashScanBtn.classList.add("hidden");
    dashScanStatus.classList.remove("hidden");
    dashGradingResult.classList.add("hidden");
    
    // Simulated OMR scanning timer
    setTimeout(() => {
      dashScanStatus.classList.add("hidden");
      dashScanBtn.classList.remove("hidden");
      
      // Calculate scores
      let correct = 0;
      for (let q = 1; q <= 5; q++) {
        const selected = dashboardSelections[q];
        const correctKey = OMR_ANSWER_KEY[q];
        
        dashBubbleRows.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(btn => {
          const opt = btn.getAttribute("data-opt");
          if (selected === opt) {
            if (opt === correctKey) {
              btn.classList.add("correct");
              correct++;
            } else {
              btn.classList.add("wrong");
            }
          } else if (opt === correctKey) {
            btn.classList.add("wrong-missed");
          }
        });
      }
      
      dashScoreVal.textContent = `${correct}/5`;
      const ranks = ["#12/35", "#8/35", "#4/35", "#2/35", "#1/35", "#1/35"];
      dashRankVal.textContent = ranks[correct];
      dashGradingResult.classList.remove("hidden");
      
      showToast("Dashboard OMR Scan Complete!", "success");
    }, 1200);
  });

  // Dedicated Full OMR Tab triggers
  fullScanBtn.addEventListener("click", () => {
    fullScanBtn.classList.add("hidden");
    fullScanProgress.classList.remove("hidden");
    fullScanResults.classList.add("hidden");
    
    // Detailed stages simulation
    const stages = [
      { p: 15, msg: "Aligning anchor borders..." },
      { p: 40, msg: "Correcting ambient camera shadows..." },
      { p: 75, msg: "Resolving bubble detection conflicts..." },
      { p: 100, msg: "Compiling grades & metrics..." }
    ];
    
    let stageIdx = 0;
    
    function runStage() {
      if (stageIdx < stages.length) {
        const current = stages[stageIdx];
        progressStage.textContent = current.msg;
        progressPercent.textContent = `${current.p}%`;
        progressFill.style.width = `${current.p}%`;
        
        stageIdx++;
        setTimeout(runStage, 400);
      } else {
        // Compute marks
        completeFullGrading();
      }
    }
    
    runStage();
  });

  function completeFullGrading() {
    fullScanProgress.classList.add("hidden");
    fullScanBtn.classList.remove("hidden");
    
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    
    for (let q = 1; q <= 15; q++) {
      const selected = fullSheetSelections[q];
      const correctKey = OMR_ANSWER_KEY[q];
      
      if (!selected) unanswered++;
      
      fullBubbleGrid.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(btn => {
        const opt = btn.getAttribute("data-opt");
        btn.classList.remove("filled");
        
        if (selected === opt) {
          if (opt === correctKey) {
            btn.classList.add("correct");
            correct++;
          } else {
            btn.classList.add("wrong");
            wrong++;
          }
        } else if (opt === correctKey) {
          btn.classList.add("wrong-missed");
        }
      });
    }
    
    correctCountEl.textContent = correct;
    incorrectCountEl.textContent = wrong;
    flaggedCountEl.textContent = unanswered;
    
    const percentage = ((correct / 15) * 100).toFixed(1);
    let grade = "F";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A-";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    
    gradePercentEl.textContent = `${percentage}% (${grade})`;
    
    fullScanResults.classList.remove("hidden");
    showToast(`Exam Scanned. Score: ${correct}/15`, "success");
  }

  randomizeBubblesBtn.addEventListener("click", () => {
    const opts = ["A", "B", "C", "D"];
    for (let q = 1; q <= 15; q++) {
      // 80% chance to answer, 75% accuracy
      const answerChance = Math.random() < 0.9;
      if (answerChance) {
        const correctKey = OMR_ANSWER_KEY[q];
        const correctGuess = Math.random() < 0.75;
        const finalOpt = correctGuess ? correctKey : opts.filter(o => o !== correctKey)[Math.floor(Math.random() * 3)];
        
        fullSheetSelections[q] = finalOpt;
        
        fullBubbleGrid.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(btn => {
          btn.classList.remove("filled", "correct", "wrong", "wrong-missed");
          if (btn.getAttribute("data-opt") === finalOpt) {
            btn.classList.add("filled");
          }
        });
      } else {
        fullSheetSelections[q] = null;
        fullBubbleGrid.querySelectorAll(`.bubble-btn[data-q="${q}"]`).forEach(btn => {
          btn.classList.remove("filled", "correct", "wrong", "wrong-missed");
        });
      }
    }
    showToast("Filled bubbles randomly!", "info");
  });

  clearBubblesBtn.addEventListener("click", () => {
    for (let q = 1; q <= 15; q++) {
      fullSheetSelections[q] = null;
    }
    fullBubbleGrid.querySelectorAll(".bubble-btn").forEach(btn => {
      btn.className = "bubble-btn full-btn";
    });
    fullScanResults.classList.add("hidden");
    showToast("Bubble sheet reset", "info");
  });

  // Broadcast marks via SMS from exam tab
  pushSmsResultsBtn.addEventListener("click", () => {
    const correct = correctCountEl.textContent;
    const scoreText = `${correct}/15`;
    
    // Add entry to logs
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newLog = document.createElement("div");
    newLog.className = "log-entry";
    newLog.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-type exam">EXAM</span>
      <span class="log-msg">Mathematics midterm score (${scoreText}) broadcasted to Roll #04's guardian (+88017******22)</span>
    `;
    commsFullLogs.insertBefore(newLog, commsFullLogs.firstChild);
    
    // deduct balance
    teleTalkBalance -= 1.20;
    document.querySelectorAll(".comms-status-bar strong")[1].textContent = `৳${teleTalkBalance.toFixed(2)}`;
    
    showToast("Marks broadcasted to parents via Teletalk!", "success");
  });


  // ================= AI INSIGHTS SWITCHER =================
  selectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      selectBtns.forEach(sb => sb.classList.remove("active"));
      btn.classList.add("active");
      
      const studentId = btn.getAttribute("data-student");
      selectedStudent = studentId;
      const data = STUDENT_PROFILES[studentId];
      
      // Update UI texts
      studentTagline.textContent = data.tagline;
      barAlgebra.style.width = `${data.algebra}%`;
      barAlgebraVal.textContent = `${data.algebra}%`;
      barGeometry.style.width = `${data.geometry}%`;
      barGeometryVal.textContent = `${data.geometry}%`;
      barTrig.style.width = `${data.trigonometry}%`;
      barTrigVal.textContent = `${data.trigonometry}%`;
      aiPlanText.innerHTML = `"${data.recommendation}"`;

      // Update dedicated profile card elements
      aiProfileAvatar.textContent = data.avatar;
      aiProfileName.textContent = data.name;
      aiProfileClass.textContent = data.class;
      radarPoints.setAttribute("points", data.radarPoints);
      
      showToast(`Selected profile: ${data.name}`, "info");
    });
  });

  // AI Lesson Generator plan
  generateLessonBtn.addEventListener("click", () => {
    const topic = lessonTopicSelect.value;
    lessonOutputBox.innerHTML = `
      <div class="spinner" style="margin: 30px auto;"></div>
      <p style="text-align:center;font-family:var(--font-body);color:var(--text-muted);font-size:11px;">Generating dynamic curriculum structure...</p>
    `;
    
    setTimeout(() => {
      if (topic === "quadratics") {
        lessonOutputBox.innerHTML = `
          <div class="lesson-plan-result">
            <h5>📖 AI LESSON PLAN: QUADRATIC EQUATIONS</h5>
            <ul>
              <li><strong>Target cohort:</strong> 18 Students under 50% threshold.</li>
              <li><strong>Core Concept:</strong> Factoring $ax^2 + bx + c = 0$ using visual cross-multiplication sheets.</li>
              <li><strong>Remediation Strategy:</strong> Dual-bracket division sheets and OMR mock tracking diagnostic.</li>
              <li><strong>Homework generated:</strong> 10 Curated question banks, auto-tagged 'Factoring'.</li>
            </ul>
          </div>
        `;
      } else if (topic === "trigonometry") {
        lessonOutputBox.innerHTML = `
          <div class="lesson-plan-result">
            <h5>📖 AI LESSON PLAN: TRIGONOMETRIC IDENTITIES</h5>
            <ul>
              <li><strong>Target cohort:</strong> Section B Mathematics classes.</li>
              <li><strong>Core Concept:</strong> Pythagoras relation mapping ($\sin^2 \theta + \cos^2 \theta = 1$) visual proofs.</li>
              <li><strong>Remediation Strategy:</strong> Tri-color geometric blocks matching sine and cosine sweeps.</li>
              <li><strong>Diagnostics:</strong> 5-question OMR scanner alert tracking.</li>
            </ul>
          </div>
        `;
      } else {
        lessonOutputBox.innerHTML = `
          <div class="lesson-plan-result">
            <h5>📖 AI LESSON PLAN: ALGEBRAIC FACTORISATION</h5>
            <ul>
              <li><strong>Target cohort:</strong> Selected students showing weak calculations.</li>
              <li><strong>Core Concept:</strong> Polynomial expansions & cubic roots division tricks.</li>
              <li><strong>Remediation Strategy:</strong> Digital block representation puzzles.</li>
              <li><strong>Homework:</strong> Auto-emailed practice PDFs.</li>
            </ul>
          </div>
        `;
      }
      showToast("Dynamic AI lesson plan compiled!", "success");
    }, 1000);
  });

  // Support mini click generators
  document.querySelectorAll(".generate-lesson-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-topic");
      lessonTopicSelect.value = topic;
      // swap tab to AI center
      document.querySelector('[data-tab="ai-tab"]').click();
      generateLessonBtn.click();
    });
  });

  // Print Practice plan mock
  document.getElementById("generate-pdf-plan").addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Compiling Practice Pack PDF... Download started!", "success");
  });


  // ================= SMS COMMUNICATOR =================
  
  const SMS_TEMPLATES = {
    attendance: "Dear Parent, your child Aarif was absent for homeroom class at 9:00 AM on 2026-05-22. Please contact the coordinator if you have any questions.",
    exam: "Learning Shaper: Class 10 Math Midterm OMR results are processed. Aarif scored 12/15 (80.0%, Rank #4). Detail worksheet uploaded.",
    fees: "Dear Guardian, tuition billing outstanding balance of ৳3,500 is due by 2026-05-30. Please settle dues in the parent application link."
  };

  smsTemplateSelect.addEventListener("change", () => {
    smsBody.value = SMS_TEMPLATES[smsTemplateSelect.value];
  });

  sendSmsBtn.addEventListener("click", () => {
    const text = smsBody.value;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add entry to logs
    const newLog = document.createElement("div");
    newLog.className = "log-entry";
    newLog.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-type attendance">SMS</span>
      <span class="log-msg">${text.substring(0, 48)}... dispatched.</span>
    `;
    smsLogs.insertBefore(newLog, smsLogs.firstChild);
    
    teleTalkBalance -= 0.60;
    document.querySelectorAll(".comms-status-bar strong")[1].textContent = `৳${teleTalkBalance.toFixed(2)}`;
    
    showToast("SMS dispatched through gate!", "success");
  });

  // Comms Tab Bulk dispatcher
  commsDispatchBtn.addEventListener("click", () => {
    const target = commsRecipientSelect.value;
    const bodyText = commsSmsBody.value;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let count = 35;
    if (target === "failures") count = 18;
    else if (target === "all") count = 1247;
    
    const cost = count * 0.45;
    if (teleTalkBalance < cost) {
      showToast("Insufficient TeleTalk Gateway balance!", "error");
      return;
    }
    
    const newLog = document.createElement("div");
    newLog.className = "log-entry";
    newLog.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-type notice">BROADCAST</span>
      <span class="log-msg">Bulk broadcast sent to ${count} guardians. Delivery Rate: 99.8%. Message: "${bodyText.substring(0, 36)}..."</span>
    `;
    commsFullLogs.insertBefore(newLog, commsFullLogs.firstChild);
    
    teleTalkBalance -= cost;
    document.querySelectorAll(".comms-status-bar strong")[1].textContent = `৳${teleTalkBalance.toFixed(2)}`;
    
    showToast(`Bulk broadcast sent to ${count} parents!`, "success");
  });

  commsTriggerSelect.addEventListener("change", () => {
    const val = commsTriggerSelect.value;
    if (val === "report") {
      commsSmsBody.value = "Dear Parent, we have completed scanning of Class 10 Mathematics Midterms. The digital grade cards are now accessible in your parent app portal. Average: 74.2%.";
    } else if (val === "holiday") {
      commsSmsBody.value = "Emergency Alert: Learning Shaper schools will remain closed tomorrow, May 23rd, due to the severe weather protocol. Classes resume Sunday.";
    } else {
      commsSmsBody.value = "Enter your custom notice or operational update here to dispatch immediately to guardians.";
    }
  });


  // ================= OPERATIONS / TRANSPORT SIMULATOR LOOP =================
  let minutesLeft = 6;
  function updateTransportLoop() {
    minutesLeft--;
    if (minutesLeft <= 0) {
      minutesLeft = 8;
      routeBusDesc.textContent = "Bus #14 departed Dhanmondi Stop.";
      showToast("Bus #14 departed Dhanmondi Stop", "info");
    } else if (minutesLeft === 5) {
      routeBusDesc.textContent = "Approaching Flyover Junction.";
      showToast("Bus #14 approaching Flyover Junction", "info");
    } else if (minutesLeft === 1) {
      routeBusDesc.textContent = "Entering campus main gate.";
      showToast("Bus #14 arriving at main gate!", "success");
    }
    
    busEta.textContent = `${minutesLeft} min`;
    routeEtaVal.textContent = `${minutesLeft} min`;
  }
  
  // Tick route simulator every 1.5 minutes (90 seconds)
  setInterval(updateTransportLoop, 90000);


  // ================= PREPCAST DASHBOARD MODULE =================
  const defaultPodcasts = [
    {
      id: "math_quad",
      subject: "math",
      subjectLabel: "Math",
      chapter: "Quadratics Demystified",
      chapterNumber: "Chapter 1",
      difficulty: "Medium",
      author: "Mrs. Tasnim Jahan",
      listens: 84
    },
    {
      id: "phys_vectors",
      subject: "physics",
      subjectLabel: "Physics",
      chapter: "Force & Velocity Vectors",
      chapterNumber: "Chapter 2",
      difficulty: "Hard",
      author: "Dr. Arif Al-Hasan",
      listens: 112
    }
  ];

  function renderDashboardPodcasts() {
    const body = document.getElementById("dashPodcastsTableBody");
    if (!body) return;
    const raw = localStorage.getItem('school_podcasts_state');
    let podcasts = [];
    if (raw) {
      try {
        podcasts = JSON.parse(raw);
      } catch(e) {}
    }
    if (podcasts.length === 0) {
      podcasts = defaultPodcasts;
    }
    body.innerHTML = "";
    podcasts.forEach(p => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
      tr.innerHTML = `
        <td style="padding: 10px 12px; font-weight:600; color:#fff;">${p.chapter} <span style="font-size:9px; color:var(--text-muted);">${p.chapterNumber}</span></td>
        <td style="padding: 10px 12px;"><span class="badge" style="background:rgba(30,99,245,0.1); color:var(--primary); font-size:10px; padding:2px 6px;">${p.subjectLabel}</span></td>
        <td style="padding: 10px 12px; color:var(--text-muted);">${p.difficulty}</td>
        <td style="padding: 10px 12px; color:var(--text-muted);">${p.author}</td>
        <td style="padding: 10px 12px; text-align:right; font-weight:700; color:var(--accent-green);" id="dashListens_${p.id}">${p.listens}</td>
      `;
      body.appendChild(tr);
    });
  }

  function initDashboardPrepCast() {
    renderDashboardPodcasts();

    // Listen to storage events
    window.addEventListener('storage', (e) => {
      if (e.key === 'school_podcasts_state' || e.key === 'new_podcast_alert') {
        renderDashboardPodcasts();
      }

      if (e.key === 'student_podcast_activity' && e.newValue) {
        try {
          const activity = JSON.parse(e.newValue);
          
          // Update Active Listeners metrics
          const activeEl = document.getElementById("dashActiveListeners");
          if (activeEl) {
            if (activity.progress > 0 && activity.progress < 100) {
              activeEl.textContent = "1 Active";
              activeEl.style.color = "var(--primary)";
            } else if (activity.progress >= 100) {
              activeEl.textContent = "0 Active";
              activeEl.style.color = "var(--text-muted)";
            } else {
              activeEl.textContent = "0 Active";
            }
          }

          // Update avg speed
          const speedEl = document.getElementById("dashSpeedRate");
          if (speedEl) {
            // When actively playing, let's reflect speed (student app updates can broadcast it or default to 1.25x)
            // Let's read from localStorage to see what the active playback speed of the student app is
            const studentStateRaw = localStorage.getItem('student_app_state');
            let playbackSpeed = "1.25x";
            if (studentStateRaw) {
              try {
                const s = JSON.parse(studentStateRaw);
                if (s.playbackSpeed) playbackSpeed = `${s.playbackSpeed}x`;
              } catch(e) {}
            }
            speedEl.textContent = playbackSpeed;
          }

          // Update XP disbursement if correct check passed
          const xpEl = document.getElementById("dashTotalXp");
          if (xpEl) {
            if (activity.xpGained > 0) {
              xpEl.textContent = "+4,300 XP";
              xpEl.style.color = "var(--accent-green)";
              
              const retentionEl = document.getElementById("dashRetentionScore");
              if (retentionEl) {
                retentionEl.textContent = "100.0%";
                retentionEl.style.color = "var(--accent-green)";
              }
            } else {
              xpEl.textContent = "+4,250 XP";
              xpEl.style.color = "var(--accent-rose)";
            }
          }

          // Update listens cell dynamically in the table for this episode
          const listenCell = document.getElementById(`dashListens_${activity.episodeId}`);
          if (listenCell) {
            // Retrieve current count and increment slightly if completed
            if (activity.progress >= 100) {
              // Read count from state
              const rawPod = localStorage.getItem('school_podcasts_state');
              if (rawPod) {
                const pods = JSON.parse(rawPod);
                const found = pods.find(p => p.id === activity.episodeId);
                if (found) {
                  listenCell.textContent = found.listens + 1;
                }
              }
            }
          }

        } catch(err) {}
      }
    });
  }

  // ================= PRODUCTIVITY & FOCUS ANALYTICS SYNC =================
  function initDashboardProductivity() {
    const updateProductivityUI = (activity) => {
      const activeCount = document.getElementById("dashActiveFocusCount");
      const pulseDot = document.getElementById("dashFocusPulseDot");
      const activeRow = document.getElementById("dashActiveStudentRow");
      const placeholder = document.getElementById("dashActiveStudentsPlaceholder");
      const lockdownBadge = document.getElementById("dashLockdownBadge");
      const studentTask = document.getElementById("dashActiveStudentTask");
      const timeText = document.getElementById("dashFocusTimeText");
      const ringOffset = document.getElementById("dashFocusRingOffset");
      const studentStatus = document.getElementById("dashActiveStudentStatus");
      const focusHours = document.getElementById("dashFocusHours");
      const focusStreak = document.getElementById("dashFocusStreak");

      // Update general KPIs based on activity
      if (activity) {
        // School-Wide Hours: Base 248.5 + Aarif's minutes
        if (focusHours) {
          const baseHours = 248.5;
          const extraMins = activity.totalMinutes || 0;
          const totalHrs = (baseHours + extraMins / 60).toFixed(1);
          const hrsSpan = focusHours.querySelector("span");
          if (hrsSpan) hrsSpan.textContent = `${totalHrs} hrs`;
        }
        // Focus Streak
        if (focusStreak) {
          const streak = activity.streak || 5;
          focusStreak.textContent = `${Math.max(5.4, streak)} Days`;
        }
      }

      // Handle focus lockdown state visualization
      if (activity && activity.isRunning) {
        if (activity.mode === "work") {
          if (activeCount) activeCount.textContent = "1";
          if (pulseDot) pulseDot.style.display = "inline-block";
          if (activeRow) activeRow.style.display = "flex";
          if (placeholder) placeholder.style.display = "none";
          if (lockdownBadge) lockdownBadge.style.display = "inline-block";
          if (studentTask) studentTask.textContent = `Task: ${activity.activeTask || "Syllabus Prep Session"}`;
          if (studentStatus) {
            studentStatus.textContent = "Work Session";
            studentStatus.style.background = "rgba(239, 68, 68, 0.15)";
            studentStatus.style.color = "#ef4444";
            studentStatus.style.borderColor = "rgba(239, 68, 68, 0.25)";
          }
        } else {
          // Break mode
          if (activeCount) activeCount.textContent = "0";
          if (pulseDot) pulseDot.style.display = "none";
          if (activeRow) activeRow.style.display = "flex";
          if (placeholder) placeholder.style.display = "none";
          if (lockdownBadge) lockdownBadge.style.display = "none";
          if (studentTask) {
            studentTask.textContent = activity.mode === "short" ? "Resting: Short Break" : "Resting: Long Break";
          }
          if (studentStatus) {
            studentStatus.textContent = activity.mode === "short" ? "Short Break" : "Long Break";
            studentStatus.style.background = "rgba(16, 185, 129, 0.15)";
            studentStatus.style.color = "#10b981";
            studentStatus.style.borderColor = "rgba(16, 185, 129, 0.25)";
          }
        }

        // Format ticking countdown time
        if (timeText) {
          let mins = Math.floor(activity.secondsLeft / 60);
          let secs = activity.secondsLeft % 60;
          mins = mins < 10 ? "0" + mins : mins;
          secs = secs < 10 ? "0" + secs : secs;
          timeText.textContent = `${mins}:${secs}`;
        }

        // Animate circular ring offset
        if (ringOffset) {
          const totalSecs = activity.totalSeconds || 1500;
          const pct = activity.secondsLeft / totalSecs;
          const offset = 100.53 * (1 - pct);
          ringOffset.style.strokeDashoffset = offset;
        }
      } else {
        // Idle/Stopped state
        if (activeCount) activeCount.textContent = "0";
        if (pulseDot) pulseDot.style.display = "none";
        if (activeRow) activeRow.style.display = "none";
        if (placeholder) placeholder.style.display = "block";
        if (lockdownBadge) lockdownBadge.style.display = "none";
      }
    };

    // Initial check
    const raw = localStorage.getItem("student_pomodoro_activity");
    if (raw) {
      try {
        updateProductivityUI(JSON.parse(raw));
      } catch (e) {
        updateProductivityUI(null);
      }
    } else {
      updateProductivityUI(null);
    }

    // Real-time synchronization
    window.addEventListener("storage", (e) => {
      if (e.key === "student_pomodoro_activity") {
        try {
          updateProductivityUI(JSON.parse(e.newValue));
        } catch (err) {
          updateProductivityUI(null);
        }
      }
    });
  }

  // ================= INITIALIZATION EXECUTION =================
  initDashboardOMR();
  initFullOMR();
  initDashboardPrepCast();
  initDashboardProductivity();

});
