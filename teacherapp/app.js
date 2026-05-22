/* 
========================================================================
   LEARNING SHAPER TEACHER COMPANION APP - CORE INTERACTIVE ENGINE
========================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // Synchronize Phone Simulator Clock
  updateSimulatorTime();
  setInterval(updateSimulatorTime, 60000);

  // Tab Navigation Setup
  setupTabRouting();

  // Settings Drawer Triggers
  setupSettingsDrawer();

  // Chat Messenger Engine & localStorage Synchronization
  setupChatSyncEngine();

  // Initial OMR sheet template
  loadStudentOMRTemplate("aarif");
});

/* ========================================================================
   PHONE CLOCK SYNC
   ======================================================================== */
function updateSimulatorTime() {
  const timeDisplay = document.getElementById("statusBarTime");
  if (timeDisplay) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timeDisplay.textContent = `${hours}:${minutes}`;
  }
}

/* ========================================================================
   TAB NAVIGATION ROUTING
   ======================================================================== */
function setupTabRouting() {
  window.switchTab = function(tabId) {
    // Hide all tab panels
    const panels = document.querySelectorAll(".tab-content-panel");
    panels.forEach(panel => {
      panel.classList.remove("active");
    });

    // Show selected panel
    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    // Deactivate all bottom nav items
    const navItems = document.querySelectorAll(".bottom-nav-bar .nav-item");
    navItems.forEach(item => {
      item.classList.remove("active");
    });

    // Activate specific nav item
    const navMap = {
      'home': 'navHome',
      'grader': 'navGrader',
      'chat': 'navChat',
      'curator': 'navCurator'
    };
    
    const activeNavId = navMap[tabId];
    const activeNav = document.getElementById(activeNavId);
    if (activeNav) {
      activeNav.classList.add("active");
    }

    // Scroll back to top inside phone container
    const appContent = document.querySelector(".app-content");
    if (appContent) {
      appContent.scrollTop = 0;
    }

    // Reset Chat indicator badge if entering chat
    if (tabId === 'chat') {
      const chatBadge = document.getElementById("chatBadgeAlert");
      if (chatBadge) {
        chatBadge.style.display = "none";
      }
    }
  };
}

/* ========================================================================
   SETTINGS DRAWER TOGGLES
   ======================================================================== */
function setupSettingsDrawer() {
  const triggerBtn = document.getElementById("settingsTriggerBtn");
  const closeBtn = document.getElementById("drawerCloseBtn");
  const drawer = document.getElementById("settingsDrawer");

  if (triggerBtn && drawer) {
    triggerBtn.addEventListener("click", () => {
      drawer.classList.add("active");
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("active");
    });
  }

  // Close drawer if user clicks outside of it
  document.addEventListener("click", (e) => {
    if (drawer && drawer.classList.contains("active")) {
      if (!drawer.contains(e.target) && e.target !== triggerBtn && !triggerBtn.contains(e.target)) {
        drawer.classList.remove("active");
      }
    }
  });
}

/* ========================================================================
   TOAST NOTIFICATION ENGINE
   ======================================================================== */
function showToast(text, icon = "🔔") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${text}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

/* ========================================================================
   OMR GRADER COMPANION SIMULATION
   ======================================================================== */
const studentOMRTemplates = {
  aarif: {
    title: "MATHEMATICS MIDTERM • 2026",
    roll: "Roll: 05 • Grade 8-C",
    score: "12/15",
    mastery: "45% (Critical Zone)",
    isCritical: true,
    answers: [
      { q: 1, correct: true, choice: "A" },
      { q: 2, correct: true, choice: "B" },
      { q: 3, correct: false, choice: "C" }, // Should be A
      { q: 4, correct: true, choice: "A" },
      { q: 5, correct: true, choice: "C" },
      { q: 6, correct: false, choice: "B" }, // Should be D
      { q: 7, correct: true, choice: "D" },
      { q: 8, correct: true, choice: "A" },
      { q: 9, correct: true, choice: "B" },
      { q: 10, correct: true, choice: "C" },
      { q: 11, correct: false, choice: "A" }, // Should be B
      { q: 12, correct: true, choice: "D" },
      { q: 13, correct: true, choice: "A" },
      { q: 14, correct: true, choice: "B" },
      { q: 15, correct: true, choice: "C" }
    ],
    htmlContent: `
      <div class="mock-omr-row"><span class="q-num">Q1</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q2</span><div class="mock-bubble">A</div><div class="mock-bubble selected checked">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q3</span><div class="mock-bubble">A</div><div class="mock-bubble">B</div><div class="mock-bubble selected incorrect">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q4</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q5</span><div class="mock-bubble">A</div><div class="mock-bubble">B</div><div class="mock-bubble selected checked">C</div></div>
    `
  },
  samira: {
    title: "MATHEMATICS MIDTERM • 2026",
    roll: "Roll: 12 • Grade 8-C",
    score: "14/15",
    mastery: "88% (Excellent)",
    isCritical: false,
    answers: [
      { q: 1, correct: true, choice: "A" },
      { q: 2, correct: true, choice: "B" },
      { q: 3, correct: true, choice: "A" },
      { q: 4, correct: true, choice: "A" },
      { q: 5, correct: true, choice: "C" },
      { q: 6, correct: true, choice: "D" },
      { q: 7, correct: true, choice: "D" },
      { q: 8, correct: true, choice: "A" },
      { q: 9, correct: true, choice: "B" },
      { q: 10, correct: true, choice: "C" },
      { q: 11, correct: false, choice: "A" }, // Should be B
      { q: 12, correct: true, choice: "D" },
      { q: 13, correct: true, choice: "A" },
      { q: 14, correct: true, choice: "B" },
      { q: 15, correct: true, choice: "C" }
    ],
    htmlContent: `
      <div class="mock-omr-row"><span class="q-num">Q1</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q2</span><div class="mock-bubble">A</div><div class="mock-bubble selected checked">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q3</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q4</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q5</span><div class="mock-bubble">A</div><div class="mock-bubble">B</div><div class="mock-bubble selected checked">C</div></div>
    `
  },
  tanvir: {
    title: "MATHEMATICS MIDTERM • 2026",
    roll: "Roll: 18 • Grade 8-C",
    score: "13/15",
    mastery: "75% (Stable)",
    isCritical: false,
    answers: [
      { q: 1, correct: true, choice: "A" },
      { q: 2, correct: true, choice: "B" },
      { q: 3, correct: true, choice: "A" },
      { q: 4, correct: true, choice: "A" },
      { q: 5, correct: true, choice: "C" },
      { q: 6, correct: false, choice: "B" }, // Should be D
      { q: 7, correct: true, choice: "D" },
      { q: 8, correct: true, choice: "A" },
      { q: 9, correct: true, choice: "B" },
      { q: 10, correct: true, choice: "C" },
      { q: 11, correct: false, choice: "A" }, // Should be B
      { q: 12, correct: true, choice: "D" },
      { q: 13, correct: true, choice: "A" },
      { q: 14, correct: true, choice: "B" },
      { q: 15, correct: true, choice: "C" }
    ],
    htmlContent: `
      <div class="mock-omr-row"><span class="q-num">Q1</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q2</span><div class="mock-bubble">A</div><div class="mock-bubble selected checked">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q3</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q4</span><div class="mock-bubble selected checked">A</div><div class="mock-bubble">B</div><div class="mock-bubble">C</div></div>
      <div class="mock-omr-row"><span class="q-num">Q5</span><div class="mock-bubble">A</div><div class="mock-bubble">B</div><div class="mock-bubble selected checked">C</div></div>
    `
  }
};

window.loadStudentOMRTemplate = function(studentId) {
  const data = studentOMRTemplates[studentId];
  if (!data) return;

  const titleEl = document.querySelector("#viewfinderSheetMock h4");
  const pEl = document.querySelector("#viewfinderSheetMock p");
  const matrixEl = document.querySelector(".mock-omr-matrix");

  if (titleEl) titleEl.textContent = studentId.toUpperCase() + " • MIDTERM EXAM";
  if (pEl) pEl.textContent = data.roll;
  if (matrixEl) matrixEl.innerHTML = data.htmlContent;

  // Reset Results Panel
  document.getElementById("graderResultsPanel").style.display = "none";
};

window.triggerOMRScanSweep = function() {
  const laser = document.getElementById("graderLaserSweep");
  const btn = document.getElementById("btnExecuteScan");
  const studentSelect = document.getElementById("graderStudentSelect");

  if (!laser || !btn) return;

  btn.disabled = true;
  btn.textContent = "Scanning Bubble Coordinates...";
  laser.classList.add("active");

  setTimeout(() => {
    laser.classList.remove("active");
    btn.disabled = false;
    btn.textContent = "Scan Bubble Sheet";
    
    // Load results
    const studentId = studentSelect.value;
    displayScanResults(studentId);
    showToast("📊 OMR scanned successfully! Extracted 15 bubble selections.", "📷");
  }, 1800);
};

function displayScanResults(studentId) {
  const data = studentOMRTemplates[studentId];
  const resultsPanel = document.getElementById("graderResultsPanel");
  const scoreText = document.getElementById("scanResultScoreText");
  const masteryText = document.getElementById("scanResultMasteryText");
  const pillsRow = document.getElementById("scanScorePillsRow");

  if (!data || !resultsPanel || !scoreText || !masteryText || !pillsRow) return;

  // Dynamically calculate correctness from configure OMR selectors for Q1-5
  const keys = [
    document.getElementById("keyQ1") ? document.getElementById("keyQ1").value : "A",
    document.getElementById("keyQ2") ? document.getElementById("keyQ2").value : "B",
    document.getElementById("keyQ3") ? document.getElementById("keyQ3").value : "A",
    document.getElementById("keyQ4") ? document.getElementById("keyQ4").value : "A",
    document.getElementById("keyQ5") ? document.getElementById("keyQ5").value : "D",
    "D", "D", "A", "B", "C", "B", "D", "A", "B", "C" // Q6-15 default keys
  ];

  let correctCount = 0;
  const dynamicAnswers = data.answers.map(ans => {
    const correctAns = keys[ans.q - 1];
    const isCorrect = ans.choice === correctAns;
    if (isCorrect) correctCount++;
    return {
      q: ans.q,
      choice: ans.choice,
      correct: isCorrect
    };
  });

  const finalScore = `${correctCount}/15`;
  const masteryPercent = Math.round((correctCount / 15) * 100);
  
  let masteryClass = "stable-text";
  let masteryDesc = "Stable";
  if (masteryPercent < 50) {
    masteryClass = "critical-text";
    masteryDesc = "Critical Zone";
  } else if (masteryPercent >= 80) {
    masteryClass = "success-text";
    masteryDesc = "Excellent";
  }
  
  scoreText.textContent = finalScore;
  masteryText.textContent = `${masteryPercent}% (${masteryDesc})`;
  masteryText.className = masteryClass;

  // Draw 15 pills
  pillsRow.innerHTML = "";
  dynamicAnswers.forEach(ans => {
    const pill = document.createElement("span");
    pill.className = `score-pill ${ans.correct ? 'correct' : 'incorrect'}`;
    pill.textContent = `Q${ans.q}:${ans.choice}`;
    pillsRow.appendChild(pill);
  });

  resultsPanel.style.display = "block";
  
  // Smooth scroll
  const appContent = document.querySelector(".app-content");
  if (appContent) {
    appContent.scrollTo({ top: appContent.scrollHeight, behavior: 'smooth' });
  }
}

window.releaseGrades = function() {
  const studentSelect = document.getElementById("graderStudentSelect");
  const studentId = studentSelect.value;
  const name = studentSelect.options[studentSelect.selectedIndex].text;
  
  const feedbackSelect = document.getElementById("graderFeedbackSelect");
  const feedbackVal = feedbackSelect ? feedbackSelect.value : "remedial";

  const feedbackNotes = {
    remedial: "Aarif needs immediate conceptual support in Algebra quadratic factorization. Recommended to practice visual rectangular grids at home.",
    excellent: "Superb performance! Excelling in both Algebra and Trigonometry.",
    pace: "Aarif is doing well but should increase his weekly home study focus above 45 minutes."
  };

  const selectedFeedbackText = feedbackNotes[feedbackVal] || feedbackNotes["remedial"];
  const scoreText = document.getElementById("scanResultScoreText") ? document.getElementById("scanResultScoreText").textContent : "12/15";

  const gradesData = {
    student: studentId,
    name: name,
    score: scoreText,
    feedback: selectedFeedbackText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  localStorage.setItem("released_grades_feedback", JSON.stringify(gradesData));
  
  // Send a coordinator system message in parent-teacher chat logs
  pushCoordinatorSystemMessage(`📝 Scanned Math Midterm Released: ${scoreText}. Feedback: "${selectedFeedbackText}"`);

  showToast(`✅ Marks approved and published to ${name}'s portal!`, "🚀");
  document.getElementById("graderResultsPanel").style.display = "none";
};

window.flagGrades = function() {
  showToast("⚠️ Grade flagged for manual coordinate audit review.", "🛡️");
};

/* ========================================================================
   RFID tap simulations, lesson planner compilers, smart recommendations
   ======================================================================== */
window.simulateRfidTap = function() {
  const rfidStream = document.getElementById("rfidLogStream");
  if (!rfidStream) return;

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const timeStr = `${hours}:${minutes} AM`;

  const newLog = document.createElement("div");
  newLog.style.cssText = "font-size: 9px; padding: 5px 0; border-bottom:1px solid rgba(255,255,255,0.05); text-align:left; color: var(--text-main);";
  newLog.innerHTML = `<span style="color:var(--accent-teal)">[${timeStr}]</span> <strong>Aarif Al-Masoom</strong> tapped at Gate 1 - PRESENT via RFID`;
  
  rfidStream.insertBefore(newLog, rfidStream.firstChild);

  // Broadcast event
  localStorage.setItem("rfid_checkin_event", JSON.stringify({
    name: "Aarif Al-Masoom",
    time: timeStr,
    type: "RFID Gate-In"
  }));

  // Update Roster KPI Card
  const rosterCount = document.getElementById("rosterAttendanceSub");
  if (rosterCount) rosterCount.textContent = "24 Present";
  const rosterPercent = document.getElementById("rosterAttendancePercent");
  if (rosterPercent) rosterPercent.textContent = "96%";

  showToast("📟 RFID Gate-In Tap broadcasted to Ecosystem!", "📟");
};

window.dispatchCuratorResource = function() {
  const resourceSelect = document.getElementById("curatorResourceSelect");
  if (!resourceSelect) return;

  const val = resourceSelect.value;
  const resourceNames = {
    math_vids: "Video: Quadratic Parabola Roots (Level 12)",
    worksheet: "Worksheet: Middle-Term Factorization Drills",
    lego_guide: "Lego grid math family activity guide"
  };

  const resourceName = resourceNames[val] || "Mathematics Worksheet";
  
  localStorage.setItem("curator_resource_event", JSON.stringify({
    resource: resourceName,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  pushCoordinatorSystemMessage(`🎯 Resource Dispatched: "${resourceName}" sent to Aarif's parenting copilot digest.`);
  showToast(`🎯 Resource "${resourceName}" dispatched to Parent portal!`, "✏️");
};

window.generateLessonPlan = function() {
  const resultDiv = document.getElementById("lessonPlanResult");
  if (!resultDiv) return;

  const now = new Date().toLocaleDateString();
  resultDiv.innerHTML = `
    <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px; margin-bottom:8px; font-weight:800; color:var(--accent-color);">
      📋 Grade 8-C Algebra: Quadratic Functions & Area Scaffolding
    </div>
    <div style="font-size: 10px; color: var(--text-main); display:flex; flex-direction:column; gap:4px;">
      <div><strong>📅 Generated Date:</strong> ${now}</div>
      <div><strong>🎯 Objective:</strong> Identify roots and vertex coordinates for $y = ax^2 + bx + c$ visually.</div>
      <div><strong>🔥 Warmup (5m):</strong> Solve $x^2 - 5x + 6 = 0$ using visual rectangle split. Find factors $(x-2)(x-3)$.</div>
      <div><strong>🛠️ Active Practice (25m):</strong> 
        <ul>
          <li>Build visual grids using 1x1, 1x(x), and (x)x(x) area models.</li>
          <li>Graph curves using real-time coordinates slider tool.</li>
        </ul>
      </div>
      <div><strong>🚪 Exit Ticket (10m):</strong> Solve $x^2 + 5x + 6 = 0$. Plot roots.</div>
    </div>
  `;
  resultDiv.style.display = "block";

  localStorage.setItem("active_lesson_plan_topic", "quadratics");
  showToast("✏️ AI Lesson plan generated and set as active curriculum focus!", "🧠");
};

window.useQuickTemplate = function(type) {
  const input = document.getElementById("chatInputField");
  if (!input) return;

  const templates = {
    conference: "Dear Mr. Al-Masoom, I would like to schedule a quick 10-minute parent-teacher conference tomorrow to discuss Aarif's Algebra progress. Please let me know if 11:30 AM works for you.",
    improvement: "Hi! I am delighted to share that Aarif's Trigonometry scores have soared to 88%! His classroom engagement has been absolutely superb.",
    alert: "Dear Mr. Al-Masoom, Aarif's latest mock Algebra scan recorded a 45% mastery. I've dispatched a quadratic quiz drill to his app; please ensure he completes it tonight."
  };

  input.value = templates[type] || "";
  input.focus();
  showToast("📝 Quick template loaded into input field!", "💬");
};

window.viewStudentPerformance = function(studentId) {
  const drawer = document.getElementById("progressInsightsDrawer");
  const title = document.getElementById("progressDrawerTitle");
  const desc = document.getElementById("progressDrawerDesc");
  const tip = document.getElementById("progressDrawerTip");
  const path = document.getElementById("trendLinePath");
  const svg = document.getElementById("studentTrendSvg");

  if (!drawer || !title || !desc || !tip || !path || !svg) return;

  drawer.style.display = "flex";

  const studentData = {
    aarif: {
      name: "Aarif Al-Masoom",
      desc: "Weekly Algebra progress shows severe regression in middle-term factoring during week 3, with a recovery trajectory started.",
      tip: "Algebra mastery is currently at 45%. Settle doubt gap via remedial practice sheets & Lego grid visual activities.",
      path: "M 40,65 L 100,68 L 160,82 L 220,72",
      points: [
        { cx: 40, cy: 65, color: "var(--accent-color)" },
        { cx: 100, cy: 68, color: "var(--accent-color)" },
        { cx: 160, cy: 82, color: "var(--error-color)" },
        { cx: 220, cy: 72, color: "var(--accent-amber)" }
      ]
    },
    samira: {
      name: "Samira Hossain",
      desc: "Weekly progress shows outstanding retention. Consistently leading class drills.",
      tip: "Algebra mastery is excellent (88%). Highly receptive to advanced trigonometry challenge worksheets.",
      path: "M 40,55 L 100,50 L 160,46 L 220,42",
      points: [
        { cx: 40, cy: 55, color: "var(--accent-teal)" },
        { cx: 100, cy: 50, color: "var(--accent-teal)" },
        { cx: 160, cy: 46, color: "var(--accent-teal)" },
        { cx: 220, cy: 42, color: "var(--success-color)" }
      ]
    },
    tanvir: {
      name: "Tanvir Islam",
      desc: "Weekly progress is stable. Demonstrates solid grasp of quadratic functions but slow execution speed.",
      tip: "Algebra mastery is stable at 75%. Suggest reinforcing homework completion schedules.",
      path: "M 40,58 L 100,56 L 160,54 L 220,51",
      points: [
        { cx: 40, cy: 58, color: "var(--accent-color)" },
        { cx: 100, cy: 56, color: "var(--accent-color)" },
        { cx: 160, cy: 54, color: "var(--accent-color)" },
        { cx: 220, cy: 51, color: "var(--accent-teal)" }
      ]
    }
  };

  const data = studentData[studentId] || studentData.aarif;
  title.textContent = `${data.name} - Progress Insights`;
  desc.textContent = data.desc;
  tip.textContent = data.tip;

  // Set trend line path
  path.setAttribute("d", data.path);

  // Remove existing circle points
  const circles = svg.querySelectorAll("circle");
  circles.forEach(c => c.remove());

  // Redraw circles
  data.points.forEach((pt, idx) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", pt.cx);
    c.setAttribute("cy", pt.cy);
    c.setAttribute("r", idx === 3 ? "5" : "4");
    c.setAttribute("fill", pt.color);
    svg.appendChild(c);
  });
};

window.closeProgressDrawer = function() {
  const drawer = document.getElementById("progressInsightsDrawer");
  if (drawer) {
    drawer.style.display = "none";
  }
};

/* ========================================================================
   CURATOR REMEDIAL DISPATCH LIFE CYCLE
   ======================================================================== */
window.toggleConceptSelectStyle = function(radio) {
  document.querySelectorAll(".concept-radio-label").forEach(lbl => {
    lbl.classList.remove("active");
  });
  radio.parentElement.parentElement.classList.add("active");
};

window.toggleStudentCheckStyle = function(checkbox) {
  checkbox.parentElement.classList.toggle("selected");
};

window.dispatchRemedialPractice = function() {
  const btn = document.getElementById("btnDispatchPractice");
  if (!btn) return;

  btn.disabled = true;
  btn.textContent = "Dispatching Quiz Drills...";
  btn.style.opacity = "0.7";

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Dispatch Practice Sheet";
    btn.style.opacity = "1";
    
    // Save state in localStorage to sync student app
    localStorage.setItem("remedial_quiz_dispatched", "true");
    
    // Push update directly to the Parent App's chat history!
    pushCoordinatorSystemMessage("🎯 Mrs. Tasnim Jahan has dispatched the Algebra quadratics practice sheet to Aarif. He will receive +50 XP drills.");

    showToast("🎯 Remedial algebra quiz successfully dispatched to student portals!", "✏️");
  }, 1200);
};

/* ========================================================================
   LOCAL STORAGE CHAT SYNC ENGINE (REAL-TIME BIDIRECTIONAL MFS)
   ======================================================================== */
const CHAT_STORAGE_KEY = "parent_teacher_chat";

function setupChatSyncEngine() {
  const sendBtn = document.getElementById("chatSendBtnCircle");
  const input = document.getElementById("chatInputField");
  const stream = document.getElementById("chatMessagesStream");

  if (!sendBtn || !input || !stream) return;

  // Initialize localStorage logs if empty
  if (!localStorage.getItem(CHAT_STORAGE_KEY)) {
    const initialChats = [
      { sender: "teacher", text: "Hello Mr. Al-Masoom! I am Aarif's class coordinator. Welcome to the direct Parent communication channel.", time: "14:02" },
      { sender: "teacher", text: "While Aarif is making progress in his Geometry assessments, his recent mock Algebra OMR scans showed a drop to 45%. We highly recommend encouraging him to open the AI Practice drills inside his student app today.", time: "14:04" }
    ];
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(initialChats));
  }

  // Load chat messages
  loadChatLogs();

  // Listen to cross-window storage events!
  window.addEventListener("storage", (e) => {
    if (e.key === CHAT_STORAGE_KEY) {
      loadChatLogs();
      // Show alerts indicator if in a different tab
      const chatPanel = document.getElementById("tab-chat");
      if (chatPanel && !chatPanel.classList.contains("active")) {
        const badge = document.getElementById("chatBadgeAlert");
        if (badge) badge.style.display = "flex";
      }
    }
  });

  // Action send click
  function handleSend() {
    const text = input.value.trim();
    if (text === "") return;

    appendMessageToStorage("teacher", text);
    input.value = "";
    loadChatLogs();

    // Parent Auto Response fallback loop (if Parent tab isn't open side by side)
    simulateParentReplyFallback(text);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
}

function loadChatLogs() {
  const stream = document.getElementById("chatMessagesStream");
  if (!stream) return;

  const logs = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");
  stream.innerHTML = "";

  logs.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${msg.sender}`;
    bubble.innerHTML = `
      <p>${escapeHTML(msg.text)}</p>
      <span class="message-time">${msg.time}</span>
    `;
    stream.appendChild(bubble);
  });

  stream.scrollTop = stream.scrollHeight;
}

function appendMessageToStorage(sender, text) {
  const logs = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "[]");
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  logs.push({
    sender: sender,
    text: text,
    time: `${hours}:${minutes}`
  });

  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(logs));
}

function pushCoordinatorSystemMessage(text) {
  appendMessageToStorage("teacher", text);
  loadChatLogs();
}

function simulateParentReplyFallback(teacherText) {
  const lowercaseText = teacherText.toLowerCase();
  let replyText = "";

  if (lowercaseText.includes("algebra") || lowercaseText.includes("quiz") || lowercaseText.includes("drill") || lowercaseText.includes("quadratics")) {
    replyText = "Thank you so much, Mrs. Tasnim! I received your notification and I will ensure Aarif launches his Math Practice drills immediately tonight.";
  } else if (lowercaseText.includes("callback") || lowercaseText.includes("appointment") || lowercaseText.includes("meet") || lowercaseText.includes("prep")) {
    replyText = "Tomorrow at 11:30 AM suits me perfectly! I will check in at the school's admin office first. See you then.";
  } else if (lowercaseText.includes("attendance") || lowercaseText.includes("absent") || lowercaseText.includes("bus")) {
    replyText = "Thanks for the safety logs. Aarif mentioned the RFID scans worked perfectly today on Bus #14.";
  } else {
    // Standard response if not caught
    return; // Don't auto reply if we don't match important topics to prevent infinite loop or annoying logs
  }

  const typingIndicator = document.getElementById("liveTypingIndicator");
  const stream = document.getElementById("chatMessagesStream");

  setTimeout(() => {
    // Show typing state
    if (typingIndicator && stream) {
      typingIndicator.classList.add("active");
      stream.appendChild(typingIndicator);
      stream.scrollTop = stream.scrollHeight;
    }

    setTimeout(() => {
      // Hide typing state
      if (typingIndicator) typingIndicator.classList.remove("active");

      // Save and reload
      appendMessageToStorage("parent", replyText);
      loadChatLogs();
      
      showToast("💬 New message from Mr. Al-Masoom (Parent)", "✉️");
    }, 1800);

  }, 1000);
}

/* ========================================================================
   UTILITY HELPER FUNCTIONS
   ======================================================================== */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
