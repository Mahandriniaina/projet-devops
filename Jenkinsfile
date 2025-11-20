pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub')
        BACKEND_IMAGE = "m0203/projet-backend:latest"
        FRONTEND_IMAGE = "m0203/projet-frontend:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Mahandriniaina/projet-devops.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $BACKEND_IMAGE ./backend'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    sh 'docker build -t $FRONTEND_IMAGE ./frontend'
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    sh "echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }
    }
}
