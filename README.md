# 💼 JobTrack – Job Application Management System

A production-grade, full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) web application designed to help job seekers, students, and professionals track, organize, and accelerate their career pipeline with real-time status insights, metrics, and visual analytics.

Built for academic demonstrations, college capstone portfolios, and real-world daily use.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure account creation with real-time client & server validation.
- **JWT Authentication**: Token-based authentication with automatic expiration handling.
- **Password Encryption**: All passwords securely hashed using `bcrypt` (10 salt rounds) before database storage.
- **Protected Routes**: Restricts unauthorized access on both backend APIs and React frontend views.
- **No Password Exposure**: Password hashes are stripped from all API responses (`select: false`).

### 📊 Comprehensive Dashboard & Analytics
- **Live Metrics Cards**: Immediate counters for Total Applications, Applied, Interviews, Selected (Offers), and Rejected.
- **Visual Analytics**: Interactive Bar and Donut charts depicting pipeline conversion and status distribution.
- **Recent Applications**: Quick-glance list of recent job entries with direct shortcuts to full details.

### 📋 Job Application Management (CRUD)
- **Add Application**: Log company name, job role, location, salary/compensation, application date, status, job link, and notes.
- **All Applications View**: Browse applications with both **Card Grid** and **Table View** options.
- **Search & Multi-Filter**: Search across company, role, location, and notes; filter by status tab or company/role text; sort by date, company name, or status.
- **Detailed View**: Dedicated page with full metadata, job link launcher, formatted interview preparation notes, and **1-Click Quick Status Transitions**.
- **Edit & Update**: Modify any application details with pre-populated inputs.
- **Safe Deletion**: Confirmation modal prevents accidental data loss.

### 🎨 Modern UI & Developer Experience
- **Vibrant Modern Theme**: Tailored color palette, dark mode / light mode toggle with local storage persistence.
- **Glassmorphism & Micro-animations**: Modern aesthetic with smooth transitions and backdrop blur.
- **Responsive Layout**: Fluid experience across mobile, tablet, and widescreen desktop monitors.
- **Unique Testing IDs**: All interactive elements have descriptive `id` attributes for automated browser and UI testing.

---

## 🏗️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, React Router DOM v6, Axios, Lucide React, Vanilla CSS |
| **Backend** | Node.js, Express.js, RESTful API Architecture, Morgan, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud Database), Mongoose ODM |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), Password Hashing (`bcryptjs`) |
| **Deployment** | Pre-configured with `vercel.json` for Vercel (SPA routing & Serverless) |

---

## 📁 Project Structure

```
JobTrack/
├── .gitignore               # Root git ignore (ignores .env and node_modules)
├── package.json             # Root scripts to install and run both apps
├── README.md                # Complete documentation and setup guide
│
├── backend/
│   ├── .env.example         # Template for backend environment variables
│   ├── .gitignore           # Backend git ignore
│   ├── package.json         # Backend dependencies & npm scripts
│   ├── vercel.json          # Vercel serverless deployment config
│   └── src/
│       ├── config/
│       │   └── db.js               # MongoDB connection with Mongoose
│       ├── controllers/
│       │   ├── authController.js   # Register, Login, Me endpoints
│       │   └── jobController.js    # CRUD, search, filter, stats
│       ├── middleware/
│       │   ├── authMiddleware.js   # JWT verification middleware
│       │   └── errorMiddleware.js  # 404 & central error handling
│       ├── models/
│       │   ├── User.js             # User Mongoose schema & bcrypt hooks
│       │   └── Job.js              # Job application schema & indexes
│       ├── routes/
│       │   ├── authRoutes.js       # /api/auth routes
│       │   └── jobRoutes.js        # /api/jobs routes
│       └── server.js               # Express application entry point
│
└── frontend/
    ├── .env.example         # Template for frontend environment variables
    ├── .gitignore           # Frontend git ignore
    ├── index.html           # HTML template with Google Fonts
    ├── package.json         # Frontend dependencies & npm scripts
    ├── vercel.json          # Vercel rewrite configuration for React SPA
    ├── vite.config.js       # Vite configuration with backend proxy
    ├── public/
    │   └── favicon.svg      # JobTrack brand logo favicon
    └── src/
        ├── main.jsx         # React DOM mount point with context providers
        ├── App.jsx          # Route definitions & base layout
        ├── index.css        # Global CSS variables, reset, design system
        ├── api/
        │   └── axiosConfig.js      # Axios instance with JWT interceptor
        ├── components/
        │   ├── Navbar.jsx          # Responsive header with theme toggle
        │   ├── Footer.jsx          # Footer with tech stack tags
        │   ├── ProtectedRoute.jsx  # Route guard for authenticated users
        │   ├── StatusBadge.jsx     # Color-coded status badge indicator
        │   ├── StatsCard.jsx       # Metric counter card
        │   ├── StatChart.jsx       # Interactive Bar & Donut chart component
        │   ├── ConfirmModal.jsx    # Action confirmation dialog
        │   ├── AlertMessage.jsx    # Dismissible alert banners
        │   └── LoadingSpinner.jsx  # Animated loading indicator
        ├── context/
        │   ├── AuthContext.jsx     # User authentication state provider
        │   └── ThemeContext.jsx    # Dark/Light theme state provider
        ├── pages/
        │   ├── LandingPage.jsx     # Showcase landing page
        │   ├── LoginPage.jsx       # User login with demo button
        │   ├── RegisterPage.jsx    # User registration form
        │   ├── DashboardPage.jsx   # Metrics, charts & recent jobs
        │   ├── ApplicationsPage.jsx# Job search, multi-filter & views
        │   ├── AddJobPage.jsx      # Job application entry form
        │   ├── EditJobPage.jsx     # Job application update form
        │   ├── JobDetailsPage.jsx  # Comprehensive application overview
        │   ├── ProfilePage.jsx     # Profile overview & session logout
        │   └── NotFoundPage.jsx    # Custom 404 fallback page
        └── styles/
            ├── App.css
            ├── Navbar.css
            ├── Landing.css
            ├── Auth.css
            ├── Dashboard.css
            ├── Applications.css
            ├── JobForm.css
            ├── JobDetails.css
            └── Profile.css
```

---

## ⚙️ MongoDB Atlas Configuration Guide

Follow these steps to set up your free cloud database on **MongoDB Atlas**:

1. **Sign Up / Log In**: Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create an account.
2. **Create a Free Cluster**:
   - Choose the free **M0 Sandbox** tier (Shared).
   - Select your preferred cloud provider (AWS/GCP/Azure) and closest region.
   - Click **Create Deployment**.
3. **Set Up Database Access (Credentials)**:
   - Navigate to **Security** → **Database Access**.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Enter a username (e.g. `jobtrack_user`) and a secure password.
   - Ensure the user has the **Read and write to any database** privilege.
   - Click **Add User**.
4. **Set Up Network Access (IP Whitelist)**:
   - Navigate to **Security** → **Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) so your local dev machine or cloud deployment can connect.
   - Click **Confirm**.
5. **Retrieve the Connection String**:
   - Navigate to **Database** → Click **Connect** next to your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with the database credentials created in step 3.
   - Specify the database name before the `?` query parameter (e.g., `/jobtrack`):
     ```
     mongodb+srv://jobtrack_user:MySecurePass123@cluster0.abcde.mongodb.net/jobtrack?retryWrites=true&w=majority
     ```

---

## 🔑 Environment Variables Setup

### 1. Backend (`backend/.env`)
Create a file named `.env` inside the `backend/` folder (you can duplicate `backend/.env.example`):

```bash
# Server Port
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobtrack?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=super_secret_jwt_key_jobtrack_college_project_2026
JWT_EXPIRE=30d

# Frontend Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### 2. Frontend (`frontend/.env`)
Create a file named `.env` inside the `frontend/` folder (you can duplicate `frontend/.env.example`):

```bash
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

> **Note**: Both `.env` files are ignored by git to protect your credentials.

---

## 🚀 Local Installation & Running Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- Active **MongoDB Atlas** database connection string

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/JobTrack.git
cd JobTrack
```

### Step 2: Install Dependencies
You can install both backend and frontend dependencies in one command from the project root:
```bash
npm run install:all
```

Or install them individually:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Configure Environment Variables
- Create `backend/.env` with your `MONGODB_URI` and `JWT_SECRET`.
- Create `frontend/.env` with `VITE_API_URL=http://localhost:5000/api`.

### Step 4: Run the Application Locally
Open two terminal windows:

**Terminal 1 — Run Backend Server**:
```bash
cd backend
npm run dev
```
*Backend will start on: `http://localhost:5000`*

**Terminal 2 — Run Frontend Client**:
```bash
cd frontend
npm run dev
```
*Frontend will open on: `http://localhost:5173`*

Alternatively, from the project root:
```bash
# Start backend in dev mode
npm run server

# Start frontend in dev mode (in a second terminal)
npm run client
```

---

## 📡 RESTful API Documentation

### Base URL: `http://localhost:5000/api`

### 1. Authentication Endpoints
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Register a new user account |
| `POST` | `/auth/login` | Public | Log in with email & password |
| `GET` | `/auth/me` | Private | Retrieve current user profile (requires Bearer token) |

#### Register Request Body:
```json
{
  "name": "Sarah Connor",
  "email": "sarah@example.com",
  "password": "password123"
}
```

#### Successful Auth Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65b8c9d0e1f2a3b4c5d6e7f8",
    "name": "Sarah Connor",
    "email": "sarah@example.com",
    "createdAt": "2026-09-25T10:00:00.000Z"
  }
}
```

---

### 2. Job Applications Endpoints
All job application endpoints require the `Authorization: Bearer <token>` header.

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/jobs` | `search`, `status`, `company`, `role`, `sort`, `page`, `limit` | Fetch paginated applications |
| `GET` | `/jobs/stats` | None | Fetch aggregate pipeline metrics and charts data |
| `GET` | `/jobs/:id` | None | Retrieve single application details |
| `POST` | `/jobs` | None | Create a new job application |
| `PUT` | `/jobs/:id` | None | Update an existing job application |
| `DELETE` | `/jobs/:id` | None | Delete an application |

#### Create / Update Job Request Body:
```json
{
  "company": "Amazon",
  "jobRole": "Software Development Engineer",
  "location": "Seattle, WA (Hybrid)",
  "salary": "$145,000 / yr",
  "applicationDate": "2026-09-25",
  "status": "Interview",
  "jobUrl": "https://amazon.jobs/en/jobs/123456",
  "notes": "Completed Online Assessment. Round 1 Technical scheduled for next Tuesday."
}
```

---

## ☁️ Deployment Guide

### Deploying Frontend to Vercel
1. Push your code to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New** → **Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `frontend`.
5. Under **Environment Variables**, set:
   - `VITE_API_URL`: Your deployed backend API URL (e.g. `https://your-api.onrender.com/api` or `https://your-backend.vercel.app/api`).
6. Click **Deploy**. The included `frontend/vercel.json` automatically handles single-page routing rewrites.

### Deploying Backend to Render / Railway / Vercel
1. Import repository into [Render](https://render.com) or [Railway](https://railway.app) as a Web Service.
2. Set the **Root Directory** to `backend`.
3. Set the **Build Command** to `npm install`.
4. Set the **Start Command** to `node src/server.js`.
5. Add your Environment Variables in the provider dashboard:
   - `PORT`: `5000` (or provider's default)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: A secure 256-bit secret string
   - `CLIENT_URL`: Your deployed frontend Vercel URL
6. Click **Deploy**.

---

## 🎓 College Presentation & Demonstration Tips

When demonstrating this project for academic evaluations, vivas, or portfolio reviews:
1. **Highlight MERN Architecture**: Point out the clear separation of concerns (`controllers/`, `routes/`, `models/`, `middleware/`, `config/`).
2. **Showcase Real-World Security**: Explain password salting with `bcrypt`, stateless session verification with `JWT`, and Mongoose schema validation.
3. **Demonstrate Dynamic Metrics**: Add an application with status `Applied`, then use the **Quick Status Buttons** on the details page to transition it to `Interview` or `Selected` — open the Dashboard to show real-time counter & chart updates!
4. **Demonstrate Theme Customization**: Click the Sun/Moon toggle to show dark mode support designed with CSS custom properties.
5. **Use Demo Credentials**: If reviewing rapidly, use the one-click demo button on the login screen.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
