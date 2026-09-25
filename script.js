let budgets = {};
let expenses = [];

let budgetChart = null;

const budgetCategory = document.getElementById("budgetCategory");
const budgetAmount = document.getElementById("budgetAmount");
const setBudgetBtn = document.getElementById("setBudgetBtn");

const expenseCategory = document.getElementById("expenseCategory");
const expenseAmount = document.getElementById("expenseAmount");
const expenseDescription = document.getElementById("expenseDescription");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const summary = document.getElementById("summary");
const expenseList = document.getElementById("expenseList");

const savedBudgets = localStorage.getItem("budgets");
const savedExpenses = localStorage.getItem("expenses");

if (savedBudgets) {
    budgets = JSON.parse(savedBudgets);
}

if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
}

setBudgetBtn.addEventListener("click", function () {

    const category = budgetCategory.value;
    const amount = Number(budgetAmount.value);

    if (category === "" || amount <= 0) {
        alert("Please select a category and enter a valid budget.");
        return;
    }

    budgets[category] = amount;

    saveData();
    displaySummary();
    updateChart();

    budgetCategory.value = "";
    budgetAmount.value = "";

    alert("Budget set successfully!");
});

addExpenseBtn.addEventListener("click", function () {

    const category = expenseCategory.value;
    const amount = Number(expenseAmount.value);
    const description = expenseDescription.value.trim();

    if (
        category === "" ||
        amount <= 0 ||
        description === ""
    ) {
        alert("Please fill in all expense details.");
        return;
    }

    const newExpense = {
        id: Date.now(),
        category: category,
        amount: amount,
        description: description
    };

    expenses.push(newExpense);

    saveData();
    displaySummary();
    displayExpenses();
    updateChart();

    expenseCategory.value = "";
    expenseAmount.value = "";
    expenseDescription.value = "";

    alert("Expense added successfully!");
});

function displaySummary() {

    summary.innerHTML = "";

    const categories = Object.keys(budgets);

    if (categories.length === 0) {
        summary.innerHTML = "<p>No budget added yet.</p>";
        return;
    }

    categories.forEach(function (category) {

        const budget = budgets[category];

        const actual = expenses
            .filter(function (expense) {
                return expense.category === category;
            })
            .reduce(function (total, expense) {
                return total + expense.amount;
            }, 0);

        const remaining = budget - actual;

        const card = document.createElement("div");

        card.className = "summary-card";

        if (actual > budget) {
            card.classList.add("over-budget");
        }

        card.innerHTML = `
            <h3>${category}</h3>

            <p><strong>Budget:</strong> ₹${budget}</p>

            <p><strong>Actual Spending:</strong> ₹${actual}</p>

            <p>
                <strong>
                    ${remaining >= 0 ? "Remaining" : "Over Budget"}:
                </strong>
                ₹${Math.abs(remaining)}
            </p>

            ${
                actual > budget
                    ? `<p class="warning">⚠️ Over budget!</p>`
                    : `<p>✅ Within budget</p>`
            }
        `;

        summary.appendChild(card);
    });
}

function displayExpenses() {

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = "<p>No expenses added yet.</p>";
        return;
    }

    expenses.forEach(function (expense) {

        const item = document.createElement("div");

        item.className = "expense-item";

        item.innerHTML = `
            <h3>${expense.description}</h3>

            <p>
                <strong>Category:</strong>
                ${expense.category}
            </p>

            <p>
                <strong>Amount:</strong>
                ₹${expense.amount}
            </p>

            <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(item);
    });
}

function deleteExpense(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
        return;
    }

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveData();
    displaySummary();
    displayExpenses();
    updateChart();
}

function updateChart() {

    const categories = Object.keys(budgets);

    const budgetValues = categories.map(function (category) {
        return budgets[category];
    });

    const actualValues = categories.map(function (category) {

        return expenses
            .filter(function (expense) {
                return expense.category === category;
            })
            .reduce(function (total, expense) {
                return total + expense.amount;
            }, 0);
    });


    const ctx = document
        .getElementById("budgetChart")
        .getContext("2d");


    if (budgetChart) {
        budgetChart.destroy();
    }


    budgetChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: categories,

            datasets: [
                {
                    label: "Budget",
                    data: budgetValues
                },
                {
                    label: "Actual Spending",
                    data: actualValues
                }
            ]
        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function saveData() {

    localStorage.setItem(
        "budgets",
        JSON.stringify(budgets)
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}

displaySummary();
displayExpenses();
updateChart();