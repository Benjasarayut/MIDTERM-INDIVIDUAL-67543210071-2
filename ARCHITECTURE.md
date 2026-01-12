# Architecture Diagram — Layered Architecture (3-tier)

## C1 Context
**Library Management System** คือระบบ Backend สำหรับจัดการข้อมูลหนังสือในห้องสมุด โดยรองรับการทำงานผ่าน REST API เพื่อให้ Client สามารถค้นหา เพิ่ม ลบ แก้ไข และทำรายการยืม-คืนหนังสือได้ ระบบถูกออกแบบโดยใช้สถาปัตยกรรมแบบ Layered Architecture เพื่อแยกส่วนการทำงานให้ชัดเจนและดูแลรักษาง่าย

## C2 Container / Layer Diagram

```text
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  ┌──────────────────────────────┐   │
│  │ Routes → Controllers         │   │
│  │ (HTTP Handling & Response)   │   │
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │ Call
                  ▼
┌─────────────────────────────────────┐
│     Business Logic Layer            │
│  ┌──────────────────────────────┐   │
│  │ Services → Validators        │   │
│  │ (Business Rules & Logic)     │   │
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │ Call
                  ▼
┌─────────────────────────────────────┐
│     Data Access Layer               │
│  ┌──────────────────────────────┐   │
│  │ Repositories → Database      │   │
│  │ (SQL Queries & Connection)   │   │
│  └──────────────┬───────────────┘   │
└─────────────────┼───────────────────┘
                  │ Read/Write
                  ▼
          ┌──────────────┐
          │    SQLite    │
          │  (Database)  │
          └──────────────┘

