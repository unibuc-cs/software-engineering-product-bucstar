# How to setup and startup the Application

## Backend

### Step 1: Build the Docker Images

Rebuild the Docker images without using the cache to ensure everything is up to date. Run the following command:

```bash
docker-compose build --no-cache
```

### Step 2: Launch Services

Start the necessary services (e.g., database and API) in detached mode:

```bash
docker-compose up -d
```

### Step 3: Verify The Backend

You can verify that the backend is working by visiting the Swagger documentation in your browser: [Swagger Documentation](http://localhost:5009/swagger/index.html)

If for some reason the link fails, then run:

```bash
docker-compose logs
```

To see what happened.

## Frontend

### Step 1: Environment Setup

1. Navigate to the `/frontend` directory:

```bash
cd frontend
```

2. Locate the `.env.example` file and create a copy of it named `.env`:

```bash
cp .env.example .env
```

3. Open the `.env` file in your favorite text editor and set up the environment variables as required. Ensure all variables are properly configured for the application to work.

### Step 2: Install Dependencies

Before starting the frontend, ensure all dependencies are installed:

```bash
npm install
```

Make sure you are in the `/frontend` directory

### Step 3: Start the Frontend

Run the following command to start the frontend application:

```bash
npm start
```

### Step 4: Access the Application

Open your browser and go to: [VibeSync](https://localhost:3000/)
