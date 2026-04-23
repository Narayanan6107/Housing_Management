# Property Management App

A full-stack MERN property management application.

## Project Structure
```
Housing_Management/
├── backend/    → Express + MongoDB API
└── frontend/   → React + Vite frontend
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev   # runs on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev   # runs on port 5174
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Deployment (Render)
See `render.yaml` for full configuration.
