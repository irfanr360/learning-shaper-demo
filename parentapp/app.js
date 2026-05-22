/* 
========================================================================
   LEARNING SHAPER PARENT COMPANION APP - CORE INTERACTIVE ENGINE
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

  // Chat Messenger Engine
  setupChatMessenger();

  // Callback Appointment Workflow
  setupCallbackWorkflow();
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
      
      // Simulate teacher writing back in chat portal after 4 seconds
      setTimeout(() => {
        const chatBadge = document.querySelector(".alert-nav-badge");
        if (chatBadge && document.getElementById("tab-chat").classList.contains("hide")) {
          chatBadge.style.display = "flex";
        }
        
        // Push notification in background
        showToast("💬 New message from Mrs. Tasnim Jahan regarding your callback.", "✉️");
        
        // Append response into message array
        const stream = document.getElementById("chatMessagesStream");
        if (stream) {
          const teacherMsg = document.createElement("div");
          teacherMsg.className = "message-bubble teacher";
          teacherMsg.innerHTML = `
            <p>I have received your callback request regarding Aarif's math performance. I am free tomorrow during my 3rd period prep slot at 11:30 AM. Does that time suit you?</p>
            <span class="message-time">${getCurrentTimeStr()}</span>
          `;
          stream.appendChild(teacherMsg);
          stream.scrollTop = stream.scrollHeight;
        }
      }, 5000);

    });
  }
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

  function handleSend() {
    const text = input.value.trim();
    if (text === "") return;

    // 1. Append Parent Message Bubble
    const parentMsg = document.createElement("div");
    parentMsg.className = "message-bubble parent";
    parentMsg.innerHTML = `
      <p>${escapeHTML(text)}</p>
      <span class="message-time">${getCurrentTimeStr()}</span>
    `;
    stream.appendChild(parentMsg);
    
    // Clear Input and Scroll
    input.value = "";
    stream.scrollTop = stream.scrollHeight;

    // 2. Trigger Smart Simulated Teacher Response
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

    // Dialog matching engine
    if (lowercaseText.includes("algebra") || lowercaseText.includes("math") || lowercaseText.includes("grade") || lowercaseText.includes("fail") || lowercaseText.includes("score")) {
      replyText = "Aarif is extremely capable, but mock OMR reviews show he is guessing some quadratic factorization steps. The AI drills I set up are active on his portal. Supporting him to finish those will boost him back up!";
    } else if (lowercaseText.includes("safe") || lowercaseText.includes("where") || lowercaseText.includes("bus") || lowercaseText.includes("school") || lowercaseText.includes("transit")) {
      replyText = "Yes, Aarif arrived safely at school on Bus #14 this morning at 08:15 AM. His attendance is logged as present, and he is currently attending classes in Grade 8-C.";
    } else if (lowercaseText.includes("callback") || lowercaseText.includes("call") || lowercaseText.includes("appointment") || lowercaseText.includes("meet")) {
      replyText = "I have filed your callback appointment! I am available tomorrow at 11:30 AM or Friday afternoon at 2:00 PM. Let me know what works best.";
    } else if (lowercaseText.includes("hello") || lowercaseText.includes("hi") || lowercaseText.includes("hey")) {
      replyText = "Hello! I am monitoring Aarif's daily metrics. Let me know if you have questions about his homework logs or next week's exam schedules.";
    } else {
      replyText = "Thank you for the message! I am keeping a close eye on Aarif's progress in class. By keeping his daily task digests complete, we can ensure he stays perfectly prepared.";
    }

    // Typing Delay Simulation
    setTimeout(() => {
      // Show typing indicator
      if (typingIndicator) {
        typingIndicator.classList.add("active");
        stream.appendChild(typingIndicator); // Ensure it stays at bottom
        stream.scrollTop = stream.scrollHeight;
      }

      setTimeout(() => {
        // Hide typing indicator
        if (typingIndicator) {
          typingIndicator.classList.remove("active");
        }

        // Append Teacher Reply Bubble
        const teacherMsg = document.createElement("div");
        teacherMsg.className = "message-bubble teacher";
        teacherMsg.innerHTML = `
          <p>${replyText}</p>
          <span class="message-time">${getCurrentTimeStr()}</span>
        `;
        stream.appendChild(teacherMsg);
        stream.scrollTop = stream.scrollHeight;

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
