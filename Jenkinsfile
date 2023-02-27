pipeline {
  agent any
  stages {
    stage('Testing') {
      steps {
        sh '''
        npx playwright test --workers 5 --project=firefox --reporter=line,allure-playwright
        '''
      }
    }
  }
    post('Creating a report'){
      always{
        script {
          allure([
        includeProperties: false,
        jdk: 'JDK',
        results: [[path: 'allure-results']]
        ])
      }
    }
      failure {
        sh '''
        cd allure-report
        npx netlify build
        '''
        sh '''
        cd allure-report
        npx netlify deploy --prod --dir .
        '''
        sh '''
         java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.2.1.jar
         '''
    }
  }
}