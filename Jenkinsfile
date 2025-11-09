cat > Jenkinsfile <<'EOF'
pipeline {
  agent any

  tools {
    // Nom du scanner configuré dans Jenkins > Global Tool Configuration
    sonarQubeScanner 'sonar-scanner'
    // Exemple Node : si tu as un Node tool configuré, tu peux le déclarer
    // nodejs 'node-16' 
  }

  environment {
    SONARQUBE_ENV = 'MySonarQubeServer'    // nom que tu as mis dans Manage Jenkins > Configure System
    // Le token SonarQube sera injecté depuis les credentials Jenkins (ID: sonar-token)
    SONAR_AUTH_TOKEN = credentials('sonar-token')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        echo 'Install dependencies'
        sh 'npm install'
      }
    }

    stage('Unit Tests') {
      steps {
        echo 'Run tests (si tu en as)'
        sh 'npm test || true'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv("${env.SONARQUBE_ENV}") {
          sh '''
            sonar-scanner \
              -Dsonar.projectKey=mon-projet-sonar \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://192.168.216.130:9000 \
              -Dsonar.login=${SONAR_AUTH_TOKEN}
          '''
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
EOF
