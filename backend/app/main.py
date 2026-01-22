from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import bookings,admin_slots,preferences

app = FastAPI(title="Demo Calendar App")

# ✅ ADD CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular app
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)

# app.include_router(calendar.router)
app.include_router(bookings.router)
app.include_router(admin_slots.router)
app.include_router(preferences.router) 