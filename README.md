# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [Your Name]
- **Student ID:** 67543210071-6
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier): Presentation, Business, Data

## 📂 Project Structure
```
midterm-individual-67543210071-6/
├── src/
│   ├── presentation/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middlewares/
│   ├── business/
│   │   ├── services/
│   │   └── validators/
│   └── data/
│       ├── repositories/
│       └── database/
├── server.js
├── package.json
├── library.db
├── README.md
└── ARCHITECTURE.md
```

## 🎯 Refactoring Summary

### Problems in Monolithic version:
- Single large file with mixed concerns (HTTP, business, data).
# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** __________________________
- **Student ID:** 67543210071-6
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier): Presentation, Business, Data

## 📂 Project Structure
midterm-individual-67543210071-6/
├── src/
│   ├── presentation/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middlewares/
│   ├── business/
   │   ├── services/
   │   └── validators/
   └── data/
	   ├── repositories/
	   └── database/
├── server.js
├── package.json
├── library.db
├── README.md
└── ARCHITECTURE.md

## 🎯 Refactoring Summary

### Problems in Monolithic version
- Single large file with mixed concerns (HTTP handling, business logic, data access).
- Hard to maintain and test; risk of merge conflicts when multiple developers edit the same file.
- No clear boundaries for responsibilities.

### How Layered Architecture fixes them
- Separates concerns into Presentation, Business, and Data layers.
- Each layer has clear responsibilities (routes/controllers, services/validators, repositories/database).
- Easier to test, maintain, and extend; enables team collaboration.

### Benefits
- Improved maintainability and readability.
- Easier to add features and refactor safely.
- Clearer testing boundaries and fewer merge conflicts.

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Run server
npm start

# 3. API base URL
http://localhost:3000/api/books
```

## 📝 API Endpoints
- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- PATCH /api/books/:id/borrow
- PATCH /api/books/:id/return
- DELETE /api/books/:id

## 🗂️ Submission Checklist
- [ ] `src/` folder with Presentation, Business, Data layers
- [ ] `server.js` configured to mount routes and error handler
- [ ] `README.md` and `ARCHITECTURE.md`
- [ ] `.gitignore` excludes `node_modules/` and `*.db`

---

Fill in your name and student ID above before submitting.

# MIDTERM-INDIVIDUAL-67543210071-2
