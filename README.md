# Barangay Frontend (Accessible)

This repository is a frontend-only React scaffold for an Accessible Web-Based Barangay Service & Complaint Management System.

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Notes:
- Built with Vite + React.
- Accessibility settings are stored in localStorage.
- Pure CSS, no UI frameworks.
- Connect to a PHP backend later via `src/api/axios.js`.
 
Logo:
- To use the official barangay seal you provided, place the image file at `src/assets/logo.png`. The app will use that file when available; it falls back to `src/assets/logo.svg` if not present.

Backend (PHP + MySQL)
1) Create the MySQL database and tables using the provided SQL script:

```sql
-- from project root
mysql -u root -p < sql/schema.sql
```

2) Configure `backend/config.php` with your DB credentials.

3) Start the PHP built-in server from project root:

```powershell
php -S localhost:8000 -t backend
```

4) The frontend uses `http://localhost:8000/api` as the backend base URL (see `src/api/axios.js`).

Notes:
- Passwords in the SQL seed are left blank; when you register/login via the app the API will store hashed passwords and tokens.
- This PHP API is a minimal demo and uses token strings stored in the DB (not full JWT). For production, add HTTPS, JWT, input validation, and stricter auth.

