# Backend API Containerized with Docker

## Build

```bash
docker build -t backend .
```

## Run 

```bash
docker run -d -p 5009:5009 --name backend-api backend
```

## Stop
```bash
docker stop backend-api
```
