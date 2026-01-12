# 📚 Library Management System (Midterm Project)

รายวิชา: ENGSE207 Software Architecture
สถาปัตยกรรม: **Layered Architecture (N-Tier)**

## 📋 รายละเอียดผู้จัดทำ
* **ชื่อ:** เบน (Ben)
* **รหัสนักศึกษา:** 67543210071-6
* **สาขา:** Software Engineering
* **มหาวิทยาลัย:** Rajamangala University of Technology Lanna

---

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Modern UI, Responsive)
* **Backend:** Node.js
* **Database:** SQLite3
* **Architecture:** Layered Pattern (Presentation, Business, Data)

---

## 🚀 วิธีการรันโปรเจกต์ (Installation & Run)

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
รัน Server:

Bash

npm start
เปิดใช้งาน:

เปิด Browser ไปที่: http://localhost:3000

หากใช้งานผ่านมือถือ (ในวง LAN เดียวกัน): http://<IP_ADDRESS>:3000

✅ ฟีเจอร์หลัก (Features)
CRUD Operations: เพิ่ม, ลบ, แก้ไข, และดูรายการหนังสือ

Business Logic:

ยืมหนังสือ (Borrow) - เปลี่ยนสถานะเป็น Borrowed

คืนหนังสือ (Return) - เปลี่ยนสถานะเป็น Available

ตรวจสอบเงื่อนไข (Validation) ก่อนบันทึกข้อมูล

Responsive Design: รองรับการใช้งานทั้งบน PC และ Mobile

Theme: รองรับ Dark Mode / Light Mode


---

### 2. สร้างไฟล์ `ARCHITECTURE.md` (เอกสารอธิบายโครงสร้าง)
ไฟล์นี้สำคัญมากสำหรับวิชานี้ครับ เพราะมันอธิบายว่าคุณเข้าใจ "Layered Architecture" จริงๆ หรือไม่

```markdown
# 🏛️ Software Architecture Design

โปรเจกต์นี้ถูกออกแบบโดยใช้รูปแบบ **Layered Architecture** เพื่อแยกส่วนรับผิดชอบ (Separation of Concerns) ออกเป็น 3 เลเยอร์หลัก ดังนี้:

## 🏗️ Structure Overview

```
```
graph TD
    Client[Client / Browser] <--> Presentation[Presentation Layer]
    Presentation <--> Business[Business Logic Layer]
    Business <--> Data[Data Access Layer]
    Data <--> DB[(SQLite Database)]
```
📂 Layer Details (รายละเอียดแต่ละชั้น)
1. 🟢 Presentation Layer (Interface)
Location: src/presentation/ ทำหน้าที่เป็นด่านหน้าในการรับ Request จากผู้ใช้ และส่ง Response กลับไป

Routes (routes/bookRoutes.js): กำหนด Endpoint URL (เช่น GET /api/books, POST /api/books)

Controllers (controllers/bookController.js): รับข้อมูลจาก HTTP Request, เรียกใช้ Service, และส่ง HTTP Response กลับไปหา Client

2. 🔵 Business Logic Layer (Core)
Location: src/business/ ทำหน้าที่ประมวลผลเงื่อนไขทางธุรกิจ (Business Rules) ทั้งหมด

Services (services/bookService.js):

ควบคุมขั้นตอนการทำงาน (Workflow)

ตรวจสอบเงื่อนไข เช่น "หนังสือต้องว่างสถานะ Available ถึงจะยืมได้"

คำนวณสถิติ (Available/Borrowed/Total)

Validators (validators/): ตรวจสอบความถูกต้องของข้อมูล (Input Validation)

3. 🟠 Data Access Layer (Infrastructure)
Location: src/data/ ทำหน้าที่สื่อสารกับฐานข้อมูลโดยตรง โดยไม่สนใจ Business Logic

Repositories (repositories/bookRepository.js): ประกอบด้วยคำสั่ง SQL (CRUD) เช่น SELECT, INSERT, UPDATE, DELETE

Database Connection (database/connection.js): จัดการการเชื่อมต่อไฟล์ library.db

🔄 Data Flow Example (ตัวอย่างการทำงาน)
Scenario: ผู้ใช้กดยืมหนังสือ (Borrow Book)

Request: Browser ส่ง PATCH /api/books/1/borrow มาที่ Server

Presentation: BookController รับ Request แล้วส่ง ID ไปให้ BookService

Business Logic:

BookService ตรวจสอบว่าหนังสือเล่มนี้สถานะเป็น 'available' หรือไม่?

ถ้าใช่ -> ส่งคำสั่งอัปเดตไปที่ Data Layer

ถ้าไม่ -> ส่ง Error กลับไปทันที

Data Access: BookRepository รัน SQL UPDATE books SET status='borrowed' WHERE id=1

Response: Server ส่งข้อมูลสถานะล่าสุดกลับไปให้ Browser แสดงผล (ปุ่มเปลี่ยนเป็นสีส้ม Return)