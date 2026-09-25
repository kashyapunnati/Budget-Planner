# 💰 Budget Planner with Charts

A simple web-based Budget Planner that helps users set category-wise budgets, track expenses, compare budget vs actual spending, and identify over-budget categories.

## ✨ Features

- Set budgets for different categories
- Add and track expenses
- View budget summary
- Compare Budget vs Actual spending
- Display data using a bar chart
- Show over-budget warnings
- Delete expenses
- Save data using LocalStorage
- Data remains available after refreshing the page
- Responsive design

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Chart.js
- LocalStorage

## 📊 Categories

The application supports:

- Food
- Transport
- Shopping
- Bills
- Entertainment
- Other

## 📈 Budget vs Actual Chart

The application uses Chart.js to visually compare:

- **Budget** — planned amount for a category
- **Actual Spending** — amount actually spent

This makes it easier to understand spending for each category.

## ⚠️ Over-Budget Warning

When actual spending becomes greater than the selected category's budget, the application displays an **Over Budget** warning.

## 💾 LocalStorage

LocalStorage is used to save:

- Category budgets
- Expense records

This allows the data to remain available even after refreshing the webpage.

## 🚀 How to Use

1. Select a category.
2. Enter a budget amount.
3. Click **Set Budget**.
4. Select an expense category.
5. Enter the expense amount and description.
6. Click **Add Expense**.
7. Check the Budget Summary.
8. View the Budget vs Actual chart.
9. Delete an expense when needed.

## 📁 Project Structure

Budget-Planner

├── index.html
├── style.css
├── script.js
└── README.md
