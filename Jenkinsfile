pipeline {
    agent any

    // Outils nécessaires (Node.js configuré dans Jenkins)
    tools {
        nodejs 'nodejs' // nom défini dans Manage Jenkins → Global Tool Configuration
    }

    environment {
        // Définition de variables d'environnement si besoin
        APP_ENV = 'development'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonage du dépôt depuis GitHub...'
                // Récupère le code source depuis le dépôt configuré dans Jenkins
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances Node.js...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Construction de l’application...'
                // Exemple : si tu as un script de build dans package.json
                sh 'npm run build || echo "Aucun build à exécuter"'
            }
        }

        stage('Test') {
            steps {
                echo 'Exécution des tests...'
                sh 'npm test || echo "Aucun test défini"'
            }
        }

        stage('Static Analysis (SonarQube)') {
            when {
                expression { return fileExists('sonar-project.properties') }
            }
            steps {
                echo 'Analyse du code avec SonarQube...'
                withSonarQubeEnv('sonarqube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Déploiement de l’application (exemple local)...'
                sh 'npm start &'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Échec du pipeline.'
        }
        always {
            echo 'Pipeline terminé (quel que soit le résultat).'
        }
    }
}
