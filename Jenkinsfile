pipeline {
    agent any

    environment {
        IMAGE_NAME = 'static-devops-project'
        CONTAINER_NAME = 'my-static-site'
        PORT = '8081'
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
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Stopping old container if running...'
                sh 'docker stop ${CONTAINER_NAME} || true'
                sh 'docker rm ${CONTAINER_NAME} || true'
                echo 'Starting new container...'
                sh 'docker run -d --name ${CONTAINER_NAME} -p ${PORT}:80 ${IMAGE_NAME}'
            }
        }
    }

    post {
        success {
            echo '=========================================='
            echo 'Pipeline succeeded!'
            echo 'Site is live at http://localhost:8081'
            echo '=========================================='
        }
        failure {
            echo '=========================================='
            echo 'Pipeline FAILED. Check the logs above.'
            echo '=========================================='
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}