# Demo Calendar App (Angular + FastAPI)

A full-stack Calendar Booking Application built using Angular (Frontend)
and FastAPI (Backend).\
The application supports user preferences, calendar slot booking, admin
slot management, and persistent backend storage.

------------------------------------------------------------------------

## Features

### User Features

-   Select category preferences
-   View weekly calendar slots
-   Book available slots
-   Cancel own bookings
-   Slots filtered based on selected preferences
-   Data persists after page refresh

### Admin Features

-   Create slots
-   View all bookings
-   Cancel any booking
-   Manage availability

### System Features

-   Backend-driven state
-   Persistent JSON storage
-   REST APIs
-   CORS enabled
-   Page refresh safe (state hydration)

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   Angular
-   TypeScript
-   Angular Material
-   HTML / CSS

### Backend

-   FastAPI
-   Python
-   Uvicorn
-   JSON Storage

------------------------------------------------------------------------

## Project Architecture

Frontend (Angular)\
→ REST API\
Backend (FastAPI)\
→ JSON Store (`app_state.json`)

------------------------------------------------------------------------

## Folder Structure

### Backend

    backend/
     ├── app/
     │   ├── repositories/
     │   ├── schemas/
     │   ├── services/
     │   ├── routers/
     │   ├── utils/
     │   ├── data/
     │   └── main.py
     └── venv/

### Frontend

    calendar-demo-app/
     ├── src/app/
     │   ├── preferences/
     │   ├── calendar/
     │   ├── admin/
     └── angular.json

------------------------------------------------------------------------

## API Endpoints

### Preferences

    GET  /api/preferences
    POST /api/preferences

### Admin

    POST /api/admin/slots
    POST /api/admin/cancel/{slotId}

### Bookings

    POST /api/bookings/signup/{slotId}
    POST /api/bookings/cancel/{slotId}

------------------------------------------------------------------------

## Best Practices Followed

-   Modular architecture
-   Separation of concerns
-   Typed models (Pydantic & TypeScript)
-   Clean readable code
-   Reusable services
-   RESTful API standards
-   Backend-driven state management

------------------------------------------------------------------------

## Running Project Locally

### Prerequisites

Install: - Node.js (18+) - Python 3.9+ - npm - Git

------------------------------------------------------------------------

## Backend Setup

``` bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend URL:

    http://localhost:8000

API Docs:

    http://localhost:8000/docs

------------------------------------------------------------------------

## Frontend Setup

``` bash
cd frontend
npm install
ng serve
```

Frontend URL:

    http://localhost:4200

------------------------------------------------------------------------

## App Flow

1.  Start backend
2.  Start frontend
3.  Open `http://localhost:4200`
4.  Select preferences
5.  Admin creates slots
6.  Users book slots
7.  Refresh --- state persists

------------------------------------------------------------------------

## Persistent Storage Example

`app_state.json`

``` json
{
  "currentUser": "me@example.com",
  "preferences": { "categories": [] },
  "events": []
}
```

------------------------------------------------------------------------

## Future Enhancements

-   Database integration
-   JWT Authentication
-   Multi-user support
-   Role-based access
-   Docker deployment
-   UI/UX improvements

------------------------------------------------------------------------

## Author Notes

This project demonstrates full-stack engineering best practices, backend
state synchronization, and scalable architecture design.
