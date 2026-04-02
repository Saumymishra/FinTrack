# FinTrack – Finance Dashboard

## Overview

FinTrack is a frontend-focused finance dashboard built to help users track and understand their financial activity in a simple and intuitive way.

The goal of this project was not to overcomplicate things, but to focus on clarity, usability, and clean UI design while handling state and interactions properly on the frontend.

---

## Features

### Dashboard Overview

* Summary cards for:

  * Total Balance
  * Total Income
  * Total Expenses
* Balance trend chart (time-based visualization)
* Expense breakdown chart (category-based visualization)

---

### Transactions Section

* List of transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)

* Functionalities:

  * Search by description
  * Filter by type and category
  * Date range filtering
  * Sorting (amount / date)
  * Grouping (category / month)

---

### Role-Based UI (Frontend Simulation)

* **Admin**

  * Can add, edit, and delete transactions

* **Viewer**

  * Read-only access

* Role switching implemented via UI toggle for demonstration

---

### Insights Section

* Highest spending category
* Monthly comparison (income vs expense)
* Quick summary of financial patterns

---

### State Management

* Managed using Zustand
* Handles:

  * Transactions data
  * Filters
  * Role state
  * UI states (modals, sidebar, etc.)

---

### UI & UX

* Clean and minimal design
* Fully responsive layout
* Light / Dark mode support
* Smooth transitions using motion animations
* Handles empty states gracefully

---

## Optional Enhancements Implemented

* Dark mode toggle
* Data persistence using local storage
* Export transactions as CSV / JSON
* Animated UI using motion library
* Advanced filtering and grouping

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* Zustand (State Management)
* Recharts (Charts)
* Motion (Animations)
* Lucide Icons

---

## Project Structure

The project is organized in a modular way to keep things scalable and easy to maintain.

```
src/
├── components/        # Reusable UI and feature components
│   ├── dashboard/     # Charts and summary cards
│   ├── insights/      # Insights related UI
│   ├── layout/        # Navbar, Sidebar
│   ├── transactions/  # Table, filters, forms
│   └── ui/            # Base components (Button, Card, Input, etc.)
│
├── pages/             # Page-level components (Dashboard, etc.)
├── layouts/           # Main layout wrapper
├── store/             # Zustand state management
├── hooks/             # Custom hooks (e.g., dark mode)
├── utils/             # Helper functions (formatting, export, etc.)
├── data/              # Mock/static data
├── lib/               # Utility helpers (cn, etc.)
│
├── App.jsx            # App entry
├── main.jsx           # React root
└── index.css          # Global styles + theme variables
```

## Getting Started

### Installation

```bash
git clone <your-repo-link>
cd fintrack
npm install
npm run dev
```

---

## Approach

I focused on:

* Keeping components modular and reusable
* Avoiding overengineering
* Maintaining a consistent design system using CSS variables
* Ensuring both light and dark themes work properly without conflicts
* Making the UI intuitive rather than complex

---

## Notes

* This project uses mock data (no backend)
* Role-based behavior is simulated on the frontend
* The goal was to demonstrate UI thinking and frontend architecture rather than full production setup

---

## What I’d Improve Next

* Add backend integration (API + auth)
* Real-time analytics
* Better chart customization
* Performance optimizations for large datasets

---

## Author

Saumy Mishra
