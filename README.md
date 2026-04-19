# Static DevOps Project

A static web page with a full CI/CD pipeline using Docker, Nginx, and Jenkins.
Includes dark mode toggle, ESLint code quality checks, and production-grade Nginx serving.

## Quick Start (VS Code)

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — must be running
- [Node.js](https://nodejs.org) (LTS)
- [Jenkins](http://localhost:8080) running via Docker

### 2. Install linting tools
```bash
npm install
```

### 3. Run the linter
```bash
npm run lint
```

### 4. Build and run with Docker
```bash
docker build -t static-devops-project .
docker run -d --name my-static-site -p 8080:80 static-devops-project
```

Then open: http://localhost:8080

### 5. Stop the container
```bash
docker stop my-static-site
docker rm my-static-site
```

## Jenkins Pipeline

1. Push this repo to GitHub
2. In Jenkins: New Item → Pipeline → Pipeline script from SCM → Git
3. Set your GitHub URL, branch `*/main`, script path `Jenkinsfile`
4. Save → Build Now

Pipeline stages: Checkout → Install → Lint → Docker Build → Deploy

## Project Structure

```
static-devops-project/
├── src/
│   ├── index.html       # Main page
│   ├── style.css        # Styles + dark mode variables
│   └── app.js           # Dark mode toggle + status updater
├── Dockerfile           # Nginx-based container
├── Jenkinsfile          # CI/CD pipeline definition
├── nginx.conf           # Nginx server config
├── .eslintrc.json       # JS linting rules
├── package.json         # NPM scripts + dev dependencies
└── .gitignore
```

## Features
- Dark mode toggle (remembers your preference via localStorage)
- Respects OS-level dark mode preference automatically
- ESLint for JavaScript quality checks
- Nginx with gzip compression
- Jenkins pipeline with success/failure reporting
