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

  if (titleEl) titleEl.textContent = studentId.toUpperCase() + " AL-MASOOM • MIDTERM EXAM";
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

  scoreText.textContent = data.score;
  masteryText.textContent = data.mastery;
  
  if (data.isCritical) {
    masteryText.className = "critical-text";
  } else {
    masteryText.className = data.mastery.includes("Excellent") ? "success-text" : "warning-text";
  }

  // Draw 15 pills
  pillsRow.innerHTML = "";
  data.answers.forEach(ans => {
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
  const name = studentSelect.options[studentSelect.selectedIndex].text;
  
  showToast(`✅ Marks approved and published to ${name}'s portal!`, "🚀");
  document.getElementById("graderResultsPanel").style.display = "none";
};

window.flagGrades = function() {
  showToast("⚠️ Grade flagged for manual coordinate audit review.", "🛡️");
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
