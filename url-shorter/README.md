# URL Shortener – Frontend (React + TypeScript)

This repository contains the **frontend** of a URL Shortener application.

The **backend is built using raw FastAPI with PostgreSQL**, without heavy abstractions, focusing on performance, clarity, and full control over SQL models and queries.

---

## 🧠 Architecture Overview

- **Frontend**: React + TypeScript (Vite)
- **Backend**: FastAPI (raw, no ORM magic layers)
- **Database**: PostgreSQL
- **Analytics**: Stored and aggregated directly via SQL queries

---

## 🚀 Frontend Features

- Shorten long URLs
- QR code generation and download
- URL details page
- Analytics dashboards:
  - Devices
  - Browsers
  - Operating Systems
  - Countries (location)
  - Clicks over time (graph)
- Fully typed with TypeScript
- Modular and scalable folder structure

---

## 🧱 Tech Stack (Frontend)

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (charts)
- react-qr-code
- React Router DOM

---

## 🔗 Backend (Short Description)

The backend is implemented using:

- **Raw FastAPI**
- **PostgreSQL**
- **SQLModel / SQLAlchemy**
- **Alembic migrations**
- **Manual analytics aggregation** (no third-party analytics services)

The backend exposes REST APIs consumed by this frontend.

---

## 📁 Frontend Folder Structure

```
src/
├── api/
│   └── urls.ts
├── components/
│   ├── AnalyticsPie3D.tsx
│   └── ClicksTimeChart.tsx
├── pages/
│   ├── Home.tsx
│   └── Details.tsx
├── types/
│   └── analytics.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📦 Installation

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 🌐 Backend Requirement

The backend must be running at:

```
http://localhost:8000
```

Required API endpoints:

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /shorten | Create short URL |
| GET | /details/{code} | URL details |
| GET | /analytics/{code} | Analytics |
| GET | /{short_code} | Redirect |

---

## 📊 Analytics Response Shape

```ts
{
  devices: { name: string; value: number }[];
  browsers: { name: string; value: number }[];
  os: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  clicks_over_time?: { time: string; count: number }[];
}
```

---

## 🛠 Notes

- All charts are conditionally rendered
- Types are centralized in `src/types`
- QR codes are centered and downloadable
- Designed for production scalability

---

## 📌 Future Enhancements

- Authentication
- Admin dashboard
- Date filtering
- Export analytics
- Dark mode

---

## 👨‍💻 Built With

React + FastAPI + PostgreSQL  
Clean, production-oriented, and analytics-first design.
