pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

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
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint quality check...'
                sh 'npm run lint'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t static-devops-project .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh 'docker stop my-static-site || true'
                sh 'docker rm my-static-site || true'
                sh 'docker run -d --name my-static-site -p 8081:80 static-devops-project'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Site is live at http://localhost:8081'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}