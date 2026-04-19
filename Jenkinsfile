pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint quality check...'
                bat 'npm run lint'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t static-devops-project .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                bat 'docker stop my-static-site || true'
                bat 'docker rm my-static-site || true'
                bat 'docker run -d --name my-static-site -p 8080:80 static-devops-project'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Site is live at http://localhost:8080'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}
