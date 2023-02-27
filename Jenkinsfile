pipeline {
  agent any
  stages {
    stage('Preparation of the working space') {
      steps {
        sh '''
          npx playwright install firefox
        '''
        sh '''
          npm i -D @playwright/test allure-playwright allure-commandline
        '''
        sh '''
          npm install --save-dev netlify-cli
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
        call build.bat
        '''
        sh '''
        call deploy.bat
        '''
        sh '''
         java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.2.1.jar
         '''
    }
  }
}