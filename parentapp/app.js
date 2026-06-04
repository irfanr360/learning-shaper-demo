/* 
========================================================================
   PARENTING COPILOT - CORE INTERACTIVE ENGINE
========================================================================
*/

const STUDENT_PROFILES = {
  aarif: {
    id: 'aarif',
    name: 'Aarif Al-Masoom',
    grade: 'Grade 8-C',
    level: 12,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    avatarSeed: 'Aarif',
    parentName: 'Mr. Al-Masoom',
    dues: 3500,
    algebraMastery: '45%',
    score: '12/15',
    briefing: 'Good morning! Aarif has successfully arrived at school. His latest Math Midterm OMR results are released (**12/15** marks, **45% quadratics mastery**). Tuition dues of ৳3,500 are pending. I\'ve compiled supportive action items below.',
    briefingPaid: 'Good morning! Aarif has successfully arrived at school. His latest Math Midterm OMR results are released (**12/15** marks, **45% quadratics mastery**). Tuition bills have been settled successfully. I\'ve compiled supportive action items below.'
  },
  samira: {
    id: 'samira',
    name: 'Samira Hossain',
    grade: 'Grade 8-A',
    level: 14,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    avatarSeed: 'Samira',
    parentName: 'Mrs. Hossain',
    dues: 0,
    algebraMastery: '91%',
    score: '14/15',
    briefing: 'Good morning! Samira has successfully arrived at school. Her latest Math Midterm OMR results are released (**14/15** marks, **91% quadratics mastery**). No tuition bills are outstanding. I\'ve compiled supportive action items below.',
    briefingPaid: 'Good morning! Samira has successfully arrived at school. Her latest Math Midterm OMR results are released (**14/15** marks, **91% quadratics mastery**). No tuition bills are outstanding. I\'ve compiled supportive action items below.'
  },
  tanvir: {
    id: 'tanvir',
    name: 'Tanvir Islam',
    grade: 'Grade 8-B',
    level: 11,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    avatarSeed: 'Tanvir',
    parentName: 'Mr. Islam',
    dues: 1200,
    algebraMastery: '54%',
    score: '11/15',
    briefing: 'Good morning! Tanvir has successfully arrived at school. His latest Math Midterm OMR results are released (**11/15** marks, **54% quadratics mastery**). Tuition dues of ৳1,200 are pending. I\'ve compiled supportive action items below.',
    briefingPaid: 'Good morning! Tanvir has successfully arrived at school. His latest Math Midterm OMR results are released (**11/15** marks, **54% quadratics mastery**). Tuition bills have been settled successfully. I\'ve compiled supportive action items below.'
  }
};

let activeStudentId = localStorage.getItem('active_student_id') || 'aarif';

function getCurrentChatKey() {
  const activeId = localStorage.getItem('active_student_id') || 'aarif';
  return `parent_teacher_chat_${activeId}`;
}

function syncActiveStudent(studentId) {
  activeStudentId = studentId;
  const profile = STUDENT_PROFILES[studentId];
  if (!profile) return;
  
  // 1. Update Profile Card
  const avatarImg = document.getElementById("parentAvatarImg");
  const avatarBadge = document.getElementById("parentAvatarBadge");
  const studentName = document.getElementById("parentStudentName");
  const studentGrade = document.getElementById("parentStudentGrade");
  
  if (avatarImg) {
    avatarImg.src = profile.avatar;
    avatarImg.alt = profile.name;
    avatarImg.onerror = function() {
      this.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${profile.avatarSeed}`;
      this.onerror = null;
    };
  }
  if (avatarBadge) avatarBadge.textContent = profile.level;
  if (studentName) studentName.textContent = profile.name;
  if (studentGrade) {
    studentGrade.innerHTML = `<span class="school-tag">St. Gregory High School</span> • ${profile.grade}`;
  }
  
  // 2. Update Briefing Text
  const briefingText = document.getElementById("copilotBriefingText");
  if (briefingText) {
    const isPaid = localStorage.getItem(`student_tuition_paid_${studentId}`) === 'true' || profile.dues === 0;
    briefingText.innerHTML = isPaid ? profile.briefingPaid : profile.briefing;
  }
  
  // 3. Update Study Focus description
  const activeFocusTitle = document.querySelector("#parentFocusMonitorCard .card-title span");
  if (activeFocusTitle) {
    activeFocusTitle.innerHTML = `⏱️ ${profile.name.split(' ')[0]}'s Live Study Focus`;
  }
  const focusDesc = document.querySelector("#tab-home p.section-desc");
  if (focusDesc && focusDesc.textContent.includes("Supervise")) {
    focusDesc.textContent = `Supervise ${profile.name.split(' ')[0]}'s deep learning session in real-time. Cheering nudges keep motivation locked in!`;
  }
  
  // 4. Update Nudge Custom message input placeholder/value
  const nudgeInput = document.getElementById("parentNudgeCustomMsg");
  if (nudgeInput) {
    nudgeInput.value = `Keep it up ${profile.name.split(' ')[0]}! Super proud of your focus! ❤️`;
  }
  
  // 5. Update study focus distribution description
  const studyDistributionDesc = document.querySelector("#tab-home div.glass-card:nth-of-type(3) p.section-desc");
  if (studyDistributionDesc) {
    studyDistributionDesc.textContent = `Active study focus distribution across ${profile.name.split(' ')[0]}'s online learning modules:`;
  }
  
  // 6. Update Milestones checklist description
  const milestonesDesc = document.querySelector("#tab-home div.glass-card:nth-of-type(4) p.section-desc");
  if (milestonesDesc && milestonesDesc.textContent.includes("Weekly targets")) {
    milestonesDesc.textContent = `Weekly targets synchronized in real-time with ${profile.name.split(' ')[0]}'s Learning Mate. Toggle status to supervise completion:`;
  }
  
  // 7. Update Offline games description
  const offlineGamesDesc = document.querySelector("#tab-home div.glass-card:nth-of-type(5) p.section-desc");
  if (offlineGamesDesc && offlineGamesDesc.textContent.includes("Suggest offline")) {
    offlineGamesDesc.textContent = `Suggest offline interactive learning games based on ${profile.name.split(' ')[0]}'s weekly curriculums:`;
  }
  const offlineGamesRatioText = document.querySelector("#tab-home div.quest-card p");
  if (offlineGamesRatioText && offlineGamesRatioText.textContent.includes("Turn grocery")) {
    offlineGamesRatioText.innerHTML = `Turn grocery shopping into a math tournament. Give ${profile.name.split(' ')[0]} ৳500 and a list of items with discount percentages. Let him calculate the final pricing using ratios.`;
  }
  
  // 8. Update Podcast concept tracker description
  const podcastTrackerDesc = document.querySelector("#tab-home div.glass-card:nth-of-type(6) p.section-desc");
  if (podcastTrackerDesc && podcastTrackerDesc.textContent.includes("Track")) {
    podcastTrackerDesc.textContent = `Track ${profile.name.split(' ')[0]}'s active academic listening sessions and concept prep checklist in real-time:`;
  }
  
  // 9. Update dinner prompt heading or description
  const dinnerPromptHeading = document.getElementById("dinnerPromptText");
  if (dinnerPromptHeading) {
    dinnerPromptHeading.textContent = `"Instead of asking 'How was school?', ask ${profile.name.split(' ')[0]}: 'What was the toughest bubble to fill in your mock OMR test today?'"`;
  }

  // 10. Update Lego drawer tips name references
  const legoFactoringText = document.querySelector("#legoTipsDrawer p");
  if (legoFactoringText && legoFactoringText.textContent.includes("Help")) {
    legoFactoringText.innerHTML = `Help ${profile.name.split(' ')[0]} visualize quadratic factoring <strong>(x + 2)(x + 3) = x² + 5x + 6</strong> using colored lego block grids at home:`;
  }
  
  // 11. Switcher Link Desc
  const switcherLinkDesc = document.getElementById("switcherStudentLinkDesc");
  if (switcherLinkDesc) {
    switcherLinkDesc.textContent = `View ${profile.name.split(' ')[0]}'s gamified drills & OMR`;
  }
  
  // 12. Tuition task item in digest
  const tuitionTask = document.getElementById("digestTaskTuition");
  const tuitionTaskText = document.getElementById("digestTaskTuitionText");
  const tuitionTaskBadge = document.getElementById("digestTaskTuitionBadge");
  
  if (tuitionTask && tuitionTaskText && tuitionTaskBadge) {
    const isPaid = localStorage.getItem(`student_tuition_paid_${studentId}`) === 'true' || profile.dues === 0;
    if (isPaid) {
      tuitionTask.classList.add("completed");
      tuitionTaskText.textContent = `Amount: ৳${(profile.dues || 3500).toLocaleString()} • Secured via MFS`;
      tuitionTaskBadge.innerHTML = `<span class="task-done-badge">Paid</span>`;
    } else {
      tuitionTask.classList.remove("completed");
      tuitionTaskText.textContent = `Amount: ৳${profile.dues.toLocaleString()} • Secured via MFS`;
      tuitionTaskBadge.innerHTML = `<button class="nudge-btn" onclick="sendNudge('Tuition Dues'); event.stopPropagation();">Nudge</button>`;
    }
  }

  // 13. Load dynamic alerts timeline
  initAlertsTimeline();
  
  // 14. Load chat logs
  const key = getCurrentChatKey();
  if (!localStorage.getItem(key)) {
    const initialChats = [
      { sender: "teacher", text: `Hello ${profile.parentName}! I am ${profile.name.split(' ')[0]}'s class coordinator. Welcome to the direct Parent communication channel.`, time: "14:02" },
      { sender: "teacher", text: studentId === 'aarif' 
        ? `While Aarif is making progress in his Geometry assessments, his recent mock Algebra OMR scans showed a drop to 45%. We highly recommend encouraging him to open the AI Practice drills inside his Learning Mate app today.`
        : studentId === 'samira'
          ? `Samira is performing outstandingly in Algebra (91%). She had minor gaps in circle theorems, but overall her progress is excellent. Please encourage her to continue her good work.`
          : `Tanvir has demonstrated exceptional spatial skills in Trigonometry (92%). However, his algebra speed needs a bit of reinforcement. Please encourage him to complete some algebraic timed drills.`, time: "14:04" }
    ];
    localStorage.setItem(key, JSON.stringify(initialChats));
  }
  loadChatLogs();
  
  // 15. Update parent focus monitor
  const initialFocus = localStorage.getItem('student_pomodoro_activity');
  if (initialFocus) {
    try {
      const act = JSON.parse(initialFocus);
      if (act.studentName === profile.name) {
        updateParentFocusUI(act);
      } else {
        updateParentFocusUI(null);
      }
    } catch(e) {
      updateParentFocusUI(null);
    }
  } else {
    updateParentFocusUI(null);
  }
  
  // 16. Update parent podcast tracker
  const initialPodcast = localStorage.getItem('student_podcast_activity');
  if (initialPodcast) {
    try {
      const act = JSON.parse(initialPodcast);
      if (act.studentName === profile.name) {
        updateParentPodcastUI(act);
      } else {
        resetParentPodcastUI();
      }
    } catch(e) {
      resetParentPodcastUI();
    }
  } else {
    resetParentPodcastUI();
  }
}

function resetParentPodcastUI() {
  const subjectEl = document.getElementById("parentPodcastSubject");
  const statusEl = document.getElementById("parentPodcastLiveStatus");
  const titleEl = document.getElementById("parentPodcastTitle");
  const progressEl = document.getElementById("parentPodcastProgressBar");
  const progressTextEl = document.getElementById("parentPodcastProgressText");
  const timeTextEl = document.getElementById("parentPodcastTimeText");
  const dialogueEl = document.getElementById("parentPodcastDinnerDialogue");
  
  if (subjectEl) subjectEl.textContent = "NO ACTIVE BROADCAST";
  if (statusEl) {
    statusEl.textContent = "Idle 💤";
    statusEl.style.background = "rgba(255,255,255,0.05)";
    statusEl.style.color = "var(--text-muted)";
    statusEl.style.borderColor = "rgba(255,255,255,0.1)";
  }
  if (titleEl) titleEl.textContent = "No podcast guide active";
  if (progressEl) progressEl.style.width = "0%";
  if (progressTextEl) progressTextEl.textContent = "0% Complete";
  if (timeTextEl) timeTextEl.textContent = "0.0 mins listened";
  if (dialogueEl) dialogueEl.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // Synchronize Phone Simulator Clock
  updateSimulatorTime();
  setInterval(updateSimulatorTime, 60000);

  // Tab Navigation Setup
  setupTabRouting();

  // Settings Drawer Triggers
  setupSettingsDrawer();

  // Chat Messenger Engine
  setupChatMessenger();

  // Callback Appointment Workflow
  setupCallbackWorkflow();

  // --- MEGA EXPANSION COMPANION INITIALIZERS ---
  setupDonutInteractiveFilter();
  drawParentMilestones();
  checkGoalAlignment();
  initAlertsTimeline();
  setupParentPodcastListener();
  setupParentFocusMonitor(); // Initialize real-time study focus monitoring widget!

  // Initial student sync
  syncActiveStudent(activeStudentId);
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
      panel.classList.add("hide");
    });

    // Show selected panel
    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) {
      targetPanel.classList.remove("hide");
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
      'alerts': 'navAlerts',
      'forecast': 'navForecast',
      'chat': 'navChat'
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
      const chatBadge = document.querySelector(".alert-nav-badge");
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
   DAILY DIGEST TASK MATRIX
   ======================================================================== */
window.toggleTask = function(element, fillChange) {
  element.classList.toggle("completed");
  
  // Re-calculate all active checked items
  const totalTasks = document.querySelectorAll(".digest-task-item");
  const completedTasks = document.querySelectorAll(".digest-task-item.completed");
  
  const percentage = Math.round((completedTasks.length / totalTasks.length) * 100);
  
  // Update progress UI elements
  const progressText = document.getElementById("digestProgressText");
  const progressFill = document.getElementById("digestProgressFill");
  
  if (progressText) {
    progressText.textContent = `${completedTasks.length} of ${totalTasks.length} Completed`;
  }
  
  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }

  // Visual success feedback
  if (percentage === 100) {
    showToast("🎉 Excellent! All of Aarif's tasks have been verified today.");
  }
};

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

  // Auto remove after 3.5 seconds with sliding animation
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// Global hook for nudging unchecked items
window.sendNudge = function(taskName) {
  showToast(`⚡ Study Nudge sent to Aarif's phone for [${taskName}]!`, "📱");
};

// Remedial alert quiz assignment
window.nudgeRemedial = function() {
  const btn = document.querySelector(".action-btn-primary");
  if (btn) {
    btn.textContent = "Remedial Quiz Dispatched";
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  }
  showToast("🎯 Dispatched Targeted Algebra Drill directly to Aarif (+50 XP potential)!", "✏️");
};

/* ========================================================================
   CALLBACK APPOINTMENT WORKFLOW
   ======================================================================== */
function setupCallbackWorkflow() {
  const callbackBtn = document.getElementById("callbackReqBtn");
  const badge = document.getElementById("callbackStatusBadge");

  if (callbackBtn && badge) {
    callbackBtn.addEventListener("click", () => {
      callbackBtn.textContent = "Callback Filed";
      callbackBtn.disabled = true;
      callbackBtn.style.opacity = "0.6";
      callbackBtn.style.cursor = "not-allowed";

      badge.style.display = "block";
      showToast("📞 Callback requested! Mrs. Tasnim Jahan will contact you shortly.", "💼");
      
      // Simulate teacher writing back in chat portal after 5 seconds
      setTimeout(() => {
        const chatBadge = document.querySelector(".alert-nav-badge");
        if (chatBadge && document.getElementById("tab-chat").classList.contains("hide")) {
          chatBadge.style.display = "flex";
        }
        
        // Push notification in background
        showToast("💬 New message from Mrs. Tasnim Jahan regarding your callback.", "✉️");
        
        // Append response to shared localStorage chat logs and reload
        appendMessageToStorage("teacher", "I have received your callback request regarding Aarif's math performance. I am free tomorrow during my 3rd period prep slot at 11:30 AM. Does that time suit you?");
        loadChatLogs();
      }, 5000);

    });
  }
}

/* ========================================================================
   LOCAL STORAGE CHAT SYNC ENGINE (REAL-TIME BIDIRECTIONAL MFS)
   ======================================================================== */
function appendMessageToStorage(sender, text) {
  const key = getCurrentChatKey();
  const logs = JSON.parse(localStorage.getItem(key) || "[]");
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

  localStorage.setItem(key, JSON.stringify(logs));
}

function loadChatLogs() {
  const stream = document.getElementById("chatMessagesStream");
  if (!stream) return;

  const key = getCurrentChatKey();
  const logs = JSON.parse(localStorage.getItem(key) || "[]");
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

/* ========================================================================
   TEACHER MESSENGER CHANNEL
   ======================================================================== */
function setupChatMessenger() {
  const sendBtn = document.getElementById("chatSendBtnCircle");
  const input = document.getElementById("chatInputField");
  const stream = document.getElementById("chatMessagesStream");
  const typingIndicator = document.getElementById("liveTypingIndicator");

  if (!sendBtn || !input || !stream) return;

  // Initialize localStorage logs if empty
  const key = getCurrentChatKey();
  if (!localStorage.getItem(key)) {
    const activeId = localStorage.getItem('active_student_id') || 'aarif';
    const profile = STUDENT_PROFILES[activeId] || STUDENT_PROFILES.aarif;
    const initialChats = [
      { sender: "teacher", text: `Hello ${profile.parentName}! I am ${profile.name.split(' ')[0]}'s class coordinator. Welcome to the direct Parent communication channel.`, time: "14:02" },
      { sender: "teacher", text: activeId === 'aarif'
        ? "While Aarif is making progress in his Geometry assessments, his recent mock Algebra OMR scans showed a drop to 45%. We highly recommend encouraging him to open the AI Practice drills inside his Learning Mate app today."
        : activeId === 'samira'
          ? "Samira is performing outstandingly in Algebra (91%). She had minor gaps in circle theorems, but overall her progress is excellent. Please encourage her to continue her good work."
          : "Tanvir has demonstrated exceptional spatial skills in Trigonometry (92%). However, his algebra speed needs a bit of reinforcement. Please encourage him to complete some algebraic timed drills.", time: "14:04" }
    ];
    localStorage.setItem(key, JSON.stringify(initialChats));
  }

  // Load chat messages
  loadChatLogs();

  // Listen to cross-window storage events!
  window.addEventListener("storage", (e) => {
    if (e.key === getCurrentChatKey()) {
      loadChatLogs();
      // Show alerts indicator if in a different tab
      const chatPanel = document.getElementById("tab-chat");
      if (chatPanel && chatPanel.classList.contains("hide")) {
        const badge = document.querySelector(".alert-nav-badge");
        if (badge) badge.style.display = "flex";
      }
    } else if (e.key === 'active_student_login_event') {
      try {
        const data = JSON.parse(e.newValue);
        if (data && data.studentId) {
          syncActiveStudent(data.studentId);
        }
      } catch(err) {}
    } else if (e.key === 'weekly_milestones_state') {
      drawParentMilestones();
    } else if (e.key === 'active_lesson_plan_topic') {
      checkGoalAlignment();
    } else if (e.key === 'rfid_checkin_event') {
      try {
        const data = JSON.parse(e.newValue);
        const profile = STUDENT_PROFILES[activeStudentId];
        if (data && (data.student === profile.name || data.student === "Aarif Al-Masoom")) {
          showToast(`🔔 RFID: ${profile.name.split(' ')[0]} arrived at school at ${data.time}!`, "success");
          appendAlert("RFID Check-In PRESENT", `${profile.name} arrived safely at St. Gregory High School. Gate-In RFID tap logged at ${data.time}.`, "info");
        }
      } catch(err) {}
    } else if (e.key === 'released_grades_feedback') {
      try {
        const data = JSON.parse(e.newValue);
        const profile = STUDENT_PROFILES[activeStudentId];
        showToast("🧑‍🏫 Mrs. Tasnim Jahan released new OMR grades!", "warning");
        appendAlert("OMR Performance Feedback Released", `Math Midterm results released: ${profile.name.split(' ')[0]} scored ${data.score || profile.score}. Teacher comments: "${data.feedback || 'Good attempt'}"`, "warning");
        
        // Update Copilot brief
        const briefing = document.getElementById("copilotBriefingText");
        if (briefing) {
          briefing.innerHTML = `Good morning! ${profile.name.split(' ')[0]} has successfully arrived at school. His latest Math Midterm OMR results are released (**${data.score || profile.score}** marks, **quadratics mastery: ${profile.algebraMastery}**). Teacher released feedback notes: <em>"${data.feedback || ''}"</em>`;
        }
      } catch(err) {
        showToast("🧑‍🏫 Mrs. Tasnim Jahan released new OMR grades!", "warning");
        appendAlert("OMR Performance Feedback Released", `Teacher released feedback notes: "${e.newValue}"`, "warning");
      }
    } else if (e.key === 'curator_resource_event') {
      try {
        const data = JSON.parse(e.newValue);
        showToast("📚 New study resource recommended by coordinator!", "info");
        appendAlert("Study Content Recommended", `Smart dispatcher suggested: "${data.title || 'Algebra worksheet'}" for target subject "${data.topic || 'Algebra'}"`, "info");
      } catch(err) {}
    } else if (e.key === 'student_tuition_paid') {
      const profile = STUDENT_PROFILES[activeStudentId];
      localStorage.setItem(`student_tuition_paid_${activeStudentId}`, 'true');
      showToast(`💳 Tuition fees of ৳${(profile.dues || 3500).toLocaleString()} settled successfully!`, "success");
      syncActiveStudent(activeStudentId);
    }
  });

  function handleSend() {
    const text = input.value.trim();
    if (text === "") return;

    appendMessageToStorage("parent", text);
    input.value = "";
    loadChatLogs();

    // Trigger Smart Simulated Teacher Response fallback (if teacher app tab is not open)
    simulateTeacherReply(text);
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });

  function simulateTeacherReply(parentText) {
    const lowercaseText = parentText.toLowerCase();
    let replyText = "";
    const profile = STUDENT_PROFILES[activeStudentId];
    const sName = profile.name.split(' ')[0];

    // Dialog matching engine
    if (lowercaseText.includes("algebra") || lowercaseText.includes("math") || lowercaseText.includes("grade") || lowercaseText.includes("fail") || lowercaseText.includes("score")) {
      replyText = `${sName} is extremely capable, but mock OMR reviews show some guess work in quadratic factorization steps. The AI drills I set up are active on the portal. Supporting completion of those will boost the grades!`;
    } else if (lowercaseText.includes("safe") || lowercaseText.includes("where") || lowercaseText.includes("bus") || lowercaseText.includes("school") || lowercaseText.includes("transit")) {
      replyText = `Yes, ${sName} arrived safely at school on Bus #14 this morning at 08:15 AM. The attendance is logged as present, and ${profile.name.split(' ')[0]} is currently attending classes in ${profile.grade}.`;
    } else if (lowercaseText.includes("callback") || lowercaseText.includes("call") || lowercaseText.includes("appointment") || lowercaseText.includes("meet")) {
      replyText = "I have filed your callback appointment! I am available tomorrow at 11:30 AM or Friday afternoon at 2:00 PM. Let me know what works best.";
    } else if (lowercaseText.includes("hello") || lowercaseText.includes("hi") || lowercaseText.includes("hey")) {
      replyText = `Hello! I am monitoring ${sName}'s daily metrics. Let me know if you have questions about homework logs or next week's exam schedules.`;
    } else {
      replyText = `Thank you for the message! I am keeping a close eye on ${sName}'s progress in class. By keeping daily task digests complete, we can ensure perfect preparation.`;
    }

    // Typing Delay Simulation
    setTimeout(() => {
      // Show typing indicator
      if (typingIndicator && stream) {
        typingIndicator.classList.add("active");
        stream.appendChild(typingIndicator); // Ensure it stays at bottom
        stream.scrollTop = stream.scrollHeight;
      }

      setTimeout(() => {
        // Hide typing indicator
        if (typingIndicator) {
          typingIndicator.classList.remove("active");
        }

        // Append Teacher Reply Bubble to shared storage and reload
        appendMessageToStorage("teacher", replyText);
        loadChatLogs();

        // Sound alert
        showToast("💬 New reply from Mrs. Tasnim Jahan", "✉️");

      }, 1500); // Bounces for 1.5 seconds

    }, 600); // 600ms pause before starting to type
  }
}

/* ========================================================================
   UTILITY HELPER FUNCTIONS
   ======================================================================== */
function getCurrentTimeStr() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}`;
}

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

/* ========================================================================
   MEGA EXPANSION ADDITIONS - COMPANION SYSTEM FUNCTIONS
   ======================================================================== */

// --- FEATURE 3: Lego Tips Slide-up Drawer Toggles ---
window.openLegoTipsDrawer = function() {
  const drawer = document.getElementById("legoTipsDrawer");
  if (drawer) drawer.classList.add("active");
  showToast("🧱 Opened Lego Math factoring visualization sheet", "info");
};

window.closeLegoTipsDrawer = function() {
  const drawer = document.getElementById("legoTipsDrawer");
  if (drawer) drawer.classList.remove("active");
};

// --- FEATURE 5: Clickable legends/segments in SVG study pulse donut chart showing minute breakdowns ---
function setupDonutInteractiveFilter() {
  const donutDetailBox = document.getElementById("donutDetailBox");
  const donutMinutesTotal = document.getElementById("donutMinutesTotal");
  const legendAlgebra = document.getElementById("legendAlgebra");
  const legendTrig = document.getElementById("legendTrig");
  const legendPhysics = document.getElementById("legendPhysics");
  
  const defaultMinutes = 250;
  let activeFilter = null;
  
  const detailsMap = {
    algebra: {
      minutes: 120,
      title: "Algebra Drills",
      color: "var(--accent-red)",
      summary: "Factoring quadratic equations, vertex graphing, and polynomial expansion. Aarif spent 48% of his study time solving adaptive math drill sheets."
    },
    trig: {
      minutes: 80,
      title: "Trigonometry Evaluation",
      color: "var(--accent-gold)",
      summary: "Right-angle sines, cosine law derivations, and unit circle rotations. Aarif displays excellent retention with 88% mastery in geometry."
    },
    physics: {
      minutes: 50,
      title: "Physics & Science",
      color: "var(--success-color)",
      summary: "Newtonian mechanics, momentum vectors, and kinetic energy conversions. Aarif completed 3 homework files successfully."
    }
  };
  
  function applyFilter(key) {
    if (!donutDetailBox || !donutMinutesTotal) return;
    if (activeFilter === key) {
      // Reset filter
      activeFilter = null;
      donutMinutesTotal.textContent = defaultMinutes;
      donutDetailBox.style.display = "none";
      resetHighlights();
    } else {
      activeFilter = key;
      const data = detailsMap[key];
      donutMinutesTotal.textContent = data.minutes;
      donutDetailBox.style.display = "block";
      donutDetailBox.innerHTML = `
        <h4 style="font-size:11px; font-weight:800; color:${data.color}; margin-bottom:4px;">📊 Active Focus: ${data.title}</h4>
        <p style="font-size:10px; color:var(--text-muted); line-height:1.45; margin:0;">${data.summary}</p>
      `;
      highlightLegend(key);
    }
  }
  
  function resetHighlights() {
    [legendAlgebra, legendTrig, legendPhysics].forEach(el => {
      if (el) el.style.background = "transparent";
    });
  }
  
  function highlightLegend(key) {
    resetHighlights();
    const map = { algebra: legendAlgebra, trig: legendTrig, physics: legendPhysics };
    const target = map[key];
    if (target) {
      target.style.background = "rgba(255, 255, 255, 0.05)";
    }
  }
  
  if (legendAlgebra) legendAlgebra.addEventListener("click", () => applyFilter("algebra"));
  if (legendTrig) legendTrig.addEventListener("click", () => applyFilter("trig"));
  if (legendPhysics) legendPhysics.addEventListener("click", () => applyFilter("physics"));
}

// --- FEATURE 6: Weekend Family learning activity plans selector card ---
window.activateWeekendQuest = function() {
  const btn = document.getElementById("activateQuestBtn");
  if (btn) {
    btn.textContent = "Quest Active - Sync Sent!";
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.style.background = "var(--success-color)";
  }
  showToast("🚀 Weekend Family Quest activated! Study task dispatched to Aarif.", "info");
  
  // Send event to student app via localStorage
  localStorage.setItem("weekend_quest_event", JSON.stringify({
    active: true,
    title: "Shopping Budget & Ratio Quest",
    time: new Date().toLocaleTimeString()
  }));
};

// --- FEATURE 7: Synced milestone goal checklist progress mapping (Real-time student checklist sync) ---
function drawParentMilestones() {
  const list = document.getElementById("parentMilestonesList");
  if (!list) return;
  
  const raw = localStorage.getItem("weekly_milestones_state");
  if (!raw) {
    list.innerHTML = `<p style="font-size:10px; color:var(--text-muted); text-align:center; padding:10px;">No active milestones. Add them in Student/Parent goals!</p>`;
    return;
  }
  
  try {
    const milestones = JSON.parse(raw);
    list.innerHTML = "";
    
    if (milestones.length === 0) {
      list.innerHTML = `<p style="font-size:10px; color:var(--text-muted); text-align:center; padding:10px;">No milestones found.</p>`;
      return;
    }
    
    milestones.forEach((m, idx) => {
      const item = document.createElement("div");
      item.className = `digest-task-item ${m.completed ? 'completed' : ''}`;
      
      item.innerHTML = `
        <div class="task-checkbox"></div>
        <div class="task-details">
          <h4>${escapeHTML(m.text)}</h4>
          <p>Sync reward: ${escapeHTML(m.reward || '+30 XP')}</p>
        </div>
        <span class="task-done-badge" style="background:${m.completed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)'}; color:${m.completed ? 'var(--success-color)' : 'var(--text-muted)'};">
          ${m.completed ? 'Completed' : 'Pending'}
        </span>
      `;
      
      item.addEventListener("click", () => {
        m.completed = !m.completed;
        localStorage.setItem("weekly_milestones_state", JSON.stringify(milestones));
        drawParentMilestones();
        showToast(`Goal status updated for [${m.text}]!`, "success");
      });
      
      list.appendChild(item);
    });
  } catch(e) {
    console.error("Error drawing parent milestones:", e);
  }
}

// --- FEATURE 8: AI-guided family dinner conversation prompts widget ---
const dinnerPrompts = [
  "\"Instead of asking 'How was school?', ask Aarif: 'What was the toughest bubble to fill in your mock OMR test today?'\"",
  "\"Ask Aarif: 'If we had to model this dining table as a coordinate grid, where would the salt shaker be located relative to the vertex?'\"",
  "\"Ask Aarif: 'What was the most surprising feedback note Mrs. Tasnim Jahan wrote on the Algebra dashboard today?'\"",
  "\"Ask Aarif: 'If you had an infinite budget to design a learning game, what boss fight would quadratic equations represent?'\"",
  "\"Ask Aarif: 'Tell me about one mistake you made in trigonometry and how you solved it on the second try.'\""
];
let currentPromptIdx = 0;
window.rotateDinnerPrompt = function() {
  const promptText = document.getElementById("dinnerPromptText");
  if (!promptText) return;
  
  currentPromptIdx = (currentPromptIdx + 1) % dinnerPrompts.length;
  
  // Transition prompt with smooth visual styling
  promptText.style.opacity = 0;
  setTimeout(() => {
    promptText.textContent = dinnerPrompts[currentPromptIdx];
    promptText.style.opacity = 1;
  }, 150);
  
  showToast("💡 Loaded new dinner dialogue prompt!", "info");
};

// --- FEATURE 9: Simulate preparation drills updates inside AI-predicted exam readiness gauges ---
window.simulatePrepDrill = function() {
  const percentageText = document.getElementById("mathReadinessPercentage");
  const progressBar = document.getElementById("mathReadinessBar");
  const adviceText = document.getElementById("mathReadinessAdvice");
  const simulateBtn = document.getElementById("simulatePrepDrillBtn");
  
  if (!percentageText || !progressBar || !adviceText) return;
  
  percentageText.textContent = "68% Ready";
  percentageText.classList.remove("critical");
  percentageText.classList.add("stable");
  percentageText.style.color = "var(--warning-color)";
  
  progressBar.style.width = "68%";
  progressBar.classList.remove("critical");
  progressBar.classList.add("stable");
  progressBar.style.background = "var(--warning-color)";
  
  adviceText.innerHTML = "📈 <strong>Stable:</strong> Aarif finished simulated drills! Success forecast has been raised to stable margins.";
  adviceText.classList.remove("warning");
  
  if (simulateBtn) {
    simulateBtn.textContent = "Prep Drill Simulated!";
    simulateBtn.disabled = true;
    simulateBtn.style.opacity = "0.7";
    simulateBtn.style.cursor = "not-allowed";
  }
  
  showToast("🏆 Mathematics Exam readiness upgraded to 68%!", "success");
  
  // Update personalized Morning Briefing text to reflect this!
  const briefing = document.getElementById("copilotBriefingText");
  if (briefing) {
    briefing.innerHTML = "Good morning! Aarif has successfully arrived at school. His latest Math Midterm OMR results are released (**12/15** marks). Tuition bills are settled. **His Algebra Exam readiness is raised to 68% after the Prep Drill simulation.**";
  }
};

// --- FEATURE 10: Teacher alignment active indicator badge on parent goals panel ---
window.checkGoalAlignment = function() {
  const input = document.getElementById("parentGoalInput");
  const badge = document.getElementById("teacherAlignmentBadge");
  const helpText = document.getElementById("alignmentHelpText");
  
  if (!input || !badge) return;
  
  const val = input.value.trim().toLowerCase();
  const teacherTopic = localStorage.getItem("active_lesson_plan_topic") || "quadratics";
  
  if (val === "") {
    badge.textContent = "⚠️ Empty Goal";
    badge.classList.remove("aligned");
    badge.style.background = "rgba(239, 68, 68, 0.1)";
    badge.style.color = "var(--error-color)";
    if (helpText) helpText.textContent = "Enter a goal to coordinate with the teacher.";
    return;
  }
  
  if (val.includes(teacherTopic) || teacherTopic.includes(val) || (teacherTopic === "quadratics" && val.includes("algebra"))) {
    badge.textContent = "✓ Teacher Aligned";
    badge.classList.add("aligned");
    if (helpText) helpText.innerHTML = `✨ <strong>Perfect Alignment!</strong> Mrs. Tasnim Jahan is currently teaching <strong>"${teacherTopic}"</strong> in class!`;
  } else {
    badge.textContent = "⚠️ Core Target";
    badge.classList.remove("aligned");
    badge.style.background = "rgba(245, 158, 11, 0.1)";
    badge.style.color = "var(--warning-color)";
    if (helpText) helpText.innerHTML = `💡 Core curriculum target. Teacher's active lesson topic is <strong>"${teacherTopic}"</strong>.`;
  }
};

// --- FEATURE 2: Alerts history timeline repository logs in Alerts tab ---
const ALERTS_STORAGE_KEY = "parent_alerts_timeline";

window.initAlertsTimeline = function() {
  const initialAlerts = [
    { title: "RFID Gate Tap PRESENT", body: "Aarif Al-Masoom scanned check-in card at gate at 08:15 AM.", time: "Today 08:15 AM", type: "info" },
    { title: "OMR Grading Released", body: "Math Midterm OMR graded: Scored 12/15 (80%). Conceptual alert for quadratics.", time: "Today 02:40 PM", type: "warning" },
    { title: "Tuition Invoice Pending", body: "May tuition dues of ৳3,500 are pending payment via bKash/Nagad.", time: "Yesterday", type: "critical" }
  ];
  
  if (!localStorage.getItem(ALERTS_STORAGE_KEY)) {
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(initialAlerts));
  }
  loadAlertsTimeline();
};

function loadAlertsTimeline() {
  const stream = document.getElementById("alertsTimelineStream");
  if (!stream) return;
  
  const alerts = JSON.parse(localStorage.getItem(ALERTS_STORAGE_KEY) || "[]");
  stream.innerHTML = "";
  
  alerts.forEach(item => {
    const node = document.createElement("div");
    node.className = `timeline-alert-item ${item.type || 'info'}`;
    node.innerHTML = `
      <div class="timeline-alert-header">
        <span class="timeline-alert-title">${escapeHTML(item.title)}</span>
        <span class="timeline-alert-time">${escapeHTML(item.time)}</span>
      </div>
      <div class="timeline-alert-body">${escapeHTML(item.body)}</div>
    `;
    stream.appendChild(node);
  });
}

window.appendAlert = function(title, body, type = "info") {
  const alerts = JSON.parse(localStorage.getItem(ALERTS_STORAGE_KEY) || "[]");
  alerts.unshift({
    title: title,
    body: body,
    time: "Just Now",
    type: type
  });
  localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts.slice(0, 10)));
  loadAlertsTimeline();
};

/* ========================================================================
   PREPCAST REAL-TIME PARENT STUDY SYNC TRACKER
   ======================================================================== */
let parentPodcastLiveTimeout = null;

window.setupParentPodcastListener = function() {
  // Try loading initial state from localStorage if active
  const initialData = localStorage.getItem('student_podcast_activity');
  if (initialData) {
    try {
      updateParentPodcastUI(JSON.parse(initialData));
    } catch(e) {}
  }

  // Set up storage listener
  window.addEventListener('storage', (e) => {
    if (e.key === 'student_podcast_activity' && e.newValue) {
      try {
        const activity = JSON.parse(e.newValue);
        updateParentPodcastUI(activity);
      } catch (err) {}
    }
  });
};

function updateParentPodcastUI(activity) {
  const subjectEl = document.getElementById("parentPodcastSubject");
  const statusEl = document.getElementById("parentPodcastLiveStatus");
  const titleEl = document.getElementById("parentPodcastTitle");
  const progressEl = document.getElementById("parentPodcastProgressBar");
  const progressTextEl = document.getElementById("parentPodcastProgressText");
  const timeTextEl = document.getElementById("parentPodcastTimeText");
  const dialogueEl = document.getElementById("parentPodcastDinnerDialogue");
  const dialogueTextEl = document.getElementById("parentPodcastDinnerPromptText");

  if (!subjectEl || !statusEl || !titleEl || !progressEl || !progressTextEl || !timeTextEl) return;

  // Set standard info
  subjectEl.textContent = `${activity.subject.toUpperCase()} • PREPCAST`;
  titleEl.textContent = activity.title;
  progressEl.style.width = `${activity.progress}%`;
  progressTextEl.textContent = `${activity.progress}% Complete`;
  timeTextEl.textContent = `${activity.duration} mins listened`;

  // Clear pending timeouts
  if (parentPodcastLiveTimeout) clearTimeout(parentPodcastLiveTimeout);

  if (activity.progress >= 100) {
    statusEl.textContent = "Completed ✅";
    statusEl.style.background = "rgba(16, 185, 129, 0.15)";
    statusEl.style.color = "#10b981";
    statusEl.style.borderColor = "rgba(16, 185, 129, 0.2)";
  } else {
    statusEl.textContent = "Listening 🎧";
    statusEl.style.background = "rgba(59, 130, 246, 0.15)";
    statusEl.style.color = "#3b82f6";
    statusEl.style.borderColor = "rgba(59, 130, 246, 0.2)";

    // Set timeout to transition to "Paused" if no updates for 2.5 seconds
    parentPodcastLiveTimeout = setTimeout(() => {
      statusEl.textContent = "Paused ⏸️";
      statusEl.style.background = "rgba(245, 158, 11, 0.15)";
      statusEl.style.color = "#f59e0b";
      statusEl.style.borderColor = "rgba(245, 158, 11, 0.2)";
    }, 2500);
  }

  // Dinner prompt generation based on subject/chapter
  if (activity.progress > 0) {
    dialogueEl.style.display = "block";
    let prompt = `Ask Aarif over dinner: 'Aarif is listening to ${activity.title}! Ask him: what is a real-world example of this concept that you discussed today?'`;
    
    const titleLower = activity.title.toLowerCase();
    if (titleLower.includes("quadratics") || titleLower.includes("math")) {
      prompt = `Ask Aarif over dinner: 'What did Mrs. Tasnim Jahan say about splitting the middle term? Did you understand the signs of the quadratic roots positive 2 and positive 3?'`;
    } else if (titleLower.includes("vectors") || titleLower.includes("force")) {
      prompt = `Ask Aarif over dinner: 'Dr. Arif released Force & Velocity Vectors! Ask Aarif: what is the difference between a vector and a scalar?'`;
    } else if (titleLower.includes("gravity") || titleLower.includes("newtonian")) {
      prompt = `Ask Aarif over dinner: 'Dr. Arif released Newtonian Gravity! Ask Aarif over dinner: what did he say about gravitational attraction forces between two mass points?'`;
    } else if (titleLower.includes("bond") || titleLower.includes("valency") || titleLower.includes("organic")) {
      prompt = `Ask Aarif over dinner: 'Ask Aarif: what is carbon tetravallency and why does it form four covalent bonds in organic molecules?'`;
    }

    dialogueTextEl.textContent = `"${prompt}"`;
  }
}

// ========================================================================
// 7.2 POMODORO REAL-TIME FOCUS MONITOR ENGINE (PARENTING COPILOT)
// ========================================================================
let parentFocusTimeout = null;

window.setupParentFocusMonitor = function() {
  // Read current student Pomodoro activity state
  const initialActivity = localStorage.getItem('student_pomodoro_activity');
  if (initialActivity) {
    try {
      const activity = JSON.parse(initialActivity);
      updateParentFocusUI(activity);
    } catch (err) {}
  } else {
    // Set default idle UI values
    updateParentFocusUI(null);
  }
  
  // Set up real-time cross-tab storage event listener
  window.addEventListener('storage', (e) => {
    if (e.key === 'student_pomodoro_activity') {
      try {
        const activity = JSON.parse(e.newValue);
        updateParentFocusUI(activity);
      } catch (err) {}
    }
  });
};

function updateParentFocusUI(activity) {
  const card = document.getElementById("parentFocusMonitorCard");
  const pulseRing = document.getElementById("parentFocusPulseRing");
  const statusBadge = document.getElementById("parentFocusStatusBadge");
  const timerDisplay = document.getElementById("parentFocusTimerDisplay");
  const ringFill = document.getElementById("parentFocusRingFill");
  const activeTaskText = document.getElementById("parentFocusActiveTaskText");
  const completedSessionsText = document.getElementById("parentCompletedSessionsCount");
  const totalMinsText = document.getElementById("parentTotalFocusMinutes");
  const nudgeBtn = document.getElementById("parentNudgeBtn");
  
  if (!card || !statusBadge || !timerDisplay || !ringFill || !activeTaskText || !completedSessionsText || !totalMinsText) return;
  
  if (parentFocusTimeout) clearTimeout(parentFocusTimeout);
  
  if (!activity) {
    // Set Idle state
    statusBadge.textContent = "Idle Mode";
    statusBadge.style.background = "rgba(156, 163, 175, 0.15)";
    statusBadge.style.color = "#9ca3af";
    
    pulseRing.style.background = "#9ca3af";
    pulseRing.style.animation = "none";
    
    timerDisplay.textContent = "25:00";
    ringFill.setAttribute("stroke-dashoffset", 0);
    ringFill.setAttribute("stroke", "rgba(255,255,255,0.15)");
    
    activeTaskText.textContent = "No active focus milestone locked.";
    completedSessionsText.textContent = "0 / 5";
    totalMinsText.textContent = "0 mins";
    
    if (nudgeBtn) nudgeBtn.disabled = true;
    return;
  }
  
  // Roster completed sessions and minutes
  completedSessionsText.textContent = `${activity.completedSessions || 0} / 5`;
  totalMinsText.textContent = `${activity.totalMinutes || 0} mins`;
  
  // Set active goal milestone description
  if (activity.activeTask) {
    activeTaskText.textContent = activity.activeTask;
  } else {
    activeTaskText.textContent = activity.mode === "work" ? "General deep study session" : "Taking a well-deserved breather! 💤";
  }
  
  // Set active countdown string
  const minutes = Math.floor(activity.secondsLeft / 60);
  const seconds = activity.secondsLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Update parent ring fill
  const totalSeconds = activity.totalSeconds || 1500;
  const fraction = activity.secondsLeft / totalSeconds;
  const offset = 276.46 * (1 - fraction);
  ringFill.setAttribute("stroke-dashoffset", offset);
  
  // Enable nudge button if focus is actively running
  if (nudgeBtn) nudgeBtn.disabled = !activity.isRunning;
  
  if (!activity.isRunning) {
    // Paused or Idle Mode
    statusBadge.textContent = activity.mode === "work" ? "Focused Paused" : `${activity.mode.toUpperCase()} BREAK`;
    statusBadge.style.background = "rgba(245, 158, 11, 0.15)";
    statusBadge.style.color = "#f59e0b";
    
    pulseRing.style.background = "#f59e0b";
    pulseRing.style.animation = "none";
    
    ringFill.setAttribute("stroke", "#f59e0b");
  } else {
    // Actively running
    if (activity.mode === "work") {
      statusBadge.textContent = "Study Focus Lock ⏱️";
      statusBadge.style.background = "rgba(239, 68, 68, 0.2)";
      statusBadge.style.color = "#f87171";
      
      pulseRing.style.background = "#ef4444";
      pulseRing.style.animation = "livePulseParent 1.5s infinite";
      ringFill.setAttribute("stroke", "#fbbf24"); // Glow gold
    } else {
      statusBadge.textContent = `${activity.mode.toUpperCase()} BREAK ☕`;
      statusBadge.style.background = "rgba(16, 185, 129, 0.2)";
      statusBadge.style.color = "#34d399";
      
      pulseRing.style.background = "#10b981";
      pulseRing.style.animation = "livePulseParent 1.5s infinite";
      ringFill.setAttribute("stroke", "#10b981"); // Forest green
    }
  }
}

// 7.2 Send Encouragement Nudge from parent to student portal
window.sendPomodoroEncouragement = function() {
  const nudgeInput = document.getElementById("parentNudgeCustomMsg");
  let msg = nudgeInput ? nudgeInput.value : "";
  if (!msg.trim()) {
    msg = "Keep going Aarif! Super proud of your focus! ❤️";
  }
  
  const payload = {
    message: msg,
    timestamp: Date.now()
  };
  
  // Write key to trigger student storage listener
  localStorage.setItem('parent_pomodoro_encouragement', JSON.stringify(payload));
  
  // Visual Parent Feedback
  showToast("📣 Cheering nudge dispatched to Aarif! +10 XP awarded.", "❤️");
};


