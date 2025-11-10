pipeline {
    agent any
    
    tools {
        nodejs "nodejs"  // Utilise la configuration globale
    }
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    }
}
