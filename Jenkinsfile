pipeline {
  agent any
  stages {
    stage('Clean results') {
      steps {
        sh '''
        rm -rf /var/lib/jenkins/workspace/cors-all-web/allure-results
        '''
      }
    }
    stage('Clean reports') {
      steps {
        sh '''
        rm -rf /var/lib/jenkins/workspace/cors-all-web/allure-report
        '''
      }
    }
    stage('Testing') {
      steps {
        sh '''
        npx playwright test --workers 5 --project=firefox --reporter=line,allure-playwright
        '''
      }
    }
  }
    post('Creating a report'){
      failure {
        script {
          allure([
        includeProperties: false,
        jdk: 'JDK',
        results: [[path: 'allure-results']]
        ])
      }
        sh '''
        cd allure-report
        npx netlify build
        '''
        sh '''
        npx netlify deploy --prod --dir allure-report/
        '''
        sh '''
        java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.2.1.jar
        '''
    }
  }
}