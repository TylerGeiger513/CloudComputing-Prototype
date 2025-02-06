## Demo Video
https://github.com/user-attachments/assets/f212c2af-8467-4143-83ae-e16767e79c32

## Project Structure



```
campusconnect/
├── backend/                   # Express backend code
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controllers/
│   │   └── authController.js  # Authentication controllers (signup, login, profile)
│   ├── middlewares/
│   │   └── authMiddleware.js  # Protect middleware to verify JWTs
│   ├── models/
│   │   └── User.js            # Mongoose User model
│   ├── routes/
│   │   └── authRoutes.js      # Authentication routes (mounted under /api/auth)
│   ├── Dockerfile.backend     # Dockerfile for the backend
│   └── server.js              # Main server entry point
├── frontend/                  # React frontend code
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components (forms, layout, etc.)
│   │   ├── context/           # AuthContext, etc.
│   │   ├── services/          # API services (authService.js, etc.)
│   │   └── ...                
│   ├── Dockerfile.frontend    # Dockerfile for the frontend
│   └── package.json
├── .env                       # Global environment variables (see below)
├── .env.example               # Example environment variables file
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # This file
```
### Deployment

1. **Clone the Repository**

   ```
   git clone https://github.com/TylerGeiger513/CloudComputing-Prototype.git
   cd CloudComputing-Prototype
   ```

2. **Create a Global `.env` File**

   Copy the `.env.example` to `.env` and update the values as necessary:

   ```
   cp .env.example .env
   ```

3. **Install Docker and Docker Compose**

   Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

4. **Build and Start the Containers**

   Run the following command from the root directory:

   ```
   docker-compose up --build -d
   ```

   This command will:
   - Build the backend and frontend images.
   - Start the MongoDB container.
   - Map ports as specified (backend on port 3000, frontend on port 4200).

5. **Access the Application**

   - **Frontend:** Open your browser and navigate to [http://localhost:4200](http://localhost:4200).
   - **Backend API:** You can test endpoints (e.g., via Postman) at [http://localhost:3000/api/auth](http://localhost:3000/api/auth).
