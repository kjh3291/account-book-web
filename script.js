import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUF3d2ZXHmGnmeuXZL4hndsQMzTBUDXr4",
  authDomain: "account-book-920be.firebaseapp.com",
  projectId: "account-book-920be",
  storageBucket: "account-book-920be.firebasestorage.app",
  messagingSenderId: "865604308516",
  appId: "1:865604308516:web:bfaafdcf52c1c26d4ed2b1",
  measurementId: "G-FW6EMPM8HZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

// 안드로이드 앱(Capacitor 네이티브)인지 여부. 로컬 알림은 폰(안드로이드 앱)에서만 동작합니다.
const isNativeApp = Boolean(
  window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()
);

const appPage = document.getElementById("appPage");
const monthlyBudgetPage = document.getElementById("monthlyBudgetPage");
const homeScreen = document.getElementById("homeScreen");
const webDashboard = document.getElementById("webDashboard");
const summaryGrid = document.getElementById("summaryGrid");
const calendarPanel = document.getElementById("calendarPanel");
const dailyListPanel = document.getElementById("dailyListPanel");

const authStatus = document.getElementById("authStatus");
const loginBtn = document.getElementById("loginBtn");
const syncBtn = document.getElementById("syncBtn");

const appSettingsModal = document.getElementById("appSettingsModal");
const closeAppSettingsBtn = document.getElementById("closeAppSettingsBtn");
const settingsLogoutBtn = document.getElementById("settingsLogoutBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const exportDataBtn = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const importFileInput = document.getElementById("importFileInput");
const notificationSettingRow = document.getElementById("notificationSettingRow");
const notificationToggle = document.getElementById("notificationToggle");

const calendarEl = document.getElementById("calendar");
const currentMonthTitle = document.getElementById("currentMonthTitle");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const selectedDateTitle = document.getElementById("selectedDateTitle");
const addModal = document.getElementById("addModal");
const bottomNav = document.getElementById("bottomNav");
const bottomNavHomeBtn = document.getElementById("bottomNavHomeBtn");
const bottomNavBudgetBtn = document.getElementById("bottomNavBudgetBtn");
const bottomNavAddBtn = document.getElementById("bottomNavAddBtn");
const bottomNavStatsBtn = document.getElementById("bottomNavStatsBtn");
const bottomNavSettingsBtn = document.getElementById("bottomNavSettingsBtn");
const closeAddModalBtn = document.getElementById("closeAddModalBtn");
const addModalTitle = document.getElementById("addModalTitle");

const form = document.getElementById("transactionForm");
const typeInput = document.getElementById("type");
const categoryButtons = document.getElementById("categoryButtons");
const categoryEmptyHint = document.getElementById("categoryEmptyHint");
const openCategoryManagerBtn = document.getElementById("openCategoryManagerBtn");
const amountInput = document.getElementById("amount");
const memoInput = document.getElementById("memo");
const saveTransactionBtn = document.getElementById("saveTransactionBtn");

const actualIncomeEl = document.getElementById("actualIncome");
const actualExpenseEl = document.getElementById("actualExpense");
const availableMoneyMainEl = document.getElementById("availableMoneyMain");
const actualBalanceSubEl = document.getElementById("actualBalanceSub");
const expectedIncomeEl = document.getElementById("expectedIncome");
const expectedExpenseEl = document.getElementById("expectedExpense");
const allocatedMoneyEl = document.getElementById("allocatedMoney");

const dailyList = document.getElementById("dailyList");
const emptyMessage = document.getElementById("emptyMessage");
const resetBtn = document.getElementById("resetBtn");

const openSettingsBtn = document.getElementById("openSettingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const settingsModal = document.getElementById("settingsModal");

const recurringForm = document.getElementById("recurringForm");
const recurringTypeInput = document.getElementById("recurringType");
const recurringDayInput = document.getElementById("recurringDay");
const recurringCategoryButtons = document.getElementById("recurringCategoryButtons");
const recurringCategoryEmptyHint = document.getElementById("recurringCategoryEmptyHint");
const openRecurringCategoryManagerBtn = document.getElementById("openRecurringCategoryManagerBtn");
const recurringAmountInput = document.getElementById("recurringAmount");
const recurringMemoInput = document.getElementById("recurringMemo");
const recurringList = document.getElementById("recurringList");
const recurringEmptyMessage = document.getElementById("recurringEmptyMessage");

const categoryManagerModal = document.getElementById("categoryManagerModal");
const closeCategoryManagerBtn = document.getElementById("closeCategoryManagerBtn");
const categoryManagerTitle = document.getElementById("categoryManagerTitle");
const categoryManagerList = document.getElementById("categoryManagerList");
const categoryManagerEmpty = document.getElementById("categoryManagerEmpty");
const addCategoryToggleBtn = document.getElementById("addCategoryToggleBtn");
const categoryCreateForm = document.getElementById("categoryCreateForm");
const newCategoryNameInput = document.getElementById("newCategoryName");

const goBudgetBtn = document.getElementById("goBudgetBtn");

const backHomeFromMonthlyBudgetBtn = document.getElementById("backHomeFromMonthlyBudgetBtn");
const monthlyBudgetForm = document.getElementById("monthlyBudgetForm");
const monthlyBudgetCategoryInput = document.getElementById("monthlyBudgetCategory");
const monthlyBudgetAmountInput = document.getElementById("monthlyBudgetAmount");
const saveMonthlyBudgetBtn = document.getElementById("saveMonthlyBudgetBtn");
const monthlyBudgetTotalEl = document.getElementById("monthlyBudgetTotal");
const monthlyBudgetUsedEl = document.getElementById("monthlyBudgetUsed");
const monthlyBudgetRemainingEl = document.getElementById("monthlyBudgetRemaining");
const monthlyBudgetList = document.getElementById("monthlyBudgetList");
const monthlyBudgetEmptyMessage = document.getElementById("monthlyBudgetEmptyMessage");

const statsModal = document.getElementById("statsModal");
const closeStatsBtn = document.getElementById("closeStatsBtn");
const statsStartDateInput = document.getElementById("statsStartDate");
const statsEndDateInput = document.getElementById("statsEndDate");
const applyStatsBtn = document.getElementById("applyStatsBtn");

const categoryPickerModal = document.getElementById("categoryPickerModal");
const closeCategoryPickerBtn = document.getElementById("closeCategoryPickerBtn");
const categoryPickerTitle = document.getElementById("categoryPickerTitle");
const categoryPickerList = document.getElementById("categoryPickerList");
const statsIncomeTotalEl = document.getElementById("statsIncomeTotal");
const statsExpenseTotalEl = document.getElementById("statsExpenseTotal");
const statsNetTotalEl = document.getElementById("statsNetTotal");
const statsList = document.getElementById("statsList");
const statsEmptyMessage = document.getElementById("statsEmptyMessage");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let recurringItems = JSON.parse(localStorage.getItem("recurringItems")) || [];
let monthlyBudgets = JSON.parse(localStorage.getItem("monthlyBudgets")) || [];

let categories = JSON.parse(localStorage.getItem("categories")) || {
  income: [],
  expense: []
};

let lastUsedType = "expense";
let lastUsedCategory = { income: "", expense: "" };

let selectedCategory = "";
let selectedRecurringCategory = "";
let categoryExpanded = false;
let recurringCategoryExpanded = false;
let categoryManagerMode = "transaction";
let editingTransactionId = null;
let editingMonthlyBudgetId = null;
let categoryPickerMode = "transaction";
let currentUser = null;
let isCloudLoading = false;

const today = new Date();
today.setHours(0, 0, 0, 0);

let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let selectedDate = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

function toDateKey(year, month, day) {
  return `${String(year)}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateKeyToDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isDateInRange(dateKey, startDateKey, endDateKey) {
  const date = dateKeyToDate(dateKey);
  return date >= dateKeyToDate(startDateKey) && date <= dateKeyToDate(endDateKey);
}

function isPastOrToday(dateKey) {
  return dateKeyToDate(dateKey) <= today;
}

function formatMoney(amount) {
  return Number(amount).toLocaleString("ko-KR") + "원";
}

function getAccountBookData() {
  return {
    transactions,
    recurringItems,
    monthlyBudgets,
    categories
  };
}

function applyAccountBookData(data) {
  transactions = data.transactions || [];
  recurringItems = data.recurringItems || [];
  monthlyBudgets = data.monthlyBudgets || [];
  categories = data.categories || { income: [], expense: [] };

  if (!categories.income) categories.income = [];
  if (!categories.expense) categories.expense = [];
}

function exportAccountBookData() {
  const data = {
    exportedAt: new Date().toISOString(),
    app: "calendar-account-book",
    version: 1,
    ...getAccountBookData()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const today = new Date();
  const dateStr = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const link = document.createElement("a");
  link.href = url;
  link.download = `가계부-백업-${dateStr}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function isValidBackupData(data) {
  if (!data || typeof data !== "object") return false;
  if (data.transactions && !Array.isArray(data.transactions)) return false;
  if (data.recurringItems && !Array.isArray(data.recurringItems)) return false;
  if (data.budgets && !Array.isArray(data.budgets)) return false;
  if (data.monthlyBudgets && !Array.isArray(data.monthlyBudgets)) return false;
  if (data.categories && typeof data.categories !== "object") return false;
  return true;
}

function importAccountBookDataFromFile(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = event => {
    try {
      const data = JSON.parse(event.target.result);

      if (!isValidBackupData(data)) {
        alert("올바른 백업 파일이 아닙니다.");
        return;
      }

      if (!confirm("백업 파일을 불러오면 현재 데이터를 덮어씁니다. 계속할까요?")) return;

      applyAccountBookData(data);
      saveAll();
      ensureSelectedCategory();
      ensureSelectedRecurringCategory();
      render();
      alert("백업 데이터를 불러왔습니다.");
    } catch (error) {
      console.error(error);
      alert("백업 파일을 읽는 중 문제가 발생했습니다. 파일 형식을 확인해주세요.");
    } finally {
      importFileInput.value = "";
    }
  };

  reader.readAsText(file);
}

function saveLocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("recurringItems", JSON.stringify(recurringItems));
  localStorage.setItem("monthlyBudgets", JSON.stringify(monthlyBudgets));
  localStorage.setItem("categories", JSON.stringify(categories));
}

async function saveToFirebase() {
  if (!currentUser || isCloudLoading) return;

  try {
    await setDoc(doc(db, "users", currentUser.uid), {
      ...getAccountBookData(),
      updatedAt: serverTimestamp()
    });
    authStatus.textContent = "로그인됨";
  } catch (error) {
    console.error(error);
    authStatus.textContent = "동기화 실패";
    alert("Firebase 저장에 실패했습니다. Firestore 규칙과 인터넷 연결을 확인해주세요.");
  }
}

function saveAll() {
  saveLocal();
  saveToFirebase();
  refreshLocalNotifications();
  updateBudgetStatusNotification();
}

async function loadFromFirebase(user) {
  isCloudLoading = true;
  authStatus.textContent = "로그인 중";

  try {
    const ref = doc(db, "users", user.uid);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      applyAccountBookData(snapshot.data());
      saveLocal();
      authStatus.textContent = "로그인됨";
    } else {
      await setDoc(ref, {
        ...getAccountBookData(),
        updatedAt: serverTimestamp()
      });
      authStatus.textContent = "로그인됨";
    }
  } catch (error) {
    console.error(error);
    authStatus.textContent = "불러오기 실패";
    alert("Firebase 데이터를 불러오지 못했습니다. Firestore 설정을 확인해주세요.");
  } finally {
    isCloudLoading = false;
    ensureSelectedCategory();
    ensureSelectedRecurringCategory();
    render();
  }
}

function getLastDateOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getRecurringDateKey(item, year, month) {
  const lastDate = getLastDateOfMonth(year, month);
  const appliedDay = Math.min(Number(item.day), lastDate);
  return toDateKey(year, month, appliedDay);
}

// ---------------------------------------------------------------------------
// 로컬 알림 (안드로이드 앱 전용)
// 토스 등 외부 은행/카드 API 없이, 이미 등록된 "반복 수입/고정 지출" 데이터만으로
// 결제/입금 며칠 전 알림과 이번 달 사용 가능 금액 알림을 예약합니다.
// ---------------------------------------------------------------------------

const DAILY_BALANCE_NOTIFICATION_ID = 900000001;
const NOTIFICATION_HOUR = 9; // 매일 오전 9시에 알림

function getLocalNotificationsPlugin() {
  return window.Capacitor?.Plugins?.LocalNotifications || null;
}

function notificationsEnabledByUser() {
  return localStorage.getItem("notificationsEnabled") !== "false";
}

// 문자열을 32비트 정수 해시로 변환 (Local Notifications의 id는 숫자여야 함)
function hashToInt(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash % 900000000; // 900000001(일일 잔액 알림 id)과 겹치지 않게 범위 제한
}

async function ensureNotificationPermission() {
  const plugin = getLocalNotificationsPlugin();
  if (!plugin) return false;

  try {
    const current = await plugin.checkPermissions();
    if (current.display === "granted") return true;

    const requested = await plugin.requestPermissions();
    return requested.display === "granted";
  } catch (error) {
    console.error("알림 권한 확인/요청 실패:", error);
    return false;
  }
}

// 앞으로 monthsAhead개월 동안의 반복 항목 발생일을 모두 계산
function getUpcomingRecurringOccurrences(monthsAhead) {
  const occurrences = [];
  const base = new Date(today.getFullYear(), today.getMonth(), 1);

  for (let m = 0; m < monthsAhead; m++) {
    const year = base.getFullYear();
    const month = base.getMonth() + m;
    const targetDate = new Date(year, month, 1);

    recurringItems.forEach(item => {
      const dateKey = getRecurringDateKey(item, targetDate.getFullYear(), targetDate.getMonth());
      occurrences.push({ item, dateKey });
    });
  }

  return occurrences;
}

async function scheduleRecurringNotifications(plugin) {
  const occurrences = getUpcomingRecurringOccurrences(3);
  const notifications = [];
  const now = new Date();

  occurrences.forEach(({ item, dateKey }) => {
    const occurrenceDate = dateKeyToDate(dateKey);

    [3, 2, 1].forEach(daysBefore => {
      const fireDate = new Date(occurrenceDate);
      fireDate.setDate(fireDate.getDate() - daysBefore);
      fireDate.setHours(NOTIFICATION_HOUR, 0, 0, 0);

      if (fireDate <= now) return; // 이미 지난 알림은 예약하지 않음

      const isIncome = item.type === "income";
      const title = isIncome
        ? `${daysBefore}일 후 용돈(수입) 입금 예정`
        : `${daysBefore}일 후 자동결제 예정`;
      const body = `${item.memo} · ${formatMoney(item.amount)} (${dateKey})`;

      notifications.push({
        id: hashToInt(`recurring-${item.id}-${dateKey}-${daysBefore}`),
        title,
        body,
        schedule: { at: fireDate }
      });
    });
  });

  // 기존에 예약해둔 반복 알림(일일 잔액 알림 제외)은 취소하고 최신 데이터로 다시 예약
  const pending = await plugin.getPending();
  const idsToCancel = pending.notifications
    .filter(n => n.id !== DAILY_BALANCE_NOTIFICATION_ID)
    .map(n => ({ id: n.id }));

  if (idsToCancel.length > 0) {
    await plugin.cancel({ notifications: idsToCancel });
  }

  if (notifications.length > 0) {
    await plugin.schedule({ notifications });
  }
}

async function scheduleDailyBalanceNotification(plugin) {
  const summary = getMonthSummary(today.getFullYear(), today.getMonth());
  const monthlyBudgetTotal = getMonthlyBudgetTotal();
  const available = summary.actualBalance - monthlyBudgetTotal;

  const now = new Date();
  const fireDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), NOTIFICATION_HOUR, 0, 0, 0);
  if (fireDate <= now) fireDate.setDate(fireDate.getDate() + 1);

  await plugin.cancel({ notifications: [{ id: DAILY_BALANCE_NOTIFICATION_ID }] });
  await plugin.schedule({
    notifications: [
      {
        id: DAILY_BALANCE_NOTIFICATION_ID,
        title: "이번 달 사용 가능 금액",
        body: `${formatMoney(available)} 사용 가능 (최근 접속 시점 기준)`,
        schedule: { at: fireDate }
      }
    ]
  });
}

async function cancelAllLocalNotifications() {
  const plugin = getLocalNotificationsPlugin();
  if (!plugin) return;

  try {
    const pending = await plugin.getPending();
    if (pending.notifications.length > 0) {
      await plugin.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
    }
  } catch (error) {
    console.error("알림 취소 실패:", error);
  }
}

// 반복 항목/거래 데이터가 바뀔 때마다 호출됩니다. 안드로이드 앱이 아니거나
// 사용자가 알림을 꺼둔 경우에는 아무 것도 하지 않습니다.
async function refreshLocalNotifications() {
  if (!isNativeApp) return;
  if (!notificationsEnabledByUser()) return;

  const plugin = getLocalNotificationsPlugin();
  if (!plugin) return;

  const granted = await ensureNotificationPermission();
  if (!granted) return;

  try {
    await scheduleRecurringNotifications(plugin);
    await scheduleDailyBalanceNotification(plugin);
  } catch (error) {
    console.error("알림 예약 실패:", error);
  }
}

// ---------------------------------------------------------------------------
// 금융 알림 파싱 + 알림창 상주 예산 (안드로이드 앱 전용)
// ---------------------------------------------------------------------------

function getNotificationBridgePlugin() {
  return window.Capacitor?.Plugins?.NotificationBridge || null;
}

function getBudgetStatusPlugin() {
  return window.Capacitor?.Plugins?.BudgetStatus || null;
}

function financeListenerEnabledByUser() {
  return localStorage.getItem("financeListenerEnabled") === "true";
}

function budgetStatusEnabledByUser() {
  return localStorage.getItem("budgetStatusEnabled") !== "false";
}

// 이번 달 앞으로 나갈 반복 지출 합계
function getFutureRecurringExpenseTotal() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  return recurringItems
    .filter(item => item.type === "expense")
    .reduce((sum, item) => {
      const dateKey = getRecurringDateKey(item, now.getFullYear(), now.getMonth());
      return dateKey >= todayKey ? sum + Number(item.amount) : sum;
    }, 0);
}

// ---------------------------------------------------------------------------
// 잔액 관리 (토스 알림 자동 파싱 or 수동 입력)
// ---------------------------------------------------------------------------

function getLastKnownBalance() {
  return Number(localStorage.getItem("lastKnownBalance") || 0);
}

function setLastKnownBalance(amount) {
  localStorage.setItem("lastKnownBalance", String(amount));
  localStorage.setItem("lastKnownBalanceAt", String(Date.now()));
}

function getBaseBalance() {
  return Number(localStorage.getItem("baseBalance") || 0);
}

function getEffectiveBalance() {
  const last = getLastKnownBalance();
  return last > 0 ? last : getBaseBalance();
}

function getAvailableBudget() {
  const balance = getEffectiveBalance();
  if (balance > 0) {
    return balance - getFutureRecurringExpenseTotal();
  }
  return getMonthSummary(today.getFullYear(), today.getMonth()).actualBalance
    - getFutureRecurringExpenseTotal();
}

// ---------------------------------------------------------------------------
// 알림 이력 저장 + 고정지출 패턴 감지
// ---------------------------------------------------------------------------

const NOTIFICATION_HISTORY_MAX = 200;

function saveNotificationToHistory({ pkg, amount, memo, isIncome }) {
  const history = JSON.parse(localStorage.getItem("notificationHistory") || "[]");
  history.unshift({
    pkg, amount, memo, isIncome,
    date: toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  });
  if (history.length > NOTIFICATION_HISTORY_MAX) history.pop();
  localStorage.setItem("notificationHistory", JSON.stringify(history));
}

function detectRecurringPattern({ pkg, amount, memo, isIncome }) {
  if (memo.includes("자동이체") || memo.includes("자동납부")) return true;

  const history = JSON.parse(localStorage.getItem("notificationHistory") || "[]");
  const sameItems = history.filter(h =>
    h.pkg === pkg && h.amount === amount && h.isIncome === isIncome
  );
  if (sameItems.length < 1) return false;

  const latest = new Date(sameItems[0].date);
  const now = new Date();
  const daysDiff = Math.abs((now - latest) / (1000 * 60 * 60 * 24));
  return daysDiff >= 25 && daysDiff <= 40;
}

function maybeShowRecurringPrompt({ pkg, amount, memo, isIncome }) {
  const type = isIncome ? "income" : "expense";
  const alreadyExists = recurringItems.some(
    r => r.amount === amount && r.type === type
  );
  if (alreadyExists) return;
  if (!detectRecurringPattern({ pkg, amount, memo, isIncome })) return;
  showRecurringPromptBanner({ amount, isIncome, memo });
}

let pendingRecurringItem = null;

function showRecurringPromptBanner({ amount, isIncome, memo }) {
  pendingRecurringItem = { amount, isIncome, memo };
  const text = document.getElementById("recurringPromptText");
  const typeLabel = isIncome ? "수입" : "지출";
  text.textContent = `매달 ${formatMoney(amount)} ${typeLabel}이 반복되는 것 같아요. 반복 항목으로 등록할까요?`;
  document.getElementById("recurringPromptBanner").classList.remove("hidden");
}

// 가장 임박한 반복 항목 (7일 이내)
function getNextUpcomingItem() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const candidates = [];
  for (let mOffset = 0; mOffset <= 1; mOffset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + mOffset, 1);
    recurringItems.forEach(item => {
      const dateKey = getRecurringDateKey(item, d.getFullYear(), d.getMonth());
      if (dateKey >= todayKey) {
        const itemDate = dateKeyToDate(dateKey);
        const daysUntil = Math.round((itemDate - now) / (1000 * 60 * 60 * 24));
        if (daysUntil <= 7) candidates.push({ ...item, dateKey, daysUntil });
      }
    });
  }
  candidates.sort((a, b) => a.daysUntil - b.daysUntil);
  return candidates[0] || null;
}

async function updateBudgetStatusNotification() {
  if (!isNativeApp) return;
  if (!budgetStatusEnabledByUser()) return;

  const plugin = getBudgetStatusPlugin();
  if (!plugin) return;

  const summary = getMonthSummary(today.getFullYear(), today.getMonth());
  const futureExpense = getFutureRecurringExpenseTotal();
  const available = summary.actualBalance - futureExpense;

  const title = `써도 되는 돈: ${formatMoney(available)}`;
  const next = getNextUpcomingItem();
  const body = next
    ? `D-${next.daysUntil} ${next.memo} ${formatMoney(next.amount)}`
    : "예정된 반복 지출 없음";

  try {
    await plugin.show({ title, body });
  } catch (e) {
    console.error("상주 알림 업데이트 실패:", e);
  }
}

// 이번 결제가 남은 여유돈의 20% 이상을 갉아먹거나 여유돈을 마이너스로 만들 때만
// urgent(진동/우선순위 높음) 처리 — 매번 울리면 그냥 시끄러운 앱이 되므로.
function computeImpactNotificationContent({ amount, beforeAvailable, afterAvailable }) {
  const urgent = afterAvailable < 0 ||
    (beforeAvailable > 0 && (beforeAvailable - afterAvailable) / beforeAvailable >= 0.2);

  const title = `${formatMoney(amount)} 결제`;
  const body = afterAvailable >= 0
    ? `남은 여유돈 ${formatMoney(afterAvailable)}`
    : `여유돈 소진! ${formatMoney(Math.abs(afterAvailable))} 초과`;

  return { title, body, urgent };
}

// 결제 감지 즉시 "이 결제 후 남은 여유돈"을 보여주는 1회성 알림.
async function showImpactNotification({ amount, beforeAvailable, afterAvailable }) {
  if (!isNativeApp) return;
  if (!budgetStatusEnabledByUser()) return;

  const plugin = getBudgetStatusPlugin();
  if (!plugin) return;

  const { title, body, urgent } = computeImpactNotificationContent({ amount, beforeAvailable, afterAvailable });

  try {
    await plugin.showImpact({ title, body, urgent });
  } catch (e) {
    console.error("결제 임팩트 알림 실패:", e);
  }
}

// 배너 자동 해제 타이머
let autoRegisterDismissTimer = null;

function showAutoRegisterBanner({ packageName, amount, isIncome, rawText }) {
  const banner = document.getElementById("autoRegisterBanner");
  const textEl = document.getElementById("autoRegisterText");
  const categoriesEl = document.getElementById("autoRegisterCategories");

  const typeLabel = isIncome ? "입금" : "결제";
  const appLabel = packageName.includes("toss") ? "토스" :
                   packageName.includes("kakao") ? "카카오뱅크" : "금융앱";

  textEl.textContent = `[${appLabel}] ${formatMoney(amount)} ${typeLabel} 감지`;

  categoriesEl.innerHTML = "";
  const cats = isIncome ? (categories.income || []) : (categories.expense || []);
  const displayCats = cats.slice(0, 4);
  if (!displayCats.includes("기타")) displayCats.push("기타");

  displayCats.forEach(cat => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      registerAutoTransaction({ amount, isIncome, category: cat, rawText });
      dismissAutoRegisterBanner();
    });
    categoriesEl.appendChild(btn);
  });

  banner.classList.remove("hidden");
  requestAnimationFrame(() => banner.classList.add("visible"));

  clearTimeout(autoRegisterDismissTimer);
  autoRegisterDismissTimer = setTimeout(dismissAutoRegisterBanner, 10000);
}

function dismissAutoRegisterBanner() {
  const banner = document.getElementById("autoRegisterBanner");
  banner.classList.remove("visible");
  clearTimeout(autoRegisterDismissTimer);
  setTimeout(() => banner.classList.add("hidden"), 300);
}

function registerAutoTransaction({ amount, isIncome, category, rawText }) {
  const now = new Date();
  const dateKey = toDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  const newItem = {
    id: Date.now().toString(),
    date: dateKey,
    type: isIncome ? "income" : "expense",
    amount: Number(amount),
    category,
    memo: rawText.length > 30 ? rawText.slice(0, 30) : rawText
  };
  transactions.push(newItem);
  saveAll();
  selectedDate = dateKey;
  render();
}

async function setupFinanceNotificationListener() {
  if (!isNativeApp) return;
  if (!financeListenerEnabledByUser()) return;

  const plugin = getNotificationBridgePlugin();
  if (!plugin) return;

  const { granted } = await plugin.checkPermission();
  if (!granted) return;

  plugin.addListener("financeNotification", data => {
    const beforeAvailable = getAvailableBudget();
    if (data.balance > 0) {
      setLastKnownBalance(data.balance);
      renderHomeScreen();
    }
    if (!data.isIncome) {
      const afterAvailable = data.balance > 0
        ? getAvailableBudget()
        : beforeAvailable - data.amount;
      showImpactNotification({ amount: data.amount, beforeAvailable, afterAvailable });
    }
    showAutoRegisterBanner(data);
    const memo = data.rawText || "";
    saveNotificationToHistory({ pkg: data.packageName, amount: data.amount, memo, isIncome: data.isIncome });
    maybeShowRecurringPrompt({ pkg: data.packageName, amount: data.amount, memo, isIncome: data.isIncome });
  });
}

async function requestFinanceListenerPermission() {
  const plugin = getNotificationBridgePlugin();
  if (!plugin) return false;
  await plugin.openPermissionSettings();
  return false;
}

function getRecurringItemsForDate(dateKey) {
  const [year, month] = dateKey.split("-").map(Number);
  return recurringItems.filter(item => getRecurringDateKey(item, year, month - 1) === dateKey);
}

function getAllItemsForDate(dateKey) {
  const normalItems = transactions.filter(item => item.date === dateKey);
  const monthlyItems = getRecurringItemsForDate(dateKey).map(item => ({
    ...item,
    id: `recurring-${item.id}-${dateKey}`,
    date: dateKey,
    isRecurring: true,
    isExpected: !isPastOrToday(dateKey)
  }));
  return [...normalItems, ...monthlyItems];
}

function getAllItemsForMonth(year, month) {
  const lastDate = getLastDateOfMonth(year, month);
  let result = [];
  for (let day = 1; day <= lastDate; day++) {
    result = result.concat(getAllItemsForDate(toDateKey(year, month, day)));
  }
  return result;
}

function getAllItemsForRange(startDateKey, endDateKey) {
  const result = [];

  transactions.forEach(item => {
    if (isDateInRange(item.date, startDateKey, endDateKey)) result.push(item);
  });

  let cursor = new Date(dateKeyToDate(startDateKey));
  const end = dateKeyToDate(endDateKey);

  while (cursor <= end) {
    const dateKey = toDateKey(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
    result.push(...getRecurringItemsForDate(dateKey).map(item => ({
      ...item,
      id: `recurring-${item.id}-${dateKey}`,
      date: dateKey,
      isRecurring: true,
      isExpected: !isPastOrToday(dateKey)
    })));
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

function getMonthSummary(year, month) {
  const monthItems = getAllItemsForMonth(year, month);
  const actualItems = monthItems.filter(item => !item.isExpected);
  const expectedItems = monthItems.filter(item => item.isExpected);

  const actualIncome = actualItems.filter(item => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const actualExpense = actualItems.filter(item => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
  const expectedIncome = expectedItems.filter(item => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const expectedExpense = expectedItems.filter(item => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);

  return { actualIncome, actualExpense, actualBalance: actualIncome - actualExpense, expectedIncome, expectedExpense };
}

function currentCategoryType() {
  return typeInput.value;
}

function currentRecurringCategoryType() {
  return recurringTypeInput.value;
}

function ensureSelectedCategory() {
  const list = categories[currentCategoryType()];
  if (!list.includes(selectedCategory)) selectedCategory = list[0] || "";
}

function ensureSelectedRecurringCategory() {
  const list = categories[currentRecurringCategoryType()];
  if (!list.includes(selectedRecurringCategory)) selectedRecurringCategory = list[0] || "";
}

function renderCategoryButtons(container, type, selectedValue, expanded, onSelect, onToggleMore, emptyHint) {
  const list = categories[type] || [];
  container.innerHTML = "";

  if (list.length === 0) {
    emptyHint.style.display = "block";
    return;
  }

  emptyHint.style.display = "none";

  const visibleList = list.slice(0, 5);

  visibleList.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-btn";
    if (category === selectedValue) button.classList.add("active");
    button.textContent = category;
    button.addEventListener("click", () => onSelect(category));
    container.appendChild(button);
  });

  if (list.length > 5) {
    const moreButton = document.createElement("button");
    moreButton.type = "button";
    moreButton.className = "category-btn more-btn";
    moreButton.textContent = "더보기";
    moreButton.addEventListener("click", onToggleMore);
    container.appendChild(moreButton);
  }
}

function updateTransactionCategoryButtons() {
  ensureSelectedCategory();
  renderCategoryButtons(
    categoryButtons,
    currentCategoryType(),
    selectedCategory,
    categoryExpanded,
    category => {
      selectedCategory = category;
      updateTransactionCategoryButtons();
    },
    () => {
      openCategoryPicker("transaction");
    },
    categoryEmptyHint
  );
}

function updateRecurringCategoryButtons() {
  ensureSelectedRecurringCategory();
  renderCategoryButtons(
    recurringCategoryButtons,
    currentRecurringCategoryType(),
    selectedRecurringCategory,
    recurringCategoryExpanded,
    category => {
      selectedRecurringCategory = category;
      updateRecurringCategoryButtons();
    },
    () => {
      openCategoryPicker("recurring");
    },
    recurringCategoryEmptyHint
  );
}

function getSelectedTransactionCategory() {
  return selectedCategory;
}

function getSelectedRecurringCategory() {
  return selectedRecurringCategory;
}

function renderSummary() {
  const summary = getMonthSummary(viewYear, viewMonth);
  const monthlyBudgetTotal = getMonthlyBudgetTotal();
  const available = summary.actualBalance - monthlyBudgetTotal;

  actualIncomeEl.textContent = formatMoney(summary.actualIncome);
  actualExpenseEl.textContent = formatMoney(summary.actualExpense);
  availableMoneyMainEl.textContent = formatMoney(available);

  expectedIncomeEl.textContent = `예정 수입 ${formatMoney(summary.expectedIncome)}`;
  expectedExpenseEl.textContent = `예정 지출 ${formatMoney(summary.expectedExpense)}`;
  actualBalanceSubEl.textContent = `실제 잔액 ${formatMoney(summary.actualBalance)}`;
  allocatedMoneyEl.textContent = `이번 달 예산 총합 ${formatMoney(monthlyBudgetTotal)}`;
}

function renderCalendar() {
  calendarEl.innerHTML = "";
  currentMonthTitle.textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const lastDate = getLastDateOfMonth(viewYear, viewMonth);

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "day empty";
    calendarEl.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateKey = toDateKey(viewYear, viewMonth, day);
    const dayItems = getAllItemsForDate(dateKey);

    const actualIncome = dayItems.filter(item => item.type === "income" && !item.isExpected).reduce((sum, item) => sum + Number(item.amount), 0);
    const actualExpense = dayItems.filter(item => item.type === "expense" && !item.isExpected).reduce((sum, item) => sum + Number(item.amount), 0);
    const expectedIncome = dayItems.filter(item => item.type === "income" && item.isExpected).reduce((sum, item) => sum + Number(item.amount), 0);
    const expectedExpense = dayItems.filter(item => item.type === "expense" && item.isExpected).reduce((sum, item) => sum + Number(item.amount), 0);
    const hasRecurring = dayItems.some(item => item.isRecurring);

    const dayCell = document.createElement("button");
    dayCell.type = "button";
    dayCell.className = "day";

    if (dateKey === selectedDate) dayCell.classList.add("selected");
    if (dateKey === toDateKey(today.getFullYear(), today.getMonth(), today.getDate())) dayCell.classList.add("today");

    dayCell.innerHTML = `
      <span class="day-number">${day}</span>
      <div class="day-money">
        ${actualIncome > 0 ? `<div class="income-text">+${formatMoney(actualIncome)}</div>` : ""}
        ${actualExpense > 0 ? `<div class="expense-text">-${formatMoney(actualExpense)}</div>` : ""}
        ${expectedIncome > 0 ? `<div class="expected-text">예정 +${formatMoney(expectedIncome)}</div>` : ""}
        ${expectedExpense > 0 ? `<div class="expected-text">예정 -${formatMoney(expectedExpense)}</div>` : ""}
        ${hasRecurring ? `<span class="repeat-badge">자동</span>` : ""}
      </div>
    `;

    dayCell.addEventListener("click", () => {
      selectedDate = dateKey;
      render();
    });

    calendarEl.appendChild(dayCell);
  }
}

function renderDailyList() {
  selectedDateTitle.textContent = `${selectedDate} 내역`;
  const items = getAllItemsForDate(selectedDate);
  dailyList.innerHTML = "";

  if (items.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "transaction-item";

    const sign = item.type === "income" ? "+" : "-";
    const typeText = item.type === "income" ? "수입" : "지출";
    const recurringText = item.isRecurring ? " · 자동 반복" : "";
    const expectedText = item.isExpected ? " · 예정" : "";

    li.innerHTML = `
      <div class="transaction-info">
        <strong>${item.memo}</strong>
        <small>${typeText} · ${item.category}${recurringText}${expectedText}</small>
      </div>
      <div class="transaction-amount ${item.type}">
        ${item.isExpected ? "예정 " : ""}${sign}${formatMoney(Number(item.amount))}
        <br />
        ${item.isRecurring ? "" : `
          <div class="item-actions">
            <button class="edit-btn" onclick="editTransaction('${item.id}')">수정</button>
            <button class="delete-btn" onclick="deleteTransaction('${item.id}')">삭제</button>
          </div>
        `}
      </div>
    `;

    dailyList.appendChild(li);
  });
}

function renderRecurringList() {
  recurringList.innerHTML = "";

  if (recurringItems.length === 0) {
    recurringEmptyMessage.style.display = "block";
    return;
  }

  recurringEmptyMessage.style.display = "none";

  recurringItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "recurring-item";

    const typeText = item.type === "income" ? "반복 수입" : "고정 지출";
    const sign = item.type === "income" ? "+" : "-";

    li.innerHTML = `
      <div class="recurring-info">
        <strong>${item.memo}</strong>
        <small>매월 ${item.day}일 · ${typeText} · ${item.category}</small>
      </div>
      <div class="transaction-amount ${item.type}">
        ${sign}${formatMoney(Number(item.amount))}
        <br />
        <button class="delete-btn" onclick="deleteRecurringItem('${item.id}')">삭제</button>
      </div>
    `;

    recurringList.appendChild(li);
  });
}


function getMonthActualExpenseByCategory(year, month) {
  const monthItems = getAllItemsForMonth(year, month).filter(item => !item.isExpected && item.type === "expense");
  const map = {};

  monthItems.forEach(item => {
    if (!map[item.category]) map[item.category] = 0;
    map[item.category] += Number(item.amount);
  });

  return map;
}

function getMonthlyBudgetTotal() {
  return monthlyBudgets.reduce((sum, item) => sum + Number(item.amount), 0);
}

function getMonthActualExpenseTotal(year, month) {
  return getAllItemsForMonth(year, month)
    .filter(item => !item.isExpected && item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);
}

function getMonthlyBudgetUsedTotal(year, month) {
  const expenseMap = getMonthActualExpenseByCategory(year, month);

  return monthlyBudgets.reduce((sum, budget) => {
    return sum + Number(expenseMap[budget.category] || 0);
  }, 0);
}

function showMainApp() {
  appPage.classList.remove("hidden");
  monthlyBudgetPage.classList.add("hidden");
  updateBottomNavActive();
}

function showMonthlyBudgetPage() {
  appPage.classList.add("hidden");
  monthlyBudgetPage.classList.remove("hidden");
  renderMonthlyBudgetPage();
  updateBottomNavActive();
}

// ---------------------------------------------------------------------------
// 웹 전용 월간 대시보드
// ---------------------------------------------------------------------------

function renderWebDashboard() {
  const summary = getMonthSummary(viewYear, viewMonth);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  document.getElementById("webMonthTitle").textContent =
    `${viewYear}년 ${viewMonth + 1}월`;

  // ── 스냅샷 ──
  const remainingExpense = getRemainingRecurringExpense();
  const remainingIncome  = getRemainingRecurringIncome();
  const forecastBalance  = summary.actualIncome + remainingIncome
                         - summary.actualExpense - remainingExpense;

  const fbEl = document.getElementById("webForecastBalance");
  fbEl.textContent = formatMoney(forecastBalance);
  fbEl.className = forecastBalance >= 0 ? "web-snap-val green" : "web-snap-val red";
  document.getElementById("webForecastSub").textContent =
    `수입 ${formatMoney(summary.actualIncome + remainingIncome)} – 지출 ${formatMoney(summary.actualExpense + remainingExpense)}`;

  const aeEl = document.getElementById("webActualExpense");
  aeEl.textContent = formatMoney(summary.actualExpense);
  aeEl.className = "web-snap-val red";
  const budgetTotal = getMonthlyBudgetTotal();
  document.getElementById("webActualExpenseSub").textContent =
    budgetTotal > 0
      ? `예산 대비 ${Math.round((summary.actualExpense / budgetTotal) * 100)}%`
      : `예정 ${formatMoney(summary.expectedExpense)}`;

  const aiEl = document.getElementById("webActualIncome");
  aiEl.textContent = formatMoney(summary.actualIncome);
  aiEl.className = "web-snap-val green";
  document.getElementById("webActualIncomeSub").textContent =
    remainingIncome > 0 ? `예정 +${formatMoney(remainingIncome)} 남음` : "이달 확정";

  const reEl = document.getElementById("webRemainingExpense");
  reEl.textContent = formatMoney(remainingExpense);
  reEl.className = "web-snap-val";
  const remCount = getRemainingRecurringItems().filter(i => i.type === "expense").length;
  document.getElementById("webRemainingExpenseSub").textContent =
    `고정 ${remCount}건 남음`;

  renderCashflowTimeline();
  renderCategoryBudgetBars();
  renderWebMiniCalendar();
}

function getRemainingRecurringItems() {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  const result = [];
  for (let mOffset = 0; mOffset <= 1; mOffset++) {
    const d = new Date(viewYear, viewMonth + mOffset, 1);
    recurringItems.forEach(item => {
      const dateKey = getRecurringDateKey(item, d.getFullYear(), d.getMonth());
      if (dateKey.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`) && dateKey >= todayKey) {
        result.push({ ...item, dateKey });
      }
    });
  }
  return result;
}

function getRemainingRecurringExpense() {
  return getRemainingRecurringItems()
    .filter(i => i.type === "expense")
    .reduce((s, i) => s + Number(i.amount), 0);
}

function getRemainingRecurringIncome() {
  return getRemainingRecurringItems()
    .filter(i => i.type === "income")
    .reduce((s, i) => s + Number(i.amount), 0);
}

function renderCashflowTimeline() {
  const el = document.getElementById("cashflowTimeline");
  const items = getRemainingRecurringItems()
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey));

  if (items.length === 0) {
    el.innerHTML = `<p class="cf-empty">이달 남은 반복 항목 없음</p>`;
    document.getElementById("forecastBox").innerHTML = "";
    return;
  }

  const maxAmt = Math.max(...items.map(i => Number(i.amount)));
  el.innerHTML = items.map(item => {
    const day = item.dateKey.split("-")[2];
    const pct = Math.max(6, Math.round((Number(item.amount) / maxAmt) * 100));
    const color = item.type === "income" ? "#1a7a3c" : "#d85a30";
    const sign  = item.type === "income" ? "+" : "-";
    return `
      <div class="cf-row">
        <span class="cf-date">${Number(day)}일</span>
        <div class="cf-bar-wrap">
          <div class="cf-fill" style="width:${pct}%;background:${color};"></div>
        </div>
        <span class="cf-memo">${item.memo || ""}</span>
        <span class="cf-amt" style="color:${color};">${sign}${formatMoney(item.amount)}</span>
      </div>`;
  }).join("");

  const summary = getMonthSummary(viewYear, viewMonth);
  const forecast = summary.actualIncome + getRemainingRecurringIncome()
                 - summary.actualExpense - getRemainingRecurringExpense();
  const isPositive = forecast >= 0;
  document.getElementById("forecastBox").innerHTML = `
    <div class="forecast-inner">
      <div>
        <span class="fc-lbl">월말 예상 잔액</span>
        <strong class="fc-val ${isPositive ? "green" : "red"}">${formatMoney(forecast)}</strong>
      </div>
      <span class="fc-tag ${isPositive ? "" : "warn"}">${isPositive ? "흑자 예상" : "적자 주의"}</span>
    </div>`;
}

function renderCategoryBudgetBars() {
  const el = document.getElementById("categoryBudgetBars");
  const expenseMap = getMonthActualExpenseByCategory(viewYear, viewMonth);
  const badge = document.getElementById("overBudgetBadge");

  if (monthlyBudgets.length === 0) {
    el.innerHTML = `<p class="cf-empty">예산 목표를 설정하면 소진율이 표시됩니다.</p>`;
    badge.classList.add("hidden");
    return;
  }

  let overCount = 0;
  el.innerHTML = monthlyBudgets.map(b => {
    const used = expenseMap[b.category] || 0;
    const pct  = Number(b.amount) > 0 ? Math.round((used / Number(b.amount)) * 100) : 0;
    const over = pct > 100;
    if (over) overCount++;
    const color = over ? "#d85a30" : pct >= 80 ? "#f5a623" : "#1d9e75";
    return `
      <div class="cat-bar-row">
        <div class="cat-bar-top">
          <span class="cat-name">${b.category}</span>
          <span class="cat-pct ${over ? "over" : ""}">${formatMoney(used)} / ${formatMoney(b.amount)} · ${pct}%</span>
        </div>
        <div class="cat-track">
          <div class="cat-fill" style="width:${Math.min(pct, 100)}%;background:${color};"></div>
        </div>
      </div>`;
  }).join("");

  if (overCount > 0) {
    badge.textContent = `${overCount}건 초과`;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

function renderWebMiniCalendar() {
  const el = document.getElementById("webMiniCalendar");
  const lastDate = getLastDateOfMonth(viewYear, viewMonth);
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();

  const expenseDays = new Set();
  const incomeDays  = new Set();
  transactions.forEach(t => {
    if (!t.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`)) return;
    const day = Number(t.date.split("-")[2]);
    (t.type === "income" ? incomeDays : expenseDays).add(day);
  });
  recurringItems.forEach(item => {
    const dateKey = getRecurringDateKey(item, viewYear, viewMonth);
    if (!dateKey.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`)) return;
    const day = Number(dateKey.split("-")[2]);
    (item.type === "income" ? incomeDays : expenseDays).add(day);
  });

  const now = new Date();
  const todayDay = (now.getFullYear() === viewYear && now.getMonth() === viewMonth)
    ? now.getDate() : -1;

  const weekdays = ["일","월","화","수","목","금","토"].map(
    d => `<div class="mini-wd">${d}</div>`).join("");

  const blanks = Array(firstDow).fill(`<div class="mini-day"></div>`).join("");

  const days = Array.from({ length: lastDate }, (_, i) => {
    const d = i + 1;
    let cls = "mini-day";
    if (d === todayDay) cls += " today";
    const dots = [];
    if (incomeDays.has(d))  dots.push(`<span class="dot income"></span>`);
    if (expenseDays.has(d)) dots.push(`<span class="dot expense"></span>`);
    return `<div class="${cls}">${d}${dots.length ? `<div class="dot-row">${dots.join("")}</div>` : ""}</div>`;
  }).join("");

  el.innerHTML = `<div class="mini-cal-grid">${weekdays}${blanks}${days}</div>`;
}

// ---------------------------------------------------------------------------
// 홈 화면 렌더 ("써도 되는 돈" 중심)
// ---------------------------------------------------------------------------

let isCalendarMode = false;

function renderHomeScreen() {
  const effectiveBalance = getEffectiveBalance();

  const setupCard = document.getElementById("balanceSetupCard");
  setupCard.classList.toggle("hidden", effectiveBalance > 0);

  const available = getAvailableBudget();
  const heroEl = document.getElementById("heroAvailable");
  const isNeg = available < 0;
  heroEl.classList.toggle("negative", isNeg);
  heroEl.classList.toggle("positive", !isNeg && effectiveBalance > 0);
  heroEl.textContent = effectiveBalance > 0 ? formatMoney(available) : "잔액을 입력해주세요";

  const lastBalance = getLastKnownBalance();
  const lastAt = Number(localStorage.getItem("lastKnownBalanceAt") || 0);
  const sourceEl = document.getElementById("heroSource");
  if (lastBalance > 0 && lastAt) {
    const min = Math.floor((Date.now() - lastAt) / 60000);
    sourceEl.textContent = `토스 잔액 ${formatMoney(lastBalance)} · ${min < 1 ? "방금" : min + "분 전"} 업데이트`;
  } else if (getBaseBalance() > 0) {
    sourceEl.textContent = `수동 입력 잔액 ${formatMoney(getBaseBalance())} 기준`;
  } else {
    sourceEl.textContent = "잔액 입력 또는 토스 결제 알림 수신 시 자동 업데이트";
  }

  const budgetTotal = getMonthlyBudgetTotal();
  const budgetUsed = getMonthActualExpenseTotal(today.getFullYear(), today.getMonth());
  const budgetBar = document.getElementById("homeBudgetBar");
  if (budgetTotal > 0) {
    budgetBar.classList.remove("hidden");
    const pct = Math.min(100, Math.round((budgetUsed / budgetTotal) * 100));
    document.getElementById("budgetBarLabel").textContent =
      `이번 달 예산 ${formatMoney(budgetUsed)} / ${formatMoney(budgetTotal)}`;
    document.getElementById("budgetBarPercent").textContent = `${pct}%`;
    const fill = document.getElementById("budgetBarFill");
    fill.style.width = `${pct}%`;
    fill.style.background = pct >= 90 ? "var(--expense)" : pct >= 70 ? "#f5a623" : "var(--accent)";
  } else {
    budgetBar.classList.add("hidden");
  }

  renderHomeDdayList();
  renderHomeTodaySummary();
}

function renderHomeDdayList() {
  const list = document.getElementById("homeDdayList");
  const occurrences = getUpcomingRecurringOccurrences(2);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const items = occurrences
    .map(({ item, dateKey }) => {
      const d = dateKeyToDate(dateKey);
      const days = Math.round((d - now) / 86400000);
      return { item, days };
    })
    .filter(({ days }) => days >= 0 && days <= 7)
    .sort((a, b) => a.days - b.days)
    .slice(0, 5);

  list.innerHTML = items.length === 0
    ? "<li class='dday-empty'>7일 내 예정 항목 없음</li>"
    : items.map(({ item, days }) => `
        <li class="dday-item ${item.type}">
          <span class="dday-icon">${item.type === "income" ? "💰" : "💳"}</span>
          <span class="dday-memo">${item.memo || item.category || ""}</span>
          <span class="dday-badge">D-${days === 0 ? "day" : days}</span>
          <span class="dday-amount">${formatMoney(item.amount)}</span>
        </li>`).join("");
}

function renderHomeTodaySummary() {
  const el = document.getElementById("homeTodaySummary");
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const items = getAllItemsForDate(todayKey).filter(i => !i.isExpected && i.type === "expense");
  const total = items.reduce((s, i) => s + Number(i.amount), 0);

  if (items.length === 0) {
    el.innerHTML = `<p class="today-empty">오늘 지출 없음</p>`;
    return;
  }
  const preview = items.slice(0, 3).map(i =>
    `<span>${i.memo || i.category} ${formatMoney(i.amount)}</span>`).join(" · ");
  el.innerHTML = `
    <p class="today-total">오늘 ${formatMoney(total)} 사용</p>
    <p class="today-preview">${preview}${items.length > 3 ? ` 외 ${items.length - 3}건` : ""}</p>`;
}

function renderMonthlyBudgetPage() {
  const expenseMap = getMonthActualExpenseByCategory(viewYear, viewMonth);
  const budgetTotal = getMonthlyBudgetTotal();
  const usedTotal = getMonthlyBudgetUsedTotal(viewYear, viewMonth);
  const remainingTotal = budgetTotal - usedTotal;

  monthlyBudgetTotalEl.textContent = formatMoney(budgetTotal);
  monthlyBudgetUsedEl.textContent = formatMoney(usedTotal);
  monthlyBudgetRemainingEl.textContent = formatMoney(remainingTotal);

  monthlyBudgetList.innerHTML = "";

  if (monthlyBudgets.length === 0) {
    monthlyBudgetEmptyMessage.style.display = "block";
    return;
  }

  monthlyBudgetEmptyMessage.style.display = "none";

  monthlyBudgets.forEach(item => {
    const used = expenseMap[item.category] || 0;
    const remaining = Number(item.amount) - used;
    const percent = Number(item.amount) > 0 ? Math.min((used / Number(item.amount)) * 100, 100) : 0;
    const isOver = used > Number(item.amount);

    const li = document.createElement("li");
    li.className = "transaction-item";

    li.innerHTML = `
      <div class="transaction-info">
        <strong>${item.category}</strong>
        <small>예산 ${formatMoney(item.amount)} · 사용 ${formatMoney(used)} · 남은 금액 ${formatMoney(remaining)}</small>
        <div class="budget-progress">
          <div class="budget-progress-bar ${isOver ? "over" : ""}" style="width:${percent}%"></div>
        </div>
      </div>
      <div class="transaction-amount ${isOver ? "expense" : "income"}">
        ${isOver ? "초과" : "남음"} ${formatMoney(Math.abs(remaining))}
        <br />
        <div class="item-actions">
          <button class="edit-btn" onclick="editMonthlyBudget('${item.id}')">수정</button>
          <button class="delete-btn" onclick="deleteMonthlyBudget('${item.id}')">삭제</button>
        </div>
      </div>
    `;

    monthlyBudgetList.appendChild(li);
  });
}

function setDefaultStatsRange() {
  statsStartDateInput.value = toDateKey(viewYear, viewMonth, 1);
  statsEndDateInput.value = toDateKey(viewYear, viewMonth, getLastDateOfMonth(viewYear, viewMonth));
}

function renderStats() {
  const startDate = statsStartDateInput.value;
  const endDate = statsEndDateInput.value;

  if (!startDate || !endDate) return;

  if (dateKeyToDate(startDate) > dateKeyToDate(endDate)) {
    alert("시작일은 종료일보다 늦을 수 없습니다.");
    return;
  }

  const items = getAllItemsForRange(startDate, endDate).filter(item => !item.isExpected);
  const incomeTotal = items.filter(item => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const expenseTotal = items.filter(item => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);

  statsIncomeTotalEl.textContent = formatMoney(incomeTotal);
  statsExpenseTotalEl.textContent = formatMoney(expenseTotal);
  statsNetTotalEl.textContent = formatMoney(incomeTotal - expenseTotal);

  const categoryMap = {};

  items.forEach(item => {
    if (!categoryMap[item.category]) categoryMap[item.category] = { income: 0, expense: 0 };
    categoryMap[item.category][item.type] += Number(item.amount);
  });

  const categoryRows = Object.entries(categoryMap)
    .map(([category, value]) => ({
      category,
      income: value.income,
      expense: value.expense,
      total: value.income - value.expense
    }))
    .sort((a, b) => Math.abs(b.income) + Math.abs(b.expense) - (Math.abs(a.income) + Math.abs(a.expense)));

  statsList.innerHTML = "";

  if (categoryRows.length === 0) {
    statsEmptyMessage.style.display = "block";
    return;
  }

  statsEmptyMessage.style.display = "none";

  categoryRows.forEach(row => {
    const li = document.createElement("li");
    li.className = "transaction-item";
    li.innerHTML = `
      <div class="transaction-info">
        <strong>${row.category}</strong>
        <small>수입 ${formatMoney(row.income)} · 지출 ${formatMoney(row.expense)}</small>
      </div>
      <div class="transaction-amount ${row.total >= 0 ? "income" : "expense"}">
        총액 ${formatMoney(row.total)}
      </div>
    `;
    statsList.appendChild(li);
  });
}

function renderCategoryManager() {
  const type = categoryManagerMode === "recurring" ? currentRecurringCategoryType() : currentCategoryType();
  categoryManagerTitle.textContent = `${type === "income" ? "수입" : "지출"} 카테고리 목록`;
  const list = categories[type] || [];
  categoryManagerList.innerHTML = "";

  if (list.length === 0) {
    categoryManagerEmpty.style.display = "block";
    return;
  }

  categoryManagerEmpty.style.display = "none";

  list.forEach(category => {
    const li = document.createElement("li");
    li.className = "manager-item";
    li.innerHTML = `
      <strong>${category}</strong>
      <button class="delete-btn" type="button">삭제</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      deleteCategory(type, category);
    });
    categoryManagerList.appendChild(li);
  });
}

function render() {
  if (isNativeApp) {
    renderHomeScreen();
  } else {
    if (!isCalendarMode) renderWebDashboard();
  }
  if (isCalendarMode) {
    renderSummary();
    renderCalendar();
    renderDailyList();
  }
  renderRecurringList();
  renderMonthlyBudgetPage();
  updateTransactionCategoryButtons();
  updateRecurringCategoryButtons();

  if (!statsModal.classList.contains("hidden")) renderStats();
  if (!categoryManagerModal.classList.contains("hidden")) renderCategoryManager();
}

function openAddModal() {
  editingTransactionId = null;
  form.reset();

  // 직전에 사용한 구분/카테고리를 기억해서 반복 입력 시 다시 고르지 않아도 되게 함
  typeInput.value = lastUsedType;
  selectedCategory = lastUsedCategory[typeInput.value] || "";

  saveTransactionBtn.textContent = "저장하기";
  addModalTitle.textContent = `${selectedDate} 내역 추가`;
  ensureSelectedCategory();
  updateTransactionCategoryButtons();
  addModal.classList.remove("hidden");
  amountInput.focus();
}

function closeAddModal() {
  addModal.classList.add("hidden");
  editingTransactionId = null;
}

function addOrUpdateTransaction(event) {
  event.preventDefault();

  const category = getSelectedTransactionCategory();

  if (!category) {
    alert("카테고리를 먼저 만들어 선택해주세요.");
    return;
  }

  const transactionData = {
    date: selectedDate,
    type: typeInput.value,
    category,
    amount: Number(amountInput.value),
    memo: memoInput.value.trim()
  };

  if (!transactionData.memo || transactionData.amount <= 0) {
    alert("메모와 금액을 올바르게 입력해주세요.");
    return;
  }

  if (editingTransactionId) {
    transactions = transactions.map(item =>
      item.id === editingTransactionId ? { ...item, ...transactionData } : item
    );
  } else {
    transactions.push({
      id: crypto.randomUUID(),
      ...transactionData
    });
  }

  lastUsedType = transactionData.type;
  lastUsedCategory[transactionData.type] = transactionData.category;

  saveAll();
  closeAddModal();
  form.reset();
  render();
}

window.editTransaction = function(id) {
  const item = transactions.find(transaction => transaction.id === id);
  if (!item) return;

  selectedDate = item.date;
  editingTransactionId = id;

  typeInput.value = item.type;

  if (!categories[item.type].includes(item.category)) {
    categories[item.type].push(item.category);
    saveAll();
  }

  selectedCategory = item.category;
  amountInput.value = item.amount;
  memoInput.value = item.memo;

  addModalTitle.textContent = `${item.date} 내역 수정`;
  saveTransactionBtn.textContent = "수정 완료";
  updateTransactionCategoryButtons();
  addModal.classList.remove("hidden");
};

window.deleteTransaction = function(id) {
  if (!confirm("이 내역을 삭제할까요?")) return;
  transactions = transactions.filter(item => item.id !== id);
  saveAll();
  render();
};

function addRecurringItem(event) {
  event.preventDefault();

  const category = getSelectedRecurringCategory();

  if (!category) {
    alert("카테고리를 먼저 만들어 선택해주세요.");
    return;
  }

  const newRecurringItem = {
    id: crypto.randomUUID(),
    type: recurringTypeInput.value,
    day: Number(recurringDayInput.value),
    category,
    amount: Number(recurringAmountInput.value),
    memo: recurringMemoInput.value.trim()
  };

  if (!newRecurringItem.memo || newRecurringItem.amount <= 0) {
    alert("내용과 금액을 올바르게 입력해주세요.");
    return;
  }

  recurringItems.push(newRecurringItem);
  saveAll();

recurringForm.reset();
setRecurringDayOptions();
ensureSelectedRecurringCategory();
render();
}

window.deleteRecurringItem = function(id) {
  if (!confirm("이 반복 항목을 삭제할까요?")) return;
  recurringItems = recurringItems.filter(item => item.id !== id);
  saveAll();
  render();
};

function addMonthlyBudget(event) {
  event.preventDefault();

  const category = monthlyBudgetCategoryInput.value.trim();
  const amount = Number(monthlyBudgetAmountInput.value);

  if (!category || amount <= 0) {
    alert("카테고리와 예산 금액을 올바르게 입력해주세요.");
    return;
  }

  const duplicate = monthlyBudgets.find(item => item.category === category && item.id !== editingMonthlyBudgetId);
  if (duplicate) {
    alert("이미 같은 카테고리의 월 예산이 있습니다. 기존 항목을 수정해주세요.");
    return;
  }

  if (editingMonthlyBudgetId) {
    monthlyBudgets = monthlyBudgets.map(item =>
      item.id === editingMonthlyBudgetId ? { ...item, category, amount } : item
    );
    editingMonthlyBudgetId = null;
    saveMonthlyBudgetBtn.textContent = "월 예산 저장";
  } else {
    monthlyBudgets.push({
      id: crypto.randomUUID(),
      category,
      amount
    });
  }

  if (!categories.expense.includes(category)) {
    categories.expense.push(category);
  }

  saveAll();
  monthlyBudgetForm.reset();
  render();
}

window.editMonthlyBudget = function(id) {
  const item = monthlyBudgets.find(budget => budget.id === id);
  if (!item) return;

  editingMonthlyBudgetId = id;
  monthlyBudgetCategoryInput.value = item.category;
  monthlyBudgetAmountInput.value = item.amount;
  saveMonthlyBudgetBtn.textContent = "수정 완료";
  monthlyBudgetCategoryInput.focus();
};

window.deleteMonthlyBudget = function(id) {
  if (!confirm("이 월 예산 목표를 삭제할까요?")) return;

  monthlyBudgets = monthlyBudgets.filter(item => item.id !== id);
  saveAll();
  render();
};

function resetAllTransactions() {
  if (!confirm("일반 내역을 모두 삭제할까요? 반복 설정과 예산 배분은 유지됩니다.")) return;
  transactions = [];
  saveAll();
  render();
}

function setRecurringDayOptions() {
  recurringDayInput.innerHTML = "";
  for (let day = 1; day <= 31; day++) {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = `${day}일`;
    recurringDayInput.appendChild(option);
  }
}

function openCategoryManager(mode) {
  categoryManagerMode = mode;
  categoryCreateForm.classList.add("hidden");
  newCategoryNameInput.value = "";

  if (mode === "recurring") {
    settingsModal.classList.add("hidden");
  }

  categoryManagerModal.classList.remove("hidden");
  renderCategoryManager();
}

function addCategory(event) {
  event.preventDefault();

  const type = categoryManagerMode === "recurring" ? currentRecurringCategoryType() : currentCategoryType();
  const name = newCategoryNameInput.value.trim();

  if (!name) {
    alert("카테고리 이름을 입력해주세요.");
    return;
  }

  if (categories[type].includes(name)) {
    alert("이미 존재하는 카테고리입니다.");
    return;
  }

  categories[type].push(name);

  if (categoryManagerMode === "recurring") {
    selectedRecurringCategory = name;
  } else {
    selectedCategory = name;
  }

  saveAll();
  newCategoryNameInput.value = "";
  categoryCreateForm.classList.add("hidden");
  render();
}

function deleteCategory(type, category) {
  const usedInTransactions = transactions.some(item => item.type === type && item.category === category);
  const usedInRecurring = recurringItems.some(item => item.type === type && item.category === category);

  if (usedInTransactions || usedInRecurring) {
    alert("이미 사용된 카테고리는 내역 통계를 위해 삭제할 수 없습니다.");
    return;
  }

  if (!confirm(`'${category}' 카테고리를 삭제할까요?`)) return;

  categories[type] = categories[type].filter(item => item !== category);

  if (selectedCategory === category) selectedCategory = categories[type][0] || "";
  if (selectedRecurringCategory === category) selectedRecurringCategory = categories[type][0] || "";

  saveAll();
  render();
}

function closeCategoryManager() {
  categoryManagerModal.classList.add("hidden");

  if (categoryManagerMode === "recurring") {
    settingsModal.classList.remove("hidden");
  }
}

function openCategoryPicker(mode) {
  categoryPickerMode = mode;
  const type = mode === "recurring" ? currentRecurringCategoryType() : currentCategoryType();
  const list = categories[type] || [];

  categoryPickerTitle.textContent = `${type === "income" ? "수입" : "지출"} 카테고리 선택`;
  categoryPickerList.innerHTML = "";

  list.forEach(category => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-picker-item";
    button.textContent = category;

    button.addEventListener("click", () => {
      if (categoryPickerMode === "recurring") {
        selectedRecurringCategory = category;
        updateRecurringCategoryButtons();
      } else {
        selectedCategory = category;
        updateTransactionCategoryButtons();
      }

      categoryPickerModal.classList.add("hidden");
    });

    li.appendChild(button);
    categoryPickerList.appendChild(li);
  });

  categoryPickerModal.classList.remove("hidden");
}

prevMonthBtn.addEventListener("click", () => {
  viewMonth--;
  if (viewMonth < 0) {
    viewMonth = 11;
    viewYear--;
  }
  selectedDate = toDateKey(viewYear, viewMonth, 1);
  render();
});

nextMonthBtn.addEventListener("click", () => {
  viewMonth++;
  if (viewMonth > 11) {
    viewMonth = 0;
    viewYear++;
  }
  selectedDate = toDateKey(viewYear, viewMonth, 1);
  render();
});

bottomNavAddBtn.addEventListener("click", openAddModal);

bottomNavHomeBtn.addEventListener("click", () => {
  isCalendarMode = false;
  showMainApp();
  summaryGrid.classList.add("hidden");
  calendarPanel.classList.add("hidden");
  dailyListPanel.classList.add("hidden");
  if (isNativeApp) {
    homeScreen.classList.remove("hidden");
    webDashboard.classList.add("hidden");
  } else {
    webDashboard.classList.remove("hidden");
    homeScreen.classList.add("hidden");
    renderWebDashboard();
  }
});
bottomNavBudgetBtn.addEventListener("click", showMonthlyBudgetPage);
bottomNavStatsBtn.addEventListener("click", () => {
  setDefaultStatsRange();
  statsModal.classList.remove("hidden");
  renderStats();
});
bottomNavSettingsBtn.addEventListener("click", () => {
  appSettingsModal.classList.remove("hidden");
});

function updateBottomNavActive() {
  const isBudgetPage = !monthlyBudgetPage.classList.contains("hidden");
  bottomNavHomeBtn.classList.toggle("active", !isBudgetPage);
  bottomNavBudgetBtn.classList.toggle("active", isBudgetPage);
}
closeAddModalBtn.addEventListener("click", closeAddModal);
addModal.addEventListener("click", event => {
  if (event.target === addModal) closeAddModal();
});

form.addEventListener("submit", addOrUpdateTransaction);

document.querySelectorAll(".quick-amount-btn").forEach(button => {
  button.addEventListener("click", () => {
    const addAmount = Number(button.dataset.amount);

    if (addAmount === 0) {
      amountInput.value = "";
      amountInput.focus();
      return;
    }

    const current = Number(amountInput.value) || 0;
    amountInput.value = current + addAmount;
    amountInput.focus();
  });
});

typeInput.addEventListener("change", () => {
  categoryExpanded = false;
  selectedCategory = "";
  updateTransactionCategoryButtons();
});

recurringTypeInput.addEventListener("change", () => {
  recurringCategoryExpanded = false;
  selectedRecurringCategory = "";
  updateRecurringCategoryButtons();
});

recurringForm.addEventListener("submit", addRecurringItem);
resetBtn.addEventListener("click", resetAllTransactions);
monthlyBudgetForm.addEventListener("submit", addMonthlyBudget);

openCategoryManagerBtn.addEventListener("click", () => openCategoryManager("transaction"));
openRecurringCategoryManagerBtn.addEventListener("click", () => openCategoryManager("recurring"));
closeCategoryManagerBtn.addEventListener("click", closeCategoryManager);
categoryManagerModal.addEventListener("click", event => {
  if (event.target === categoryManagerModal) closeCategoryManager();
});

addCategoryToggleBtn.addEventListener("click", () => {
  categoryCreateForm.classList.toggle("hidden");
  if (!categoryCreateForm.classList.contains("hidden")) newCategoryNameInput.focus();
});

categoryCreateForm.addEventListener("submit", addCategory);

closeCategoryPickerBtn.addEventListener("click", () => categoryPickerModal.classList.add("hidden"));
categoryPickerModal.addEventListener("click", event => {
  if (event.target === categoryPickerModal) categoryPickerModal.classList.add("hidden");
});

openSettingsBtn.addEventListener("click", () => settingsModal.classList.remove("hidden"));
closeSettingsBtn.addEventListener("click", () => settingsModal.classList.add("hidden"));
settingsModal.addEventListener("click", event => {
  if (event.target === settingsModal) settingsModal.classList.add("hidden");
});

goBudgetBtn.addEventListener("click", showMonthlyBudgetPage);

backHomeFromMonthlyBudgetBtn.addEventListener("click", () => {
  showMainApp();
  editingMonthlyBudgetId = null;
  monthlyBudgetForm.reset();
  saveMonthlyBudgetBtn.textContent = "월 예산 저장";
});

closeStatsBtn.addEventListener("click", () => statsModal.classList.add("hidden"));
statsModal.addEventListener("click", event => {
  if (event.target === statsModal) statsModal.classList.add("hidden");
});

applyStatsBtn.addEventListener("click", renderStats);


function applyUiSettings() {
  const savedTheme = localStorage.getItem("uiTheme") || "warm";
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  document.body.classList.remove(
    "theme-coral", "theme-blue", "theme-green", "theme-purple", "theme-mono",
    "theme-warm", "theme-sage", "theme-sky", "theme-lavender", "theme-sand", "theme-monster"
  );
  document.body.classList.add(`theme-${savedTheme}`);
  document.body.classList.toggle("dark-mode", isDarkMode);

  if (darkModeToggle) darkModeToggle.checked = isDarkMode;

  themeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.theme === savedTheme);
  });
}

darkModeToggle.addEventListener("change", () => {
  localStorage.setItem("darkMode", String(darkModeToggle.checked));
  applyUiSettings();
});

if (isNativeApp) {
  notificationSettingRow.classList.remove("hidden");
  notificationToggle.checked = notificationsEnabledByUser();
} else {
  notificationSettingRow.classList.add("hidden");
}

notificationToggle.addEventListener("change", () => {
  localStorage.setItem("notificationsEnabled", String(notificationToggle.checked));

  if (notificationToggle.checked) {
    refreshLocalNotifications();
  } else {
    cancelAllLocalNotifications();
  }
});

// 금융 알림 자동 등록 토글
const financeListenerSettingRow = document.getElementById("financeListenerSettingRow");
const financeListenerToggle = document.getElementById("financeListenerToggle");
const budgetStatusSettingRow = document.getElementById("budgetStatusSettingRow");
const budgetStatusToggle = document.getElementById("budgetStatusToggle");

if (isNativeApp) {
  financeListenerSettingRow.classList.remove("hidden");
  financeListenerToggle.checked = financeListenerEnabledByUser();
  budgetStatusSettingRow.classList.remove("hidden");
  budgetStatusToggle.checked = budgetStatusEnabledByUser();
}

financeListenerToggle.addEventListener("change", async () => {
  if (financeListenerToggle.checked) {
    const plugin = getNotificationBridgePlugin();
    if (plugin) {
      const { granted } = await plugin.checkPermission();
      if (!granted) {
        financeListenerToggle.checked = false;
        alert("알림 접근 권한이 필요합니다.\n설정 → 앱 → 특별한 앱 접근 → 알림 접근에서 이 앱을 활성화한 뒤 다시 켜주세요.");
        await requestFinanceListenerPermission();
        return;
      }
    }
    localStorage.setItem("financeListenerEnabled", "true");
    setupFinanceNotificationListener();
  } else {
    localStorage.setItem("financeListenerEnabled", "false");
  }
});

budgetStatusToggle.addEventListener("change", async () => {
  localStorage.setItem("budgetStatusEnabled", String(budgetStatusToggle.checked));
  if (budgetStatusToggle.checked) {
    updateBudgetStatusNotification();
  } else {
    const plugin = getBudgetStatusPlugin();
    if (plugin) plugin.hide();
  }
});

// 배너 무시 버튼
document.getElementById("autoRegisterDismiss").addEventListener("click", dismissAutoRegisterBanner);

// 반복 항목 제안 배너 버튼
document.getElementById("recurringPromptYes").addEventListener("click", () => {
  document.getElementById("recurringPromptBanner").classList.add("hidden");
  if (pendingRecurringItem) {
    recurringTypeInput.value = pendingRecurringItem.isIncome ? "income" : "expense";
    recurringAmountInput.value = pendingRecurringItem.amount;
    recurringMemoInput.value = pendingRecurringItem.memo || "";
    selectedRecurringCategory = "";
    updateRecurringCategoryButtons();
    settingsModal.classList.remove("hidden");
    pendingRecurringItem = null;
  }
});
document.getElementById("recurringPromptNo").addEventListener("click", () => {
  document.getElementById("recurringPromptBanner").classList.add("hidden");
  pendingRecurringItem = null;
});

// 웹 대시보드 뷰 토글 (대시보드 ↔ 달력)
document.getElementById("dashViewBtn").addEventListener("click", () => {
  isCalendarMode = false;
  document.getElementById("dashViewBtn").classList.add("active");
  document.getElementById("calViewBtn").classList.remove("active");
  summaryGrid.classList.add("hidden");
  calendarPanel.classList.add("hidden");
  dailyListPanel.classList.add("hidden");
  webDashboard.classList.remove("hidden");
  renderWebDashboard();
});

document.getElementById("calViewBtn").addEventListener("click", () => {
  isCalendarMode = true;
  document.getElementById("calViewBtn").classList.add("active");
  document.getElementById("dashViewBtn").classList.remove("active");
  webDashboard.classList.add("hidden");
  summaryGrid.classList.remove("hidden");
  calendarPanel.classList.remove("hidden");
  dailyListPanel.classList.remove("hidden");
  renderSummary();
  renderCalendar();
  renderDailyList();
});

document.getElementById("webShowFullCalBtn").addEventListener("click", () => {
  document.getElementById("calViewBtn").click();
});

// 웹 대시보드 월 네비
document.getElementById("webPrevMonthBtn").addEventListener("click", () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  selectedDate = toDateKey(viewYear, viewMonth, 1);
  render();
});

document.getElementById("webNextMonthBtn").addEventListener("click", () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  selectedDate = toDateKey(viewYear, viewMonth, 1);
  render();
});

// 잔액 초기 입력
document.getElementById("balanceSetupBtn").addEventListener("click", () => {
  const val = Number(document.getElementById("balanceSetupInput").value);
  if (val > 0) {
    localStorage.setItem("baseBalance", String(val));
    localStorage.setItem("baseBalanceAt", new Date().toISOString());
    renderHomeScreen();
  }
});

// 달력 보기 전환 (앱)
document.getElementById("showCalendarBtn").addEventListener("click", () => {
  isCalendarMode = true;
  homeScreen.classList.add("hidden");
  webDashboard.classList.add("hidden");
  summaryGrid.classList.remove("hidden");
  calendarPanel.classList.remove("hidden");
  dailyListPanel.classList.remove("hidden");
  renderSummary();
  renderCalendar();
  renderDailyList();
});

// 설정에서 돌아왔을 때 알림 접근 권한 재확인
document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState !== "visible") return;
  if (!isNativeApp || !financeListenerEnabledByUser()) return;
  const plugin = getNotificationBridgePlugin();
  if (!plugin) return;
  const { granted } = await plugin.checkPermission();
  if (granted && financeListenerToggle && !financeListenerToggle.checked) {
    financeListenerToggle.checked = true;
    localStorage.setItem("financeListenerEnabled", "true");
    setupFinanceNotificationListener();
  }
});

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    localStorage.setItem("uiTheme", button.dataset.theme);
    applyUiSettings();
  });
});

closeAppSettingsBtn.addEventListener("click", () => {
  appSettingsModal.classList.add("hidden");
});

appSettingsModal.addEventListener("click", event => {
  if (event.target === appSettingsModal) {
    appSettingsModal.classList.add("hidden");
  }
});


function explainAuthError(error) {
  const code = error?.code || "";
  const message = error?.message || "";

  if (message.includes("No credentials available") || message.includes("NoCredentialException")) {
    return "기기에 로그인된 Google 계정이 없습니다. 설정 > 계정에서 Google 계정을 추가한 뒤 다시 시도해주세요.";
  }

  switch (code) {
    case "auth/unauthorized-domain":
      return "이 주소(도메인)가 Firebase Authentication의 '승인된 도메인' 목록에 없습니다. Firebase 콘솔 > Authentication > Settings > Authorized domains 에서 현재 접속 주소를 추가해주세요.";
    case "auth/popup-blocked":
      return "브라우저가 로그인 팝업을 차단했습니다. 팝업 차단을 해제하거나 잠시 후 다시 시도해주세요.";
    case "auth/popup-closed-by-user":
      return "로그인 팝업이 완료되기 전에 닫혔습니다. 다시 시도해주세요.";
    case "auth/network-request-failed":
      return "네트워크 연결을 확인해주세요.";
    case "auth/operation-not-supported-in-this-environment":
      return "현재 실행 환경(예: 파일을 직접 열었거나 in-app 브라우저)에서는 Google 로그인이 지원되지 않습니다. Live Server 등 http(s) 환경에서 실행해주세요.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
      return "Firebase API 키 설정이 올바르지 않습니다. firebaseConfig 값을 Firebase 콘솔과 다시 대조해주세요.";
    default:
      return error?.message || "알 수 없는 오류가 발생했습니다.";
  }
}

async function loginWithGoogle() {
  if (isNativeApp) {
    const firebaseAuthPlugin = window.Capacitor?.Plugins?.FirebaseAuthentication;

    if (!firebaseAuthPlugin) {
      throw new Error("FirebaseAuthentication 플러그인을 찾을 수 없습니다. capacitor.config.json 플러그인 설정과 google-services.json 파일이 android 프로젝트에 있는지 확인해주세요.");
    }

    const result = await firebaseAuthPlugin.signInWithGoogle();

    console.log("Google Native Login Result:", JSON.stringify(result));

    const idToken =
      result?.credential?.idToken ||
      result?.credential?.id_token ||
      result?.idToken ||
      result?.id_token;

    const accessToken =
      result?.credential?.accessToken ||
      result?.credential?.access_token ||
      result?.accessToken ||
      result?.access_token;

    if (!idToken && !accessToken) {
      throw new Error("Google 로그인 토큰을 가져오지 못했습니다. google-services.json / SHA-1 인증서 등록 여부를 확인해주세요.");
    }

    const credential = GoogleAuthProvider.credential(idToken || null, accessToken || null);
    await signInWithCredential(auth, credential);
    return;
  }

  if (location.protocol === "file:") {
    throw { code: "auth/operation-not-supported-in-this-environment" };
  }

  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (error?.code === "auth/popup-blocked" || error?.code === "auth/cancelled-popup-request") {
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    throw error;
  }
}

loginBtn.addEventListener("click", async () => {
  try {
    await loginWithGoogle();
  } catch (error) {
    console.error("Google login error:", error);
    alert(`Google 로그인 실패\n${explainAuthError(error)}`);
  }
});

getRedirectResult(auth).catch(error => {
  console.error("Google redirect login error:", error);
  alert(`Google 로그인 실패\n${explainAuthError(error)}`);
});


syncBtn.addEventListener("click", async () => {
  if (!currentUser) {
    alert("동기화하려면 먼저 로그인해주세요.");
    return;
  }

  try {
    authStatus.textContent = "동기화 중";

    await saveToFirebase();
    await loadFromFirebase(currentUser);

    authStatus.textContent = "로그인됨";
    alert("동기화가 완료되었습니다.");
  } catch (error) {
    console.error(error);
    authStatus.textContent = "동기화 실패";
    alert("동기화에 실패했습니다.");
  }
});


exportDataBtn.addEventListener("click", exportAccountBookData);

importDataBtn.addEventListener("click", () => importFileInput.click());

importFileInput.addEventListener("change", () => {
  const file = importFileInput.files && importFileInput.files[0];
  importAccountBookDataFromFile(file);
});

settingsLogoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    alert("로그아웃에 실패했습니다.");
  }
});

onAuthStateChanged(auth, user => {
  currentUser = user;

  if (user) {
    authStatus.textContent = "로그인됨";
    loginBtn.classList.add("hidden");
    settingsLogoutBtn.classList.remove("hidden");
    loadFromFirebase(user);
  } else {
    authStatus.textContent = "로그인 전";
    loginBtn.classList.remove("hidden");
    settingsLogoutBtn.classList.add("hidden");
    render();
  }
});

if (location.protocol === "file:" && !isNativeApp) {
  authStatus.textContent = "file로 열림 (로그인 불가)";
  loginBtn.title = "index.html을 직접 열면 Google 로그인이 동작하지 않습니다. Live Server 등 http(s) 환경에서 실행해주세요.";
}

setRecurringDayOptions();
ensureSelectedCategory();
ensureSelectedRecurringCategory();
updateBottomNavActive();

// 앱 vs 웹 초기 화면 분기
if (isNativeApp) {
  homeScreen.classList.remove("hidden");
  webDashboard.classList.add("hidden");
} else {
  webDashboard.classList.remove("hidden");
  homeScreen.classList.add("hidden");
}

render();
refreshLocalNotifications();
setupFinanceNotificationListener();
updateBudgetStatusNotification();
