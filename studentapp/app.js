/*
========================================================================
   LEARNING SHAPER STUDENT COMPANION APP - CORE INTERACTIVE ENGINE
========================================================================
*/

// --- STATE MANAGEMENT ---
let studentState = {
  theme: 'dark',
  activeTab: 'home',
  level: 12,
  xp: 850,
  maxXp: 1000,
  paymentGateway: 'bKash',
  tuitionPaid: false,
  recheckFiled: false,
  quizDifficulty: 'easy',
  currentQuizIndex: 0,
  selectedQuizOption: null,
  isRecordingVoice: false
};

// --- DATASETS ---
const algebraQuizDrills = {
  easy: [
    {
      id: 'eq1',
      question: "Factorize completely: <strong>x² - 5x + 6 = 0</strong>. What are the roots?",
      options: [
        "A)  x = 1, x = 6",
        "B)  x = 2, x = 3",
        "C)  x = -2, x = -3",
        "D)  x = 5, x = -6"
      ],
      correctIndex: 1,
      hint1: "Find two numbers that multiply to +6 (constant term) and add up to -5 (middle term). Since they multiply to a positive but add to a negative, both roots must be positive values!",
      hint2: "Factor shape: (x - p)(x - q) = 0. We need -p * -q = +6 and -p - q = -5. These numbers are -2 and -3.",
      hint3: "Factorized form is (x - 2)(x - 3) = 0. Solving each bracket for zero gives roots: x = 2 and x = 3.",
      explanation: "Break the middle term: x² - 2x - 3x + 6 = 0. Group terms: x(x - 2) - 3(x - 2) = 0. Therefore, (x - 2)(x - 3) = 0, which gives the roots x = 2 and x = 3."
    }
  ],
  medium: [
    {
      id: 'eq2',
      question: "Solve the quadratic equation: <strong>x² - x - 6 = 0</strong>. What are the roots?",
      options: [
        "A)  x = 3, x = -2",
        "B)  x = -3, x = 2",
        "C)  x = 6, x = -1",
        "D)  x = 1, x = -6"
      ],
      correctIndex: 0,
      hint1: "We need two numbers that multiply to -6 (constant) and add to -1 (coefficient of x). Since the product is negative, the roots have opposite signs.",
      hint2: "The numbers are -3 and +2 since (-3) * (+2) = -6 and (-3) + (+2) = -1. Use these to split the middle term.",
      hint3: "Split: x² - 3x + 2x - 6 = 0. Group: x(x - 3) + 2(x - 3) = 0. Thus, (x - 3)(x + 2) = 0, which gives roots x = 3 and x = -2.",
      explanation: "Rewrite: x² - 3x + 2x - 6 = 0. Factorize by grouping: x(x - 3) + 2(x - 3) = 0. Thus, (x - 3)(x + 2) = 0, giving roots x = 3 and x = -2."
    }
  ],
  hard: [
    {
      id: 'eq3',
      question: "Find the roots of the equation: <strong>2x² - 5x - 3 = 0</strong>.",
      options: [
        "A)  x = 3, x = -1/2",
        "B)  x = -3, x = 1/2",
        "C)  x = 2, x = -3/2",
        "D)  x = 3, x = -2"
      ],
      correctIndex: 0,
      hint1: "Use middle-term splitting. Multiply the x² coefficient (2) by the constant (-3) to get -6. Find two numbers that multiply to -6 and add to -5.",
      hint2: "The numbers are -6 and +1. Split the middle term: 2x² - 6x + x - 3 = 0. Now group and factor out terms.",
      hint3: "Factor: 2x(x - 3) + 1(x - 3) = 0, giving (2x + 1)(x - 3) = 0. Roots are x = 3 and x = -1/2.",
      explanation: "Split the middle term: 2x² - 6x + x - 3 = 0. Group: 2x(x - 3) + 1(x - 3) = 0. This factors to (2x + 1)(x - 3) = 0. Roots are x = 3 and x = -1/2."
    }
  ]
};

// --- CORE SYSTEM INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Setup Clock Update
  updateSystemTime();
  setInterval(updateSystemTime, 60000);

  // Setup Event Listeners
  setupThemeToggle();
  setupUIEventListeners();
  setupQuizEngine();
  setupTransportSimulation();
  setupParabolaSimulation(); // Initialize parabola interactive visualizer!
  loadSyncedMilestones();      // Initialize synced milestones!

  // Draw initial state UI elements
  updateXpBar();

  // Listen for storage changes from Parent or Teacher app
  window.addEventListener('storage', (e) => {
    if (e.key === 'weekly_milestones_state') {
      loadSyncedMilestones();
    } else if (e.key === 'rfid_checkin_event') {
      try {
        const checkin = JSON.parse(e.newValue);
        if (checkin && checkin.student === 'Aarif Al-Masoom') {
          showToast(`🔔 RFID Check-in recorded at ${checkin.time}: PRESENT`, 'warning');
        }
      } catch (err) {}
    } else if (e.key === 'teacher_recheck_response') {
      showToast('🧑‍🏫 Teacher updated re-evaluation request status!', 'success');
      const statusBadge = document.getElementById('recheckStatusBadge');
      if (statusBadge) {
        statusBadge.innerText = `✅ Request Status: Approved (${e.newValue})`;
        statusBadge.style.background = 'rgba(16, 185, 129, 0.1)';
        statusBadge.style.color = 'var(--success-color)';
      }
    }
  });
});

// Update top status bar time
function updateSystemTime() {
  const clockElement = document.getElementById('statusBarTime');
  if (clockElement) {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clockElement.innerText = `${hours}:${minutes}`;
  }
}

// Theme toggler (Light Cream / Dark Cosmic)
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const phoneContainer = document.getElementById('phoneContainer');
  const themeIcon = document.getElementById('themeIcon');

  toggleBtn.addEventListener('click', () => {
    if (studentState.theme === 'dark') {
      studentState.theme = 'light';
      phoneContainer.removeAttribute('data-theme');
      // Sun Icon SVG representation
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`;
      showToast('Switched to Classic Light theme', 'success');
    } else {
      studentState.theme = 'dark';
      phoneContainer.setAttribute('data-theme', 'dark');
      // Moon Icon SVG representation
      themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;
      showToast('Switched to Cosmic Dark theme', 'success');
    }
  });
}

// Router tabs logic
function switchTab(tabId) {
  studentState.activeTab = tabId;
  
  // Update Tab View visibility
  const panels = document.querySelectorAll('.tab-content-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add('active');
    }
  });

  // Update Nav Bottom Item Highlight
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    // Simple matching index checking
    const name = item.innerText.trim().toLowerCase();
    if (name === 'ai practice' && tabId === 'practice') item.classList.add('active');
    else if (name === 'bus' && tabId === 'transport') item.classList.add('active');
    else if (name === tabId) item.classList.add('active');
  });

  // Specific Actions on Load
  if (tabId === 'practice') {
    renderQuizQuestion();
  }
}

// Event Bindings
function setupUIEventListeners() {
  // OMR Re-evaluation request
  const recheckBtn = document.getElementById('recheckBtn');
  const statusBadge = document.getElementById('recheckStatusBadge');
  recheckBtn.addEventListener('click', () => {
    if (studentState.recheckFiled) return;
    
    recheckBtn.innerText = "Submitting File...";
    recheckBtn.disabled = true;
    
    setTimeout(() => {
      studentState.recheckFiled = true;
      recheckBtn.style.display = 'none';
      statusBadge.style.display = 'block';
      showToast('OMR sheet re-evaluation request submitted to coordinator!', 'success');
      localStorage.setItem('student_recheck_filed', 'true');
      addXp(30); // XP reward for interacting
    }, 1500);
  });

  // Tuition Pay trigger drawer
  const payTuitionBtn = document.getElementById('payTuitionBtn');
  const paymentModal = document.getElementById('paymentModal');
  const paymentModalClose = document.getElementById('paymentModalClose');
  
  payTuitionBtn.addEventListener('click', () => {
    if (studentState.tuitionPaid) {
      showToast('Dues are already fully settled!', 'warning');
      return;
    }
    paymentModal.style.display = 'flex';
    setTimeout(() => paymentModal.classList.add('active'), 50);
  });

  paymentModalClose.addEventListener('click', () => {
    paymentModal.classList.remove('active');
    setTimeout(() => paymentModal.style.display = 'none', 300);
  });

  // Pay Confirmation Executor
  const payExecuteBtn = document.getElementById('payExecuteBtn');
  const receiptSuccessCard = document.getElementById('receiptSuccessCard');
  payExecuteBtn.addEventListener('click', () => {
    const phoneInput = document.getElementById('paymentPhone').value;
    const pinInput = document.getElementById('paymentPin').value;
    
    if (!phoneInput || !pinInput) {
      showToast('Please enter credentials to verify checkout', 'warning');
      return;
    }

    payExecuteBtn.innerText = "Authorizing Transaction...";
    payExecuteBtn.disabled = true;

    setTimeout(() => {
      studentState.tuitionPaid = true;
      
      // Update Tuition Tab UI
      const tuitionDueItem = document.getElementById('tuitionDueItem');
      const tuitionDueAmountText = document.getElementById('tuitionDueAmountText');
      if (tuitionDueItem) {
        tuitionDueItem.style.background = "rgba(16, 185, 129, 0.04)";
        tuitionDueItem.style.borderColor = "rgba(16, 185, 129, 0.2)";
        tuitionDueItem.querySelector('p').innerHTML = `Paid via ${studentState.paymentGateway} on May 22, 2026`;
      }
      if (tuitionDueAmountText) {
        tuitionDueAmountText.innerText = "৳0 (PAID)";
        tuitionDueAmountText.style.color = "var(--success-color)";
      }
      payTuitionBtn.innerText = "Fees Settled";
      payTuitionBtn.disabled = true;

      // Close modal
      paymentModal.classList.remove('active');
      setTimeout(() => paymentModal.style.display = 'none', 300);

      // Slide up receipt card
      receiptSuccessCard.style.display = 'flex';
      
      // Sync payment state to localStorage so Parent App receives it
      localStorage.setItem('student_tuition_paid', 'true');

      // Trigger milestone completion
      const milestoneItem = document.getElementById('milestoneDrill');
      if (milestoneItem && !milestoneItem.classList.contains('completed')) {
        toggleMilestone(milestoneItem, 50);
      }

      showToast('Payment successful! Invoice receipt generated.', 'success');
      
      // Reset checkout executor state
      payExecuteBtn.innerText = `Confirm Payment (৳3,500)`;
      payExecuteBtn.disabled = false;
    }, 2000);
  });

  // Receipt Dismiss Close
  document.getElementById('receiptCloseBtn').addEventListener('click', () => {
    receiptSuccessCard.style.display = 'none';
    switchTab('home');
  });

  // Voice AI chatbot FAB triggers
  const voiceAssistantFab = document.getElementById('voiceAssistantFab');
  const chatAssistantOverlay = document.getElementById('chatAssistantOverlay');
  const chatAssistantClose = document.getElementById('chatAssistantClose');
  
  voiceAssistantFab.addEventListener('click', () => {
    chatAssistantOverlay.style.display = 'flex';
  });

  chatAssistantClose.addEventListener('click', () => {
    chatAssistantOverlay.style.display = 'none';
  });

  // Interactive Voice/Text Q&A chat
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  const chatVoiceBtn = document.getElementById('chatVoiceBtn');
  
  chatSendBtn.addEventListener('click', handleChatTextSubmit);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatTextSubmit();
  });

  chatVoiceBtn.addEventListener('click', handleVoiceRecordingToggle);
  
  // Close Level Up Modal Overlay
  document.getElementById('levelUpCloseBtn').addEventListener('click', () => {
    document.getElementById('levelUpModal').style.display = 'none';
    showToast('Weekly milestones refreshed! +50 XP bonus awarded.', 'success');
  });

  // Open Achievements Shelf Drawer
  const btnOpenBadgesShelf = document.getElementById('btnOpenBadgesShelf');
  const badgesShelfDrawer = document.getElementById('badgesShelfDrawer');
  if (btnOpenBadgesShelf && badgesShelfDrawer) {
    btnOpenBadgesShelf.addEventListener('click', () => {
      badgesShelfDrawer.classList.add('active');
    });
  }
}

// --- SECURE PAYMENT MFS GATEWAY SELECTOR ---
function selectGateway(gatewayName) {
  studentState.paymentGateway = gatewayName;
  
  // Toggle Active States
  document.getElementById('gatebKash').classList.remove('active');
  document.getElementById('gateNagad').classList.remove('active');
  document.getElementById('gateRocket').classList.remove('active');
  
  document.getElementById(`gate${gatewayName}`).classList.add('active');
  
  // Update Inputs labels
  document.getElementById('phoneInputLabel').innerText = `${gatewayName} Account Number`;
  
  // Update CTA Colors based on MFS Branding
  const payBtn = document.getElementById('payExecuteBtn');
  if (gatewayName === 'bKash') {
    payBtn.style.backgroundColor = '#e2136e';
    payBtn.style.boxShadow = '0 4px 15px rgba(226,19,110,0.3)';
  } else if (gatewayName === 'Nagad') {
    payBtn.style.backgroundColor = '#ec5a24';
    payBtn.style.boxShadow = '0 4px 15px rgba(236,90,36,0.3)';
  } else {
    payBtn.style.backgroundColor = '#8c3494';
    payBtn.style.boxShadow = '0 4px 15px rgba(140,52,148,0.3)';
  }
  
  showToast(`Switched gateway to ${gatewayName}`, 'success');
}

// --- MILESTONES CHECKLIST SYSTEMS ---
function toggleMilestone(element, xpReward) {
  if (element.classList.contains('completed')) return; // Avoid double rewards
  
  element.classList.add('completed');
  syncMilestonesToLocalStorage(); // Sync to localStorage!
  
  if (xpReward > 0) {
    showToast(`Milestone completed! +${xpReward} XP awarded.`, 'success');
    addXp(xpReward);
  }
}

// --- ADAPTIVE EXAMS AI QUIZ PRACTICE SYSTEM ---
function setQuizDifficulty(diffLevel) {
  studentState.quizDifficulty = diffLevel;
  studentState.currentQuizIndex = 0;
  
  // Update UI Difficult Selection Highlights
  document.getElementById('diffEasy').classList.remove('active');
  document.getElementById('diffMedium').classList.remove('active');
  document.getElementById('diffHard').classList.remove('active');
  
  // Capitalize level selector matching
  const capitalized = diffLevel.charAt(0).toUpperCase() + diffLevel.slice(1);
  document.getElementById(`diff${capitalized}`).classList.add('active');

  renderQuizQuestion();
  showToast(`AI adapted difficulty to: ${diffLevel.toUpperCase()}`, 'success');
}

function renderQuizQuestion() {
  const currentQuiz = algebraQuizDrills[studentState.quizDifficulty][studentState.currentQuizIndex];
  
  // Update Metadata
  document.getElementById('quizDifficultyBadge').innerText = `QUADRATICS • ${studentState.quizDifficulty.toUpperCase()}`;
  document.getElementById('quizQuestionText').innerHTML = currentQuiz.question;
  
  // Clear choices selections
  studentState.selectedQuizOption = null;
  
  // Render options button layouts
  const optionsList = document.getElementById('quizOptionsList');
  optionsList.innerHTML = '';
  
  currentQuiz.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = optText;
    btn.setAttribute('onclick', `selectQuizOption(this, ${index})`);
    optionsList.appendChild(btn);
  });

  // Hide hints bubble and feedback lists
  document.getElementById('quizHintBubble').style.display = 'none';
  document.getElementById('drillFeedbackPanel').style.display = 'none';
  
  // Reset Action CTA button Text
  const submitBtn = document.getElementById('submitQuizBtn');
  submitBtn.innerText = "Submit Answer";
  submitBtn.onclick = handleQuizSubmit;
}

function selectQuizOption(element, index) {
  // Clear previous selected highlights
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  
  element.classList.add('selected');
  studentState.selectedQuizOption = index;
}

function setupQuizEngine() {
  const hintBtn = document.getElementById('quizHintBtn');
  const hintBubble = document.getElementById('quizHintBubble');
  
  hintBtn.addEventListener('click', () => {
    const isVisible = hintBubble.style.display === 'block';
    hintBubble.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      showHintTier(1); // Default to Tier 1 when opened
    }
  });
}

function handleQuizSubmit() {
  if (studentState.selectedQuizOption === null) {
    showToast('Please select an option to submit!', 'warning');
    return;
  }

  const currentQuiz = algebraQuizDrills[studentState.quizDifficulty][studentState.currentQuizIndex];
  const buttons = document.querySelectorAll('.option-btn');
  const feedbackPanel = document.getElementById('drillFeedbackPanel');
  
  // Disable option modifications
  buttons.forEach(btn => btn.removeAttribute('onclick'));
  
  // XP payouts scale based on difficulty
  let xpReward = 30;
  if (studentState.quizDifficulty === 'medium') xpReward = 50;
  else if (studentState.quizDifficulty === 'hard') xpReward = 80;
  
  if (studentState.selectedQuizOption === currentQuiz.correctIndex) {
    // Correct Action
    buttons[studentState.selectedQuizOption].classList.add('correct-reveal');
    feedbackPanel.className = 'drill-feedback correct';
    feedbackPanel.innerHTML = `🌟 <strong>Correct!</strong> +${xpReward} XP Awarded.<br>${currentQuiz.explanation}`;
    
    // Confetti Celebratory Burst
    triggerConfettiBurst();
    
    // Add XP reward
    addXp(xpReward);
    
    // Check milestones
    const milestoneMath = document.getElementById('milestoneMath');
    if (milestoneMath && !milestoneMath.classList.contains('completed')) {
      toggleMilestone(milestoneMath, 100);
    }
    
    showToast('Excellent! Correct Answer.', 'success');
  } else {
    // Incorrect Action
    buttons[studentState.selectedQuizOption].classList.add('incorrect-reveal');
    buttons[currentQuiz.correctIndex].classList.add('correct-reveal'); // Highlight correct answer
    
    feedbackPanel.className = 'drill-feedback incorrect';
    feedbackPanel.innerHTML = `❌ <strong>Incorrect</strong>.<br>Let's review the steps:<br>${currentQuiz.explanation}`;
    
    showToast('Review the AI explanation steps below and try again!', 'warning');
  }

  // Toggle feedback visibility
  feedbackPanel.style.display = 'block';

  // Toggle Action Button text to 'Next Question' or 'Retry'
  const submitBtn = document.getElementById('submitQuizBtn');
  submitBtn.innerText = "Restart Practice";
  submitBtn.onclick = () => {
    renderQuizQuestion();
  };
}

// --- HIGH-FIDELITY CONFETTI PARTICLE LAUNCHER ---
function triggerConfettiBurst() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const particles = [];
  const colors = ['#8b5cf6', '#ec4899', '#06b6d4', '#fbbf24', '#10b981'];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height - 50,
      r: Math.random() * 6 + 3,
      d: Math.random() * 2 * Math.PI,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 12 - 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let activeParticles = false;
    
    particles.forEach(p => {
      if (p.opacity <= 0) return;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      
      // Update coordinates
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.opacity -= 0.015;
      
      activeParticles = true;
    });

    if (activeParticles) {
      requestAnimationFrame(drawConfetti);
    }
  }

  drawConfetti();
}

// --- EXPERIENCE (XP) & LEVEL ALGORITHMIC UPDATER ---
function addXp(amount) {
  studentState.xp += amount;
  
  // Check Level threshold transitions
  if (studentState.xp >= studentState.maxXp) {
    studentState.level += 1;
    studentState.xp = studentState.xp - studentState.maxXp; // Carry over remainder
    
    // Trigger gorgeous full screen Level-Up overlay drawer
    triggerLevelUpTransition();
  }

  // Update DOM progress meters
  updateXpBar();
}

// Sync XP & Level values dynamically inside DOM
function updateXpBar() {
  const progressFill = document.getElementById('xpProgressFill');
  const xpText = document.getElementById('xpTextIndicator');
  const levelBadge = document.getElementById('avatarLevelBadge');
  const leaderboardXp = document.getElementById('leaderboardXpText');

  if (progressFill) {
    const percentage = (studentState.xp / studentState.maxXp) * 100;
    progressFill.style.width = `${percentage}%`;
  }
  
  if (xpText) {
    xpText.innerText = `${studentState.xp} / ${studentState.maxXp} XP`;
  }
  
  if (levelBadge) {
    levelBadge.innerText = studentState.level;
  }

  if (leaderboardXp) {
    leaderboardXp.innerText = `${studentState.level * 1000 + studentState.xp} XP`;
  }

  // Broadcast student progress updates so parent dashboard reads it
  localStorage.setItem('student_level_state', JSON.stringify({
    level: studentState.level,
    xp: studentState.xp,
    maxXp: studentState.maxXp
  }));
}

function triggerLevelUpTransition() {
  const levelUpModal = document.getElementById('levelUpModal');
  const levelNumberSpan = document.getElementById('levelUpModalNumber');
  
  levelNumberSpan.innerText = studentState.level;
  levelUpModal.style.display = 'flex';
}

// --- TRANSPORT LIVE BUS VEHICLE SIMULATION LOOP ---
function setupTransportSimulation() {
  const busEtaText = document.getElementById('busEtaText');
  const busSubEtaText = document.getElementById('busSubEtaText');
  const busMarker = document.getElementById('busRouteMarker');
  const routeProgressFill = document.getElementById('busRouteProgressFill');
  
  let etaMinutes = 8;
  let progressPercentage = 40;

  // Background ticker loop every 7 seconds simulates bus crawl
  setInterval(() => {
    if (etaMinutes > 0) {
      etaMinutes -= 1;
      progressPercentage += 6; // Move along route line
      
      // Limit bounding bounds
      if (progressPercentage > 85) progressPercentage = 85;

      // Update UI elements
      if (busEtaText) busEtaText.innerText = etaMinutes < 10 ? `0${etaMinutes}` : etaMinutes;
      if (busSubEtaText) busSubEtaText.innerText = `Estimated arrival in ${etaMinutes} mins`;
      if (busMarker) busMarker.style.left = `${progressPercentage}%`;
      if (routeProgressFill) routeProgressFill.style.width = `${progressPercentage}%`;
      
      // Sync bus state to localStorage for parent app to read
      localStorage.setItem('bus_location_state', JSON.stringify({
        eta: etaMinutes,
        progress: progressPercentage
      }));

      if (etaMinutes === 0) {
        showToast('🚌 Bus #14 has arrived at Dhanmondi stop perspective!', 'warning');
        if (busSubEtaText) busSubEtaText.innerText = `Arrived at stop!`;
      }
    }
  }, 7000);
}

// --- AI CHATBOT DIALOG & SPEECH SYNTHESIS ENGINE ---
function handleChatTextSubmit() {
  const input = document.getElementById('chatInput');
  const query = input.value.trim();
  
  if (!query) return;

  // Append user bubble to chatbot panel
  appendChatBubble(query, 'user');
  input.value = '';

  // AI thinking delay
  setTimeout(() => {
    processChatResponse(query);
  }, 1000);
}

function appendChatBubble(text, sender) {
  const messagesBox = document.getElementById('chatBodyMessages');
  if (!messagesBox) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-msg ${sender}`;
  bubble.innerHTML = text;
  
  messagesBox.appendChild(bubble);
  messagesBox.scrollTop = messagesBox.scrollHeight; // Auto Scroll down
}

function handleVoiceRecordingToggle() {
  const voiceBtn = document.getElementById('chatVoiceBtn');
  const input = document.getElementById('chatInput');
  const waveContainer = document.getElementById('voiceWaveContainer');

  if (!studentState.isRecordingVoice) {
    // Start Recording Simulation
    studentState.isRecordingVoice = true;
    voiceBtn.classList.add('recording');
    input.style.display = 'none';
    waveContainer.style.display = 'flex';
    showToast('AI Listening... speak now.', 'success');

    // Automatically stop after 3.5 seconds
    setTimeout(() => {
      if (studentState.isRecordingVoice) {
        handleVoiceRecordingToggle();
        // Insert standard transcript question
        appendChatBubble("How do I factorize quadratic equations?", 'user');
        setTimeout(() => {
          processChatResponse("How do I factorize quadratic equations?");
        }, 1200);
      }
    }, 3500);
  } else {
    // Stop recording Simulation
    studentState.isRecordingVoice = false;
    voiceBtn.classList.remove('recording');
    input.style.display = 'block';
    waveContainer.style.display = 'none';
  }
}

function processChatResponse(query) {
  const normalized = query.toLowerCase();
  let botReply = '';

  if (normalized.includes('quadratic') || normalized.includes('factorize') || normalized.includes('x^2')) {
    botReply = `💡 <strong>Algebra Quadratic Solution:</strong><br>
    To factorize an expression of format <strong>ax² + bx + c = 0</strong>:<br><br>
    1. Find two numbers that multiply to <strong>a * c</strong> and add up to <strong>b</strong>.<br>
    2. Split the middle term using these numbers.<br>
    3. Group and extract common factors.<br><br>
    Example for x² - 5x + 6:<br>
    • Multiply to +6, Add to -5: numbers are -2 and -3.<br>
    • (x - 2)(x - 3) = 0.<br>
    • Roots: <strong>x = 2, x = 3</strong>.`;
  } else if (normalized.includes('bus') || normalized.includes('eta') || normalized.includes('transport')) {
    const etaTextVal = document.getElementById('busEtaText') ? document.getElementById('busEtaText').innerText : "8";
    botReply = `🚌 <strong>Live Transport Dispatch:</strong><br>
    School Bus #14 is currently in transit between City College stop and Dhanmondi stop.<br>
    • ETA to your stop (Dhanmondi): <strong>${etaTextVal} minutes</strong>.<br>
    • Stop Status: Active route.`;
  } else if (normalized.includes('fees') || normalized.includes('tuition') || normalized.includes('outstanding')) {
    if (studentState.tuitionPaid) {
      botReply = `✅ <strong>School Tuition Status:</strong> All fees are settled! May 2026 Tuition of ৳3,500 has been paid successfully via bKash. Receipt transaction key: LS-BK-928472.`;
    } else {
      botReply = `⚠️ <strong>Outstanding Tuition Alert:</strong><br>
      You have pending school fees of <strong>৳3,500</strong> for May 2026.<br>
      • Deadline: May 28, 2026.<br>
      • Please navigate to the <strong>Tuition Tab</strong> to complete checkout via MFS simulators (bKash/Nagad/Rocket).`;
    }
  } else if (normalized.includes('omr') || normalized.includes('exam') || normalized.includes('score')) {
    botReply = `📝 <strong>Digital OMR Scanner Scores:</strong><br>
    Mathematics Midterm Exam: <strong>12 / 15</strong>.<br>
    • Scanned: May 18, 2026.<br>
    • Incorrect marked: Q2 (marked A, correct C), Q5 (unmarked, correct D).<br>
    • You can file a recheck request in the <strong>Exams Tab</strong>!`;
  } else {
    botReply = `I've analyzed your question: "${query}". I can help you guide through active Math tasks! Let me know if you would like me to explain factorizing quadratic equations, outline midterm scores, or show school bus arrival timers!`;
  }

  appendChatBubble(botReply, 'bot');
}

// --- UTILITY SYSTEM TOAST DISPATCHER ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button style="border:none;background:transparent;color:#fff;margin-left:10px;cursor:pointer;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  // Auto remove toast after 4 seconds
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// --- FEATURE 1: PERSONALIZED ROADMAP DRAWER HANDLERS ---
function openRoadmapNode(name, mastery, status, desc) {
  const drawer = document.getElementById('roadmapDetailDrawer');
  if (!drawer) return;
  document.getElementById('roadmapNodeTitle').innerText = name;
  document.getElementById('roadmapNodeMastery').innerText = mastery;
  document.getElementById('roadmapNodeStatus').innerText = status;
  document.getElementById('roadmapNodeDesc').innerText = desc;
  
  const statusSpan = document.getElementById('roadmapNodeStatus');
  if (status === 'Passed') statusSpan.style.color = 'var(--success-color)';
  else if (status === 'In Progress') statusSpan.style.color = 'var(--accent-color)';
  else statusSpan.style.color = 'rgba(255,255,255,0.4)';

  drawer.classList.add('active');
}

function closeRoadmapDrawer() {
  const drawer = document.getElementById('roadmapDetailDrawer');
  if (drawer) drawer.classList.remove('active');
}

// --- FEATURE 2: ACHIEVEMENTS & BADGES SHELF HANDLERS ---
function closeBadgesDrawer() {
  const drawer = document.getElementById('badgesShelfDrawer');
  if (drawer) {
    drawer.classList.remove('active');
    const detailsBox = document.getElementById('badgeDetailsBox');
    if (detailsBox) detailsBox.style.display = 'none';
  }
}

function showBadgeDetails(name, desc, status, reward) {
  const detailsBox = document.getElementById('badgeDetailsBox');
  if (!detailsBox) return;
  document.getElementById('detailBadgeName').innerText = name;
  document.getElementById('detailBadgeDesc').innerText = desc;
  document.getElementById('detailBadgeReward').innerText = `${status} • ${reward}`;
  
  const rewardSpan = document.getElementById('detailBadgeReward');
  if (status === 'Unlocked') {
    rewardSpan.style.color = 'var(--success-color)';
  } else {
    rewardSpan.style.color = 'var(--error-color)';
  }

  detailsBox.style.display = 'block';
}

// --- FEATURE 3: INTERACTIVE QUADRATIC PARABOLA CANVAS ---
function setupParabolaSimulation() {
  const canvas = document.getElementById('parabolaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const sliderA = document.getElementById('sliderA');
  const sliderB = document.getElementById('sliderB');
  const sliderC = document.getElementById('sliderC');
  
  const valA = document.getElementById('valA');
  const valB = document.getElementById('valB');
  const valC = document.getElementById('valC');
  const equationText = document.getElementById('parabolaEquationText');
  
  function drawParabola() {
    const a = parseFloat(sliderA.value);
    const b = parseFloat(sliderB.value);
    const c = parseFloat(sliderC.value);
    
    // Update value displays
    valA.innerText = a.toFixed(1);
    valB.innerText = b.toFixed(1);
    valC.innerText = c.toFixed(1);
    
    // Format equation text nicely
    let eq = `y = ${a.toFixed(1)}x²`;
    if (b >= 0) eq += ` + ${b.toFixed(1)}x`;
    else eq += ` - ${Math.abs(b).toFixed(1)}x`;
    if (c >= 0) eq += ` + ${c.toFixed(1)}`;
    else eq += ` - ${Math.abs(c).toFixed(1)}`;
    equationText.innerHTML = eq;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSpacing = 20;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw Axes (Origin in the middle)
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    
    // X-Axis
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(canvas.width, cy);
    ctx.stroke();
    
    // Y-Axis
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, canvas.height);
    ctx.stroke();
    
    // Draw Parabola: y = ax^2 + bx + c
    // Scale factor: 1 unit = 8 pixels
    const scale = 8; 
    ctx.beginPath();
    ctx.strokeStyle = 'var(--accent-color)';
    ctx.lineWidth = 2.5;
    
    let started = false;
    for (let pixelX = 0; pixelX < canvas.width; pixelX++) {
      // Convert canvas coordinate to graph coordinate
      const graphX = (pixelX - cx) / scale;
      
      // Calculate graph Y
      const graphY = a * graphX * graphX + b * graphX + c;
      
      // Convert graph Y back to canvas coordinate (Y axis is inverted in canvas)
      const pixelY = cy - (graphY * scale);
      
      if (pixelY >= 0 && pixelY <= canvas.height) {
        if (!started) {
          ctx.moveTo(pixelX, pixelY);
          started = true;
        } else {
          ctx.lineTo(pixelX, pixelY);
        }
      } else {
        started = false; // reset when out of bounds
      }
    }
    ctx.stroke();
  }
  
  // Attach listeners
  sliderA.addEventListener('input', drawParabola);
  sliderB.addEventListener('input', drawParabola);
  sliderC.addEventListener('input', drawParabola);
  
  // Initial draw
  drawParabola();
}

// --- FEATURE 4: 3-TIER HINTS ENGINE ---
function showHintTier(tierNum) {
  const currentQuiz = algebraQuizDrills[studentState.quizDifficulty][studentState.currentQuizIndex];
  const hintContent = document.getElementById('hintTierContent');
  if (!hintContent) return;
  
  // Deactivate all tier buttons
  document.getElementById('btnHintTier1').classList.remove('active');
  document.getElementById('btnHintTier2').classList.remove('active');
  document.getElementById('btnHintTier3').classList.remove('active');
  
  // Activate selected
  document.getElementById(`btnHintTier${tierNum}`).classList.add('active');
  
  // Update content
  if (tierNum === 1) {
    hintContent.innerHTML = `<strong>Conceptual Tip:</strong><br>${currentQuiz.hint1}`;
  } else if (tierNum === 2) {
    hintContent.innerHTML = `<strong>Formula Prompt:</strong><br>${currentQuiz.hint2}`;
  } else if (tierNum === 3) {
    hintContent.innerHTML = `<strong>Step-by-step Solution:</strong><br>${currentQuiz.hint3}`;
  }
}

// --- FEATURE 5: PEER ACTIVITY DISPATCHERS ---
function sendPeerAction(name, action) {
  if (action === 'Cheer') {
    showToast(`You cheered for ${name}! 👏 +10 XP earned for collaboration!`, 'success');
    addXp(10);
  } else if (action === 'Nudge') {
    showToast(`You sent a study nudge to ${name}! 🔔 +10 XP earned!`, 'success');
    addXp(10);
  }
}

// --- FEATURE 6: CLICK-TO-EXPLAIN OMR EXPLORATIONS ---
const omrExplainerData = {
  1: {
    topic: "Linear Simplification",
    desc: "You factorized correctly! Question 1 checked basic algebraic distributions. Expanding 3(x-2) yields 3x - 6 which perfectly matches the initial value.",
    mistake: "Your Answer: B (Correct) • Scanned perfectly with solid bubble markings.",
    remedy: "Review algebra foundations. You have 100% mastery in this sub-topic!"
  },
  2: {
    topic: "Middle-Term Splitting Mistakes",
    desc: "For x² - 5x + 6 = 0, you chose Option A (x=1, x=6). While 1 * 6 = 6, they add up to +7 instead of -5. Remember that both binomial factors must be negative (x-2)(x-3) to multiply to +6 and add to -5.",
    mistake: "Your Answer: A (Incorrect) • Correct: C (marked as x=2, x=3 in answer key)",
    remedy: "Try practicing 5 quadratic factoring drills in the AI Practice tab."
  },
  3: {
    topic: "Inequality Interval Sign Errors",
    desc: "You successfully computed the boundary values! Dividing linear components and tracking inequality signs has been done flawlessly.",
    mistake: "Your Answer: A (Correct) • High contrast bubble scanned cleanly.",
    remedy: "Keep up the excellent retention of sign properties!"
  },
  4: {
    topic: "Quadratic Formula Vertex Identification",
    desc: "Superb vertex matching! Identifying axis of symmetry x = -b/(2a) was calculated correctly.",
    mistake: "Your Answer: D (Correct) • Perfect bubble alignment.",
    remedy: "Excellent structural graphing comprehension!"
  },
  5: {
    topic: "Faint Bubble Marks / Missed Mark Detection",
    desc: "The digital carbon scanner failed to register a bubble for this question because the marking was extremely faint. Make sure to fill bubbles completely dark using 2B pencils.",
    mistake: "Your Answer: Missed (Unmarked) • Correct: D",
    remedy: "Review bubble sheet marking guidelines. Settle this doubt with a remedial quiz."
  }
};

function explainOMRQuestion(qNum) {
  const data = omrExplainerData[qNum];
  if (!data) return;
  
  const drawer = document.getElementById('omrExplainerDrawer');
  if (!drawer) return;
  document.getElementById('omrExplainerTitle').innerText = `OMR Question ${qNum} Review`;
  document.getElementById('omrExplainerTopic').innerText = `Topic: ${data.topic}`;
  document.getElementById('omrExplainerDesc').innerText = data.desc;
  document.getElementById('omrExplainerMistake').innerHTML = data.mistake;
  document.getElementById('omrExplainerRemedy').innerText = data.remedy;
  
  const mistakeBox = document.getElementById('omrExplainerMistake');
  if (data.mistake.includes('Correct')) {
    mistakeBox.style.background = 'rgba(16, 185, 129, 0.1)';
    mistakeBox.style.borderColor = 'rgba(16, 185, 129, 0.2)';
    mistakeBox.style.color = 'var(--success-color)';
  } else {
    mistakeBox.style.background = 'rgba(239, 68, 68, 0.1)';
    mistakeBox.style.borderColor = 'rgba(239, 68, 68, 0.2)';
    mistakeBox.style.color = 'var(--error-color)';
  }
  
  drawer.classList.add('active');
}

function closeOMRExplainer() {
  const drawer = document.getElementById('omrExplainerDrawer');
  if (drawer) drawer.classList.remove('active');
}

// --- FEATURE 7: CUSTOM GOALS & MILESTONES COMPILER ---
function compileCustomGoal() {
  const input = document.getElementById('customGoalInput');
  if (!input) return;
  const goalText = input.value.trim();
  if (!goalText) {
    showToast('Please type a goal to add!', 'warning');
    return;
  }
  
  const list = document.querySelector('.milestones-list');
  if (!list) return;
  
  const newItem = document.createElement('div');
  newItem.className = 'milestone-item';
  const xpReward = 40;
  newItem.innerHTML = `
    <div class="milestone-checkbox"></div>
    <span class="milestone-text">${goalText}</span>
    <span class="milestone-reward">+${xpReward} XP</span>
  `;
  
  newItem.addEventListener('click', () => {
    toggleMilestone(newItem, xpReward);
  });
  
  list.appendChild(newItem);
  input.value = '';
  showToast('Custom goal added and synced with Parent supervision!', 'success');
  
  // Sync to localStorage immediately
  syncMilestonesToLocalStorage();
}

function syncMilestonesToLocalStorage() {
  const listItems = document.querySelectorAll('.milestones-list .milestone-item');
  const milestones = [];
  listItems.forEach(item => {
    milestones.push({
      text: item.querySelector('.milestone-text').innerText,
      completed: item.classList.contains('completed'),
      reward: item.querySelector('.milestone-reward').innerText
    });
  });
  localStorage.setItem('weekly_milestones_state', JSON.stringify(milestones));
}

function loadSyncedMilestones() {
  const raw = localStorage.getItem('weekly_milestones_state');
  if (!raw) {
    syncMilestonesToLocalStorage();
    return;
  }
  
  try {
    const milestones = JSON.parse(raw);
    const list = document.querySelector('.milestones-list');
    if (!list) return;
    list.innerHTML = '';
    
    milestones.forEach(m => {
      const item = document.createElement('div');
      item.className = `milestone-item ${m.completed ? 'completed' : ''}`;
      
      const xpVal = parseInt(m.reward.replace(/[^0-9]/g, '')) || 30;
      item.innerHTML = `
        <div class="milestone-checkbox"></div>
        <span class="milestone-text">${m.text}</span>
        <span class="milestone-reward">${m.reward}</span>
      `;
      
      item.addEventListener('click', () => {
        toggleMilestone(item, xpVal);
      });
      
      list.appendChild(item);
    });
  } catch (e) {
    console.error("Error loading synced milestones:", e);
  }
}

// --- FEATURE 8: WEEKLY STUDY tracker CHART TOOLTIP HANDLERS ---
function showStudyTooltip(text) {
  const tooltip = document.getElementById('studyChartTooltip');
  if (tooltip) {
    tooltip.innerText = text;
    tooltip.style.display = 'block';
  }
}

function hideStudyTooltip() {
  const tooltip = document.getElementById('studyChartTooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}
