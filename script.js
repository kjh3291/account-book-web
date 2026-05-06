import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
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

const appPage = document.getElementById("appPage");
const budgetPage = document.getElementById("budgetPage");
const monthlyBudgetPage = document.getElementById("monthlyBudgetPage");

const authStatus = document.getElementById("authStatus");
const loginBtn = document.getElementById("loginBtn");
const syncBtn = document.getElementById("syncBtn");

const openAppSettingsBtn = document.getElementById("openAppSettingsBtn");
const appSettingsModal = document.getElementById("appSettingsModal");
const closeAppSettingsBtn = document.getElementById("closeAppSettingsBtn");
const settingsLogoutBtn = document.getElementById("settingsLogoutBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const themeButtons = document.querySelectorAll(".theme-btn");

const calendarEl = document.getElementById("calendar");
const currentMonthTitle = document.getElementById("currentMonthTitle");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const selectedDateTitle = document.getElementById("selectedDateTitle");
const addModal = document.getElementById("addModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
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
const backHomeBtn = document.getElementById("backHomeBtn");
const budgetTotalBalanceEl = document.getElementById("budgetTotalBalance");
const allocatedTotalEl = document.getElementById("allocatedTotal");
const unallocatedTotalEl = document.getElementById("unallocatedTotal");
const budgetForm = document.getElementById("budgetForm");
const budgetCategoryInput = document.getElementById("budgetCategory");
const budgetAmountInput = document.getElementById("budgetAmount");
const saveBudgetBtn = document.getElementById("saveBudgetBtn");
const budgetList = document.getElementById("budgetList");
const budgetEmptyMessage = document.getElementById("budgetEmptyMessage");

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
const openStatsBtn = document.getElementById("openStatsBtn");
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
let budgets = JSON.parse(localStorage.getItem("budgets")) || [];
let monthlyBudgets = JSON.parse(localStorage.getItem("monthlyBudgets")) || [];

let categories = JSON.parse(localStorage.getItem("categories")) || {
  income: [],
  expense: []
};

let selectedCategory = "";
let selectedRecurringCategory = "";
let categoryExpanded = false;
let recurringCategoryExpanded = false;
let categoryManagerMode = "transaction";
let editingTransactionId = null;
let editingBudgetId = null;
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
    budgets,
    monthlyBudgets,
    categories
  };
}

function applyAccountBookData(data) {
  transactions = data.transactions || [];
  recurringItems = data.recurringItems || [];
  budgets = data.budgets || [];
  monthlyBudgets = data.monthlyBudgets || [];
  categories = data.categories || { income: [], expense: [] };

  if (!categories.income) categories.income = [];
  if (!categories.expense) categories.expense = [];
}

function saveLocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("recurringItems", JSON.stringify(recurringItems));
  localStorage.setItem("budgets", JSON.stringify(budgets));
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

function getAllocatedTotal() {
  return budgets.reduce((sum, item) => sum + Number(item.amount), 0);
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
  budgetPage.classList.add("hidden");
  monthlyBudgetPage.classList.add("hidden");
}

function showMonthlyBudgetPage() {
  appPage.classList.add("hidden");
  budgetPage.classList.add("hidden");
  monthlyBudgetPage.classList.remove("hidden");
  renderMonthlyBudgetPage();
}

function renderBudgetPage() {
  const summary = getMonthSummary(viewYear, viewMonth);
  const actualBalance = summary.actualBalance;
  const allocatedTotal = getAllocatedTotal();
  const available = actualBalance - allocatedTotal;

  budgetTotalBalanceEl.textContent = formatMoney(actualBalance);
  allocatedTotalEl.textContent = formatMoney(allocatedTotal);
  unallocatedTotalEl.textContent = formatMoney(available);

  budgetList.innerHTML = "";

  if (budgets.length === 0) {
    budgetEmptyMessage.style.display = "block";
    return;
  }

  budgetEmptyMessage.style.display = "none";

  budgets.forEach(item => {
    const li = document.createElement("li");
    li.className = "transaction-item";
    li.innerHTML = `
      <div class="transaction-info">
        <strong>${item.category}</strong>
        <small>잔액에서 따로 나눠둔 돈</small>
      </div>
      <div class="transaction-amount balance">
        ${formatMoney(Number(item.amount))}
        <br />
        <div class="item-actions">
          <button class="edit-btn" onclick="editBudget('${item.id}')">수정</button>
          <button class="delete-btn" onclick="deleteBudget('${item.id}')">삭제</button>
        </div>
      </div>
    `;
    budgetList.appendChild(li);
  });
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
  renderSummary();
  renderCalendar();
  renderDailyList();
  renderRecurringList();
  renderBudgetPage();
  renderMonthlyBudgetPage();
  updateTransactionCategoryButtons();
  updateRecurringCategoryButtons();

  if (!statsModal.classList.contains("hidden")) renderStats();
  if (!categoryManagerModal.classList.contains("hidden")) renderCategoryManager();
}

function openAddModal() {
  editingTransactionId = null;
  form.reset();
  saveTransactionBtn.textContent = "저장하기";
  addModalTitle.textContent = `${selectedDate} 내역 추가`;
  ensureSelectedCategory();
  updateTransactionCategoryButtons();
  addModal.classList.remove("hidden");
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

function addBudget(event) {
  event.preventDefault();

  const summary = getMonthSummary(viewYear, viewMonth);
  const amount = Number(budgetAmountInput.value);
  const category = budgetCategoryInput.value.trim();

  if (!category || amount <= 0) {
    alert("항목과 금액을 올바르게 입력해주세요.");
    return;
  }

  const currentEditingAmount = editingBudgetId
    ? Number((budgets.find(item => item.id === editingBudgetId) || {}).amount || 0)
    : 0;

  const allocatedExceptCurrent = getAllocatedTotal() - currentEditingAmount;
  const availableForThisBudget = summary.actualBalance - allocatedExceptCurrent;

  if (amount > availableForThisBudget) {
    alert("사용 가능 잔액보다 큰 금액은 배분할 수 없습니다.");
    return;
  }

  if (editingBudgetId) {
    budgets = budgets.map(item =>
      item.id === editingBudgetId ? { ...item, category, amount } : item
    );
    editingBudgetId = null;
    saveBudgetBtn.textContent = "예산 나누기";
  } else {
    budgets.push({ id: crypto.randomUUID(), category, amount });
  }

  saveAll();
  budgetForm.reset();
  render();
}

window.editBudget = function(id) {
  const item = budgets.find(budget => budget.id === id);
  if (!item) return;

  editingBudgetId = id;
  budgetCategoryInput.value = item.category;
  budgetAmountInput.value = item.amount;
  saveBudgetBtn.textContent = "수정 완료";
  budgetCategoryInput.focus();
};

window.deleteBudget = function(id) {
  if (!confirm("이 예산 배분을 삭제할까요?")) return;
  budgets = budgets.filter(item => item.id !== id);
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

openAddModalBtn.addEventListener("click", openAddModal);
closeAddModalBtn.addEventListener("click", closeAddModal);
addModal.addEventListener("click", event => {
  if (event.target === addModal) closeAddModal();
});

form.addEventListener("submit", addOrUpdateTransaction);

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
budgetForm.addEventListener("submit", addBudget);
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

backHomeBtn.addEventListener("click", () => {
  showMainApp();
  editingBudgetId = null;
  budgetForm.reset();
  saveBudgetBtn.textContent = "예산 나누기";
});

backHomeFromMonthlyBudgetBtn.addEventListener("click", () => {
  showMainApp();
  editingMonthlyBudgetId = null;
  monthlyBudgetForm.reset();
  saveMonthlyBudgetBtn.textContent = "월 예산 저장";
});

openStatsBtn.addEventListener("click", () => {
  setDefaultStatsRange();
  statsModal.classList.remove("hidden");
  renderStats();
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
    "theme-warm", "theme-sage", "theme-sky", "theme-lavender", "theme-sand"
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

themeButtons.forEach(button => {
  button.addEventListener("click", () => {
    localStorage.setItem("uiTheme", button.dataset.theme);
    applyUiSettings();
  });
});

openAppSettingsBtn.addEventListener("click", () => {
  appSettingsModal.classList.remove("hidden");
});

closeAppSettingsBtn.addEventListener("click", () => {
  appSettingsModal.classList.add("hidden");
});

appSettingsModal.addEventListener("click", event => {
  if (event.target === appSettingsModal) {
    appSettingsModal.classList.add("hidden");
  }
});


loginBtn.addEventListener("click", async () => {
  try {
    const isAndroidApp =
      window.Capacitor &&
      window.Capacitor.isNativePlatform &&
      window.Capacitor.isNativePlatform();

    if (isAndroidApp) {
      const firebaseAuthPlugin =
        window.Capacitor?.Plugins?.FirebaseAuthentication;

      if (!firebaseAuthPlugin) {
        throw new Error("FirebaseAuthentication 플러그인을 찾을 수 없습니다.");
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
        throw new Error("Google 로그인 토큰을 가져오지 못했습니다.");
      }

      const credential = GoogleAuthProvider.credential(idToken || null, accessToken || null);
      await signInWithCredential(auth, credential);
    } else {
      await signInWithPopup(auth, googleProvider);
    }
  } catch (error) {
    console.error("Google login error:", error);
    alert(`Google 로그인 실패: ${error.code || error.message}`);
  }
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

setRecurringDayOptions();
ensureSelectedCategory();
ensureSelectedRecurringCategory();
render();
